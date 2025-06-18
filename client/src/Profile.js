import React from 'react';

function Profile() {
  // Broken: no user info
  return (
    <div>
      <h2>Profile (Broken)</h2>
      <div>Username: ???</div>
      <div>Email: ???</div>
      <button onClick={() => window.location.href = '/'}>Go Home (Broken)</button>
    </div>
  );
}

export default Profile; 