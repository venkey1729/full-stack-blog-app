const express = require('express');
const { getBlogs, createBlog, getBlogById,searchBlogs } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/search').get(searchBlogs);

router.route('/').get(protect,getBlogs).post(protect, createBlog);
router.route('/:id').get(protect,getBlogById);
module.exports = router;
