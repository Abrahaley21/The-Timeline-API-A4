require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./Config/Db');
const webRoutes = require('./Config/Routes');
const apiRoutes = require('./API/Routes');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
app.use('/', webRoutes);
app.use('/api', apiRoutes);
app.use('/api', (req, res) => res.status(404).json({ success: false, message: `API endpoint not found: ${req.method} ${req.originalUrl}` }));
app.use((err, req, res, next) => {
  console.error(err);
  if (req.originalUrl.startsWith('/api')) return res.status(500).json({ success: false, message: 'Internal server error' });
  return res.status(500).send('Internal server error');
});
const PORT = process.env.PORT || 3000;
connectDB().then(() => app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API base URL: http://localhost:${PORT}/api`);
})).catch(error => { console.error('Unable to start server:', error.message); process.exit(1); });
