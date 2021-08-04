import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { env } from '../../env';

const { mailer } = env;
const transport = nodemailer.createTransport({
  service: mailer.service,
  auth: mailer.auth,
});

const sendMail = async (
  options: Pick<Mail.Options, 'to' | 'text' | 'subject'>,
): Promise<void> => {
  await transport.sendMail(options);
};

export { sendMail };
