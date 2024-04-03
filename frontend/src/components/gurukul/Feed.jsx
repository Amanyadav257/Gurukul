import React, { useState, useEffect } from 'react';
import Post from './Post';
import Container from './Container';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:9002/api/questions')
      .then((res) => {
        setPosts(res.data.reverse());
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="flex flex-col p-2 flex-1 md:flex-[0.6]">
      <Container />
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

export default Feed;
