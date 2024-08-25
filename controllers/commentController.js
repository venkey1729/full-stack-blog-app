
const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  const { text } = req.body;
  const blogId = req.params.blogId;

  try {
    const comment = new Comment({
      text,
      user: req.user.id,
      blog: blogId,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCommentsByBlogId = async (req, res) => {
  const blogId = req.params.blogId;

  try {
    const comments = await Comment.find({ blog: blogId }).populate('user', 'username');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
