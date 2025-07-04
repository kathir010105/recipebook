import React, { useEffect, useState } from 'react';

function Profile({ onBack }) {
  const [profile, setProfile] = useState({ username: '', email: '' });

  useEffect(() => {
    fetch('/api/profile', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    })
      .then(res => res.json())
      .then(setProfile);
  }, []);

  function logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <div>
      <h2>Profile</h2>
      <div>Username: {profile.username}</div>
      <div>Email: {profile.email}</div>
      <button onClick={onBack}>Go Home</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile; 