const { sendSMSNotification, sendWhatsAppNotification, makeVoiceCall, sendEmailNotification } = require('../utils/sendNotification');
const connectDB = require('../config/db');

const sendNotification = async (req, res) => {
    const { type, customerName } = req.body;

    try {
        const db = await connectDB();

        switch (type) {
            case 'sms':
                await sendSMSNotification(customerName, db);
                break;
            case 'whatsapp':
                await sendWhatsAppNotification(customerName, db);
                break;
            case 'call':
                await makeVoiceCall(customerName, db);
                break;
            case 'email':
                await sendEmailNotification(customerName, db);
                break;
            default:
                return res.status(400).json({ message: 'Invalid notification type' });
        }

        res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send notification', error: error.message });
    }
};

module.exports = { sendNotification };
