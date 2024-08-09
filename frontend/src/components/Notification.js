import React, { useState } from 'react';

const NotificationBox = () => {
    const [customerName, setCustomerName] = useState('');
    const [showButtons, setShowButtons] = useState(false);

    const handleSendNotification = async (type) => {
        try {
            const response = await fetch(`http://localhost:8080/send-${type}?name=${customerName}`);
            const result = await response.text();
            alert(result);
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('Failed to send notification');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter Customer Name"
            />
            <button onClick={() => setShowButtons(!showButtons)}>
                {showButtons ? 'Hide Buttons' : 'Show Buttons'}
            </button>
            {showButtons && (
                <div>
                    <button onClick={() => handleSendNotification('sms')}>Send SMS</button>
                    <button onClick={() => handleSendNotification('whatsapp')}>Send WhatsApp</button>
                    <button onClick={() => handleSendNotification('call')}>Make Call</button>
                    <button onClick={() => handleSendNotification('email')}>Send Email</button>
                </div>
            )}
        </div>
    );
};

export default NotificationBox;
