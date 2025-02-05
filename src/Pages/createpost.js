import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './CreatePost.css';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState('Technology');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            setMessage('🚨 Both title and content are required! Please fill them in. 🚨');
            return;
        }
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('https://blogappbackend-tsas.onrender.com/createpost', { title, content, category });
            setMessage('🎉 Post created successfully! 🎉');
            navigate('/posts');
        } catch (error) {
            setMessage('❌ Failed to create post. Try again! ❌');
            console.error('Error creating post:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClearForm = () => {
        setTitle('');
        setContent('');
        setCategory('Technology');
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div id="create-post-container" className="create-post-container">
            <header className="header2">
                <nav className="nav-bar">
                    <Link to="/home" className="nav-link">🏠 Home</Link>
                    <Link to="/posts" className="nav-link">📝 My Blogs</Link>
                    <Link to="/createpost" className="nav-link">📢 Create Blog</Link>
                    <Link to="/profile" className="nav-link">👤 Profile</Link>
                </nav>
            </header>

            <h2 className="section-title">💡 Create Your Post 💡</h2>

            {message && <div className="message">{message}</div>}

            <div className="category-container">
                <label htmlFor="category" className="category-label">📚 Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    required
                    className="category-select"
                >
                    <option value="Technology">🚀 Technology</option>
                    <option value="Lifestyle">🌱 Lifestyle</option>
                    <option value="Health">💪 Health</option>
                    <option value="Business">💼 Business</option>
                    <option value="Travel">✈️ Travel</option>
                </select>
            </div>

            <form id="create-post-form" onSubmit={handleSubmit} className="create-post-form">
                <div className="form-group">
                    <label htmlFor="post-title" className="form-label">🖊️ Title</label>
                    <input
                        id="post-title"
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-input"
                    />
                    <p className={`char-count ${title.length > 100 ? 'warning' : ''}`}>{title.length}/100 characters</p>
                </div>

                <div className="form-group">
                    <label htmlFor="post-content" className="form-label">📝 Content</label>
                    <textarea
                        id="post-content"
                        placeholder="Write your content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="form-textarea"
                    />
                    <p className={`char-count ${content.length > 1000 ? 'warning' : ''}`}>{content.length}/1000 characters</p>
                </div>

                <div className="buttons">
                    <button id="submit-post" type="submit" disabled={loading} className="submit-btn">
                        {loading ? '🔄 Creating Post...' : '✅ Submit Post'}
                    </button>
                    <button id="clear-form" type="button" onClick={handleClearForm} className="clear-btn">🧹 Clear Form</button>
                </div>
            </form>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3 className="modal-title">⚡ Are you sure you want to submit the post?</h3>
                        <button onClick={handleSubmit} className="modal-btn">Yes, Submit!</button>
                        <button onClick={toggleModal} className="modal-btn">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreatePost;
