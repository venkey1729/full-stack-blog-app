
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CommentSection.css';

function CommentSection({ blogId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/${blogId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComments(res.data);
      } catch (error) {
        console.error('Error fetching comments:', error.response?.data || error.message);
      }
    };
    fetchComments();
  }, [blogId, token]);

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/comments/${blogId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([...comments, res.data]);
      setText('');
    } catch (error) {
      console.error('Error posting comment:', error.response?.data || error.message);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <form onSubmit={submitComment}>
        <textarea
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <button type="submit">Post Comment</button>
      </form>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <p><strong>{comment.user.username}</strong>: {comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
