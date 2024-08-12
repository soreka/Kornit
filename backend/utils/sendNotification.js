const nodemailer = require('nodemailer');
const twilio = require('twilio');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

customers = [{
    "_id": {
      "$oid": "66b4f320523905b7f05e916b"
    },
    name: "ahmed",
    email: "Ahmed.m.tayah@gmail.com",
    phone: "+972527588912"
  },
  {
    "_id": {
      "$oid": "66b4ee73523905b7f05e9166"
    },
    name: "adan",
    email: "adanmwasse@gmail.com",
    phone: "+972546662844"
  }]

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

const getCustomerData = async (customerName, db) => {
    const collection = db.collection(process.env.MONGODB_COLLECTION_NAME);
    return await collection.findOne({ name: customerName });
};

const sendSMSNotification = async (customerName, db) => {
    customer = customers[0]
    if (!customer || !customer.phone) {
        console.error(`No valid phone number found for ${customerName}`);
        return;
    }
    try {
        const message = await client.messages.create({
            body: `Hello ${customerName},\n\nWe kindly request that you fill out the form again. Thank you for your attention.\n\nBest regards,\nThe Kornit Team`,
            from: process.env.TWILIO_FROM_NUMBER,
            to: customer.phone.trim()
        });
        console.log(`SMS sent to ${customer.phone} with SID: ${message.sid}`);
    } catch (error) {
        console.error(`Failed to send SMS to ${customer.phone}:`, error);
    }
};



const makeVoiceCall = async (customerName, db) => {
    // const customer = await getCustomerData(customerName, db);
    customer = customers[0]
    if (!customer || !customer.phone) {
        console.error(`No valid phone number found for ${customerName}`);
        return;
    }

    // TwiML message to be used in the voice call
    const twimlMessage = `
        <Response>
            <Say voice="alice" rate="x-slow">
                Hello ${customerName}, this is Kornit. We kindly request that you fill out the form again. Thank you for your attention,Best regards,The Kornit Team.
            </Say>
        </Response>
    `;

    try {
        
        const call = await client.calls.create({
            twiml: twimlMessage, // TwiML message directly
            to: customer.phone.trim(),
            from: process.env.TWILIO_FROM_NUMBER
        });
        console.log(`Call to ${customer.phone} initiated. Call SID: ${call.sid}`);
    } catch (error) {
        console.error(`Failed to call ${customer.phone}:`, error);
    }
};

const sendEmailNotification = async (customerName, db) => {
    // const customer = await getCustomerData(customerName, db);
    customer = customers[0]
    if (!customer || !customer.email) {
        console.error(`No valid email found for ${customerName}`);
        return;
    }
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customer.email.trim(),
        subject: 'Notification from Kornit',
        text: `Hello ${customerName},\n\n We kindly request that you fill out the form again. Thank you for your attention.\n\nBest regards,\nThe Kornit Team`,
        html: `<p>Hello ${customerName},</p><p>We kindly request that you fill out the form again. Thank you for your attention.</p><p>Best regards,<br>The Kornit Team</p>`
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
