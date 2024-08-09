const nodemailer = require('nodemailer');
const twilio = require('twilio');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const getCustomerData = async (customerName, db) => {
    const collection = db.collection(process.env.MONGODB_COLLECTION_NAME);
    return await collection.findOne({ name: customerName });
};

const sendSMSNotification = async (customerName, db) => {
    const customer = await getCustomerData(customerName, db);
    if (!customer || !customer.phone) {
        console.error(`No valid phone number found for ${customerName}`);
        return;
    }
    try {
        const message = await client.messages.create({
            body: 'Hi, please fill the form again. Thank you!',
            from: process.env.TWILIO_FROM_NUMBER,
            to: customer.phone.trim()
        });
        console.log(`SMS sent to ${customer.phone} with SID: ${message.sid}`);
    } catch (error) {
        console.error(`Failed to send SMS to ${customer.phone}:`, error);
    }
};



const makeVoiceCall = async (customerName, db) => {
    const customer = await getCustomerData(customerName, db);
    if (!customer || !customer.phone) {
        console.error(`No valid phone number found for ${customerName}`);
        return;
    }
    try {
        const call = await client.calls.create({
            url: process.env.TWIML_URL,
            to: customer.phone.trim(),
            from: process.env.TWILIO_FROM_NUMBER
        });
        console.log(`Call to ${customer.phone} initiated. Call SID: ${call.sid}`);
    } catch (error) {
        console.error(`Failed to call ${customer.phone}:`, error);
    }
};

const sendEmailNotification = async (customerName, db) => {
    const customer = await getCustomerData(customerName, db);
    if (!customer || !customer.email) {
        console.error(`No valid email found for ${customerName}`);
        return;
    }
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customer.email.trim(),
        subject: 'Notification from Nodemailer',
        text: 'Hi, please fill the form again. Thank you!',
        html: '<h3>Hi, please fill the form again. Thank you!</h3>'
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${customer.email}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = {
    sendSMSNotification,
    makeVoiceCall,
    sendEmailNotification
};
