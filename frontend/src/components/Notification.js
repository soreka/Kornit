import React, { useState, useEffect } from 'react';
// import { messaging } from '../firebase';
// import { getToken } from 'firebase/messaging';

const NotificationBox = () => {
  const [customerName, setCustomerName] = useState('');
  const [showButtons, setShowButtons] = useState(false);

  // async function requestPermission() {
  //   try {
  //     const permission = await Notification.requestPermission();
  //     if (permission === 'granted') {
  //       const token = await getToken(messaging, {
  //         vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
  //       });
  //       console.log('Token Gen', token);
  //       sendDataToServer(token, /* Here we send UserID */);
  //     } else if (permission === 'denied') {
  //       alert('You denied the notification');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while retrieving token.', error);
  //   }
  // }

  // function sendDataToServer(token, userId) {
  //   fetch('http://localhost:5000/api/notifications/token', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ token: token, userId: userId }),
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error('Error:', error));
  // }

  const handleSendNotification = async type => {
    try {
      const response = await fetch(`http://localhost:5000/api/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, customerName }),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    }
  };

  // useEffect(() => {
  //   async function initialize() {
  //     return requestPermission();
  //   }
  //   initialize();
  // }, []);

  return (
    <div>
      <input
        type="text"
        value={customerName}
        onChange={e => setCustomerName(e.target.value)}
        placeholder="Enter Customer Name"
      />
      <button onClick={() => setShowButtons(!showButtons)}>
        {showButtons ? 'Hide Buttons' : 'Show Buttons'}
      </button>
      {showButtons && (
        <div>
          <button onClick={() => handleSendNotification('sms')}>Send SMS</button>
          <button onClick={() => handleSendNotification('call')}>Make Call</button>
          <button onClick={() => handleSendNotification('email')}>Send Email</button>
        </div>
      )}
    </div>
  );
};

export default NotificationBox;
