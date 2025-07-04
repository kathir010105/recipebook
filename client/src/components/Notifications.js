import React, { useEffect, useState } from 'react';

const messages = [
  'Welcome to RecipeBook!'
];

function Notifications() {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    setMsg(messages[Math.floor(Math.random() * messages.length)]);
  }, []);
  return <div style={{ background: '#ff0', color: '#900', padding: 5 }}>{msg}</div>;
}

export default Notifications; 