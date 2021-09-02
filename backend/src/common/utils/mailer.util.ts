import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { env } from '../../env';
import { google } from 'googleapis';

const { mailer } = env;

const oauth2Client = new google.auth.OAuth2(
  mailer.auth.clientId,
  mailer.auth.clientSecret,
);

oauth2Client.setCredentials({
  refresh_token: mailer.auth.refreshToken,
});

const createTransport = async (): Promise<nodemailer.Transporter> => {
  const { token } = await oauth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      ...mailer.auth,
      accessToken: token,
    },
  });
};

const sendMail = async (
  options: Pick<
    Mail.Options,
    'to' | 'bcc' | 'text' | 'subject' | 'attachments'
  >,
): Promise<void> => {
  const transporter = await createTransport();

  await transporter.sendMail(options);
};

export { sendMail };
