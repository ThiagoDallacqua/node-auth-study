const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
   },
   comment: String
});

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = () => {
  return Comment
}
