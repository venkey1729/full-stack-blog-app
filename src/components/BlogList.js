import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogList.css';
import Search from './Search';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBlogs = async () => {
     
      try {
        const res = await axios.get('http://localhost:5000/api/blogs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(res.data);
      } catch (error) {
        console.error('Error fetching blogs:', error.response?.data || error.message);
      }
    };
    fetchBlogs();
  }, [token]);

  return (
    <div className="blog-list">
       <Search setBlogs={setBlogs} />
      {blogs.map(blog => (
        <div key={blog._id} className="blog-item">
          <h2>{blog.title}</h2>
          <p>{blog.content.substring(0, 100)}...</p>
          <Link to={`/blogs/${blog._id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
