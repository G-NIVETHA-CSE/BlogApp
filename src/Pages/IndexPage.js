import React from 'react';
import Post from '../Post';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div>
      <Post />
      <div className="index-content">
        <h1 className="heading1">My Blog 📝</h1>
        <h1 className="heading2">Welcome to Our Creative Platform! ✨</h1>
        <p className="para1">
          Ready to unleash your creativity? 🚀 Dive into a world full of amazing stories, ideas, and inspiration! 🌈 Whether you're here to share your passion or explore new horizons, you're in the right place! 🙌
        </p>
        <p className="para2">
          Join a community of passionate bloggers and creative minds. 💡 Start by logging in or creating a new account — your next big idea is just a click away! 🌟
        </p>
        <Link to="/login">
          <button className="get-started-btn">Get Started 🚀</button>
        </Link>
      </div>
    </div>
  );
}

export default IndexPage;
