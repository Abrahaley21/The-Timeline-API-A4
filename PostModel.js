const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  authorName: { type: String, required: [true, 'Author name is required'], trim: true, minlength: [2, 'Author name must contain at least 2 characters'] },
  post: { type: String, required: [true, 'Post is required'], trim: true, minlength: [25, 'Post must contain at least 25 characters'] }
}, { timestamps: true });
module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);
