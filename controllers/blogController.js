const Blog = require('../models/Blog');

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('user', 'username');
    console.log('Blogs retrieved:', blogs); 
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createBlog = async (req, res) => {
  const { title, content, imageUrl } = req.body;
  console.log('Creating blog:', { title, content, imageUrl });
  console.log('User ID:', req.user);  
  try {
    const newBlog = new Blog({
      title,
      content,
      imageUrl,
      user: req.user.id,  
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error creating blog:', error);  
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('user', 'username');
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.searchBlogs = async (req, res) => {
  const { query } = req.query;
  
  try {
    console.log('Search query:', query);  
    const blogs = await Blog.find({
      title: { $regex: query, $options: 'i' }  
    }).populate('user', 'username');
    
    res.json(blogs);
  } catch (error) {
    console.error('Error searching blogs:', error);  
    res.status(500).json({ error: 'Server error' });
  }
};