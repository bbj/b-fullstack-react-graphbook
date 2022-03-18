import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import '../../assets/css/style.css';

const App = () => {
  //initiate the state variable 'posts', and its setter function using useState() hook
  //setPosts(somePosts) => state change detected => React re-render App component
  const [posts, setPosts] = useState(initialPosts);
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (event) => {
    //stop web browser to actually submit the form and reload the page
    event.preventDefault();
    const newPost = {
      id: posts.length + 1, //used for <div key={post.id} className="post">
      text: postContent,
      user: {
        avatar: '/uploads/avatar1.png',
        username: 'Fake User'
      }
    };
    //update the "posts" state, merging newPost with current posts
    //destructured assignment of posts array into new array
    setPosts([newPost, ...posts]);
    //clear state: update the "postContent" state
    setPostContent('');
  };

  return (
    <div className="container">
      <Helmet>
        <title>Graphbook - Feed</title>
        <meta name="description" content="Newsfeed of all your friends on Graphbook" />
      </Helmet>
      <div className="postForm">
        <form onSubmit={handleSubmit}>
          <textarea value={postContent} onChange={(e) =>
            setPostContent(e.target.value)}
            placeholder="Write your custom post!" />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="feed">
        {initialPosts.map((post, i) =>
          <div key={post.id} className="post">
            <div className="header">
              <img src={post.user.avatar} />
              <h2>{post.user.username}</h2>
            </div>
            <p className="content">
              {post.text}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const initialPosts = [
  {
    id: 2,
    text: 'Lorem ipsum',
    user: {
      avatar: '/uploads/avatar1.png',
      username: 'Test User'
    }
  },
  {
    id: 1,
    text: 'Lorem ipsum',
    user: {
      avatar: '/uploads/avatar2.png',
      username: 'Test User 2'
    }
  }
];

export default App;