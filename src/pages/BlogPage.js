import React from 'react';

import BlogDetail from '../components/BlogDetail';

function BlogPage({ match }) {
  return (
    <>
      
      <BlogDetail match={match} />
    </>
  );
}

export default BlogPage;
