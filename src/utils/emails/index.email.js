import transporter from '../../config/mailer';
import Token from '../../models/token.model';
import { newToken } from '../lib/jwt.utils';
import getActivationMsg from './activation.email';

export default async function sendMessage({ user, msgType = 'activation' }) {
  const token = newToken(user);

  await Token.create({ token, userId: user._id, type: msgType });
  const mailOptions = getActivationMailOptions(user, token);
  return sendMsg(mailOptions);
}

function getActivationMailOptions(user, token) {
  const name = process.env.MAIL_DISPLAYED_NAME;
  const email = process.env.MAIL_USERNAME;
  return {
    from: `${name} <${email}>`,
    to: user.email,
    subject: 'Activate your account',
    html: getActivationMsg({ data: { token }, user }),
  };
}

function sendMsg(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        const err = new Error(`Message Sending Error : ${error.message}`);
        reject(err);
      } else resolve(info);
    });
  });
}
