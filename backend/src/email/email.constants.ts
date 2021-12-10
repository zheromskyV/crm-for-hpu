import { Options } from 'nodemailer/lib/smtp-transport';

export const DOMAIN_EMAIL = 'zheromsky.autosender@gmail.com';
export const ADMIN_EMAIL = 'vladislavzheromsky@gmail.com';

export const TRANSPORT_CONFIG: Options = {
  service: 'gmail',
  auth: {
    user: DOMAIN_EMAIL,
    pass: 'aut0sender',
  },
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  tls: { rejectUnauthorized: false },
};

export const STD_SENDER = 'Автоматизированная система учета и обработки заявок в ЖКХ';
