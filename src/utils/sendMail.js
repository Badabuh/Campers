import axios from 'axios';

export const sendEmail = async (options) => {
  const { data } = await axios.post(
    'https://api.brevo.com/v3/smtp/email',
    {
      sender: { email: options.from },
      to: [{ email: options.to }],
      replyTo: { email: options.replyTo || options.from },
      subject: options.subject,
      htmlContent: options.html,
    },
    {
      headers: {
        accept: 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      timeout: 10000,
    },
  );

  console.log('Booking email accepted by Brevo:', {
    messageId: data.messageId,
    accepted: [options.to],
    rejected: [],
  });

  return data;
};
