const { sendSMSNotification, sendWhatsAppNotification, makeVoiceCall, sendEmailNotification } = require('../utils/sendNotification');
const connectDB = require('../config/db');
// const admin = require('../config/firebase-admin');

const sendNotification = async (req, res) => {
  const { type, customerName } = req.body;

  try {
    const db = await connectDB();

    switch (type) {
      case 'sms':
        await sendSMSNotification(customerName, db);
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

const sendNotificationToMultipleTokens = async (req, res) => {
  try {
    const tokens = await getAllTokens();
    const message = 'This is a test message to multiple devices.';
    const payload = {
      notification: {
        title: 'Test Notification',
        body: message,
      },
    };

    const response = await admin.messaging().sendMulticast({
      tokens: tokens,
      ...payload,
    });

    console.log('Successfully sent message:', response);
    if (response.failureCount > 0) {
      const failedTokens = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(tokens[idx]);
        }
      });
      console.log('List of tokens that caused failures:', failedTokens);
    }

    res.status(200).json({ message: 'Notifications sent successfully' });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).json({ error: 'Error sending notifications' });
  }
};

async function getAllTokens() {
  try {
    
    const db = await connectDB();
    const tokensCollection = db.collection('Users');
    const tokens = await tokensCollection.find().toArray();
    return tokens.map(tokenDoc => tokenDoc.token);
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return [];
  }
}

const storeToken = async (req, res) => {
  try {
      const { token, userId/*, email */} = req.body;


      const db = await connectDB();
      const tokensCollection = db.collection('Users');

      await tokensCollection.updateOne(
          { userId },
          { $set: { token/*, email*/ } },
          { upsert: true }
      );

      console.log('Token received and stored:', token);
      res.status(200).json({ message: 'Token stored successfully' });
  } catch (error) {
      console.error('Error storing token:', error);
      res.status(400).json({ message: 'Invalid JSON or database error' });
  }
};


module.exports = {
  sendNotification, 
  sendNotificationToMultipleTokens,
  storeToken,
};
