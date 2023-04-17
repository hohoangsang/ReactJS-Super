import React, { Fragment } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

export default function Blog() {
  return (
    <div className='p-5'>
      <PostForm />
      <PostList />
    </div>
  );
}
