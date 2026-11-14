const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: [true, 'Post ID is required'] },
  authorName: { type: String, required: [true, 'Author name is required'], trim: true, minlength: [2, 'Author name must contain at least 2 characters'] },
  comment: { type: String, required: [true, 'Comment is required'], trim: true, minlength: [25, 'Comment must contain at least 25 characters'] }
}, { timestamps: true });
module.exports = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
