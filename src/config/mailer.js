import { createTransport } from 'nodemailer';

const transporter = createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    type: process.env.OAUTH_TYPE,
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

export default transporter;
