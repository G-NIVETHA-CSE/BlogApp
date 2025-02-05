import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect,useState } from "react";

const HomePage = () => {

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get('https://blogappbackend-tsas.onrender.com/posts')
        .then(response => setPosts(response.data))
        .catch(error => console.error('Error fetching posts:', error));
  }, []);
  return (
    <div className="home-page">
      <header className="header">
        <nav className="nav-bar">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/posts" className="nav-link">My Blogs</Link>
          <Link to="/createpost" className="nav-link">Create Blog</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </nav>
      </header>

      <section className="intro">
        <h1 className="intro-title">Welcome to the Blog Platform 🎉</h1>
        <h2 className="intro-subtitle">Share Your Thoughts, Inspire the World 💡</h2>
        <p className="intro-text">
          Whether you're a passionate writer or just love sharing your ideas, this platform is for you! Start writing blogs, engage with the community, and get inspired by amazing stories. 🌍
        </p>
        <div className="cta">
          <Link to="/createpost" className="cta-button">Start Blogging ✍️</Link>
        </div>
      </section>

      <section className="featured-blogs">
        <h2 className="section-title">Featured Blogs 📚</h2>
        <div className="blog-list">
          <div className="blog">
            <h3 className="blog-title">The Future of Artificial Intelligence 🤖</h3>
            <p className="blog-description">AI is revolutionizing industries. Read how it's shaping the future and making the impossible possible!</p>
          </div>

          <div className="blog">
            <h3 className="blog-title">Travel the World: Top Destinations 🌍</h3>
            <p className="blog-description">Get ready for your next adventure with our curated list of top travel destinations for 2023!</p>
          </div>

          <div className="blog">
            <h3 className="blog-title">Healthy Habits: A Guide to Well-being 🧘‍♀️</h3>
            <p className="blog-description">Embrace a healthy lifestyle with simple tips and strategies for maintaining both mental and physical well-being.</p>
          </div>

          <div className="blog">
            <h3 className="blog-title">Exploring the Depths of Space 🚀</h3>
            <p className="blog-description">Join us on a journey through the vastness of space, where we explore the latest discoveries and the future of space travel!</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p className="footer-text">Ready to share your story? 📖</p>
        <Link to="/createpost" className="footer-button">Create Your Blog Today ✨</Link>
      </footer>
    </div>
  );
};

export default HomePage;