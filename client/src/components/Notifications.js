import React, { useEffect, useState } from 'react';

const messages = [
  'Welcome to BiteBook!'
];

function Notifications() {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    setMsg(messages[Math.floor(Math.random() * messages.length)]);
  }, []);
  return <div style={{ background: '#ffffff', color: '#900', padding: 5 ,fontSize: 20,alignItems: 'center',justifyContent: 'center',display: 'flex',}}>{msg}</div>;
}

export default Notifications; 