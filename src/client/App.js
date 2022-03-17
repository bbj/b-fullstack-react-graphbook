import React, { useState } from 'react';

import '../../assets/css/style.css';

const App = () => {
  //initiate the state variable 'posts', and its setter function using useState() hook
  //setPosts(somePosts) => state change detected => React re-render App component
  const [posts, setPosts] = useState(initialPosts);

  return (
    <div className="container">
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