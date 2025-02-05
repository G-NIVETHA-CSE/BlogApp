import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  async function register(ev) {
    ev.preventDefault();

    if (password !== confirmPassword) {
      setMessage('🚨 Passwords do not match! Please try again.');
      return;
    }

    const response = await fetch('https://blogappbackend-tsas.onrender.com/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, confirmPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      setMessage('🎉 Registration successful! Welcome aboard! 🚀');
    } else if (response.status === 400) {
      setMessage('❌ User already exists. Please choose a different username.');
    } else {
      setMessage('⚠️ Registration failed. Please try again later.');
    }
  }

  return (
    <div className="registration-container">
      <form className="register" onSubmit={register}>
        <h1>Register Now 🎉</h1>
        <input 
          type="text" 
          placeholder="Username ✨" 
          value={username} 
          onChange={ev => setUsername(ev.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password 🔒" 
          value={password} 
          onChange={ev => setPassword(ev.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Confirm Password 🔑" 
          value={confirmPassword} 
          onChange={ev => setConfirmPassword(ev.target.value)} 
          required 
        />
        <button className="reg-btn">Register 🚀</button>

        {message && (
          <p className={`result ${message.includes('successful') ? 'success' : 'failure'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
