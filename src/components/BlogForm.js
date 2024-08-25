import React, { useState} from 'react';
import{useNavigate}from 'react-router-dom'
import axios from 'axios';
import '../styles/BlogForm.css';



function BlogForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate=useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('Token:', token); 
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post('http://localhost:5000/api/blogs', { title, content, imageUrl }, config);
      navigate('/');
    } catch (error) {
      console.error('Error creating blog:', error.response?.data || error.message);
    }
  };
  


  return (
    <form className="blog-form" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Blog Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit">Create Blog</button>
    </form>
  );
}

export default BlogForm;
