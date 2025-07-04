import React, { useState } from 'react';

const AuthPage = ({ onAuth }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const endpoint = mode === 'login' ? '/api/login' : '/api/register';
      const body = mode === 'login'
        ? { username, password }
        : { username, email, password };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (mode === 'login') {
        if (data.token) {
          localStorage.setItem('token', data.token);
          onAuth && onAuth();
        } else {
          setError(data.error || 'Login failed');
        }
      } else {
        if (data.message) {
          setMode('login');
          setError('Registration successful! Please log in.');
          resetForm();
        } else {
          setError(data.error || 'Registration failed');
        }
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: 32,
          borderRadius: 12,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          minWidth: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 8 }}>
          {mode === 'login' ? 'Login' : 'Register'}
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
        />
        {mode === 'register' && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 12,
            borderRadius: 6,
            border: 'none',
            background: '#4f8cff',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: 8
          }}
        >
          {loading ? (mode === 'login' ? 'Logging in...' : 'Registering...') : (mode === 'login' ? 'Login' : 'Register')}
        </button>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <span
                style={{ color: '#4f8cff', cursor: 'pointer' }}
                onClick={() => { setMode('register'); setError(''); }}
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                style={{ color: '#4f8cff', cursor: 'pointer' }}
                onClick={() => { setMode('login'); setError(''); }}
              >
                Login
              </span>
            </>
          )}
        </div>
        {error && (
          <div style={{ color: error.includes('success') ? 'green' : 'red', textAlign: 'center' }}>{error}</div>
        )}
      </form>
    </div>
  );
};

export default AuthPage; 