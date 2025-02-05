import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyBlog.css';
import { Link } from 'react-router-dom';

const MyBlog = () => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null); 
    const [updatedContent, setUpdatedContent] = useState("");
    const [email, setEmail] = useState("");
    const [subscribedPostId, setSubscribedPostId] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        axios.get('https://blogappbackend-tsas.onrender.com/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching posts:', error));
    };

    const handleDelete = (postId) => {
        axios.delete(`https://blogappbackend-tsas.onrender.com/posts/${postId}`)
            .then(() => {
                setPosts(posts.filter(post => post._id !== postId)); 
            })
            .catch(error => console.error('Error deleting post:', error));
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        setUpdatedContent(post.content);
    };

    const handleUpdate = () => {
        axios.put(`https://blogappbackend-tsas.onrender.com/posts/${editingPost._id}`, { content: updatedContent })
            .then(() => {
                setPosts(posts.map(post => post._id === editingPost._id ? { ...post, content: updatedContent } : post));
                setEditingPost(null);
                setUpdatedContent("");
            })
            .catch(error => console.error('Error updating post:', error));
    };

    const handleSubscribe = (postId) => {
        if (!email) {
            alert('Please enter an email address to subscribe.');
            return;
        }
        axios.post(`https://blogappbackend-tsas.onrender.com/posts/${postId}/subscribe`, { email })
            .then(() => {
                alert('Subscribed successfully!');
                setSubscribedPostId(postId);
                setEmail("");
            })
            .catch(error => console.error('Error subscribing:', error));
    };

    return (
        <div className="blog-container">
            <header className="header3">
                <nav className="nav-bar">
                    <Link to="/home" className="nav-link">🏠 Home</Link>
                    <Link to="/posts" className="nav-link">📝 My Blogs</Link>
                    <Link to="/createpost" className="nav-link">📢 Create Blog</Link>
                    <Link to="/profile" className="nav-link">👤 Profile</Link>
                </nav>
            </header>
            <h2 className="header">Welcome to My Blog!</h2>
            <p className="subheader">Where creativity meets the world. Explore my latest posts!</p>
            {posts.length === 0 ? (
                <p className="no-posts">No posts available yet. Stay tuned!</p>
            ) : (
                <div className="posts-grid">
                    {posts.map(post => (
                        <div key={post._id} className="post-card">
                            <h3 className="post-title">{post.title}</h3>
                            {editingPost && editingPost._id === post._id ? (
                                <div className="edit-mode">
                                    <textarea 
                                        value={updatedContent} 
                                        onChange={(e) => setUpdatedContent(e.target.value)} 
                                        className="edit-textarea"
                                    />
                                    <div className="edit-buttons">
                                        <button onClick={handleUpdate} className="save-btn">Save Changes</button>
                                        <button onClick={() => setEditingPost(null)} className="cancel-btn">Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="view-mode">
                                    <p className="post-content">{post.content}</p>
                                    <div className="post-actions">
                                        <button onClick={() => handleEdit(post)} className="edit-btn">Edit Post</button>
                                        <button onClick={() => handleDelete(post._id)} className="delete-btn">Delete Post</button>
                                    </div>
                                    <div className="subscribe-section">
                                        <input 
                                            type="email" 
                                            placeholder="Enter your email" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            className="email-input"
                                        />
                                        <button onClick={() => handleSubscribe(post._id)} className="subscribe-btn">Subscribe</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBlog;
