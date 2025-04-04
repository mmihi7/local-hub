// src/components/Login.tsx
import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const Login = () => {
  const { setIsLoggedIn } = useTheme(); // Access the setIsLoggedIn function from context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a successful login (replace this with actual authentication logic)
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true); // Update the login state
      // Optionally, clear the input fields
      setUsername('');
      setPassword('');
      // You can also redirect the user or show a success message
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;