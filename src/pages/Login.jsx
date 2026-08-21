import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      toast.success('Successfully logged in!');
      onLogin();
    } else {
      toast.error('Invalid credentials. Use admin / admin123');
    }
  };

  return (
    <div className="auth-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/logo.png" alt="Levante Logo" className="login-logo" />
          <h2>Admin Portal</h2>
          <p>Sign in to manage your bookings</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Enter your username" 
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              required
            />
          </div>
          <button type="submit" className="btn-primary">Sign In</button>
        </form>
      </div>
    </div>
  );
}
