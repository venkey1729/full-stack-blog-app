// components/Search.js
import React, { useState } from 'react';
import axios from 'axios';
//import '../styles/Search.css';

function Search({ setBlogs }) {
  const [query, setQuery] = useState('');
  const token = localStorage.getItem('token');

  const searchBlogs = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/blogs/search?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Search result:', res.data);
      setBlogs(res.data);
    } catch (error) {
      console.error('Error searching blogs:', error.response?.data || error.message);
    }
  };

  return (
    <form className="search-form" onSubmit={searchBlogs}>
      <input
        type="text"
        placeholder="Search blogs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
