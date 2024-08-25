import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogDetail.css';
import CommentSection from './CommentSection';


function BlogDetail() {
  const { id } = useParams(); 
  const [blog, setBlog] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(res.data);
      } catch (error) {
        console.error('Error fetching blog:', error.response?.data || error.message);
      }
    };
    fetchBlog();
  }, [id, token]);

  return (
    <div className="blog-detail">
      {blog.title ? (
        <>
          <h1>{blog.title}</h1>
          {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} />}
          <p>{blog.content}</p>
          <CommentSection blogId={id} />
        </>
      ) : (
        <p>Loading blog details...</p>
      )}
    </div>
  );
}

export default BlogDetail;
