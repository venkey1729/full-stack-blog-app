const express = require('express');
const { addComment,getCommentsByBlogId } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/:blogId').post(protect, addComment).get(protect, getCommentsByBlogId);
module.exports = router;
