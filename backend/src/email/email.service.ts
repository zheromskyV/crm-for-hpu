import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { ADMIN_EMAIL, DOMAIN_EMAIL, STD_SENDER, TRANSPORT_CONFIG } from './email.constants';
import { Options } from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = createTransport(TRANSPORT_CONFIG);
  }

  async requestCall(phoneNumber: string, userEmail: string): Promise<void> {
    await this.sendEmail(
      ADMIN_EMAIL,
      userEmail,
      'Пользователь запросил звонок',
      `
        <h2>Пользователь ${userEmail} запросил телефонный звонок</h2>
        <h3>Указанный номер телефона: <a href="tel:${phoneNumber}">${phoneNumber}</a></h3>
        <br>
        <p>${STD_SENDER}</p>
      `
    );
  }

  async notifyAgent(agentEmail: string, requestSubject: string, userEmail: string): Promise<void> {
    await this.sendEmail(
      agentEmail,
      userEmail,
      `На ваше имя создана заявка - "${requestSubject}"`,
      `
        <h2>Пользователь ${userEmail} создал заявку на ваше имя</h2>
        <h3>Зайдите в систему и возьмите ее в работу. Тема: ${requestSubject}</h3>
        <br>
        <p>${STD_SENDER}</p>
      `
    );
  }

  private async sendEmail(
    emailAddress: string,
    replyEmailAddress: string,
    subject: string,
    bodyHtml: string
  ): Promise<void> {
    const mailOptions: Options = {
      from: `${STD_SENDER} (${DOMAIN_EMAIL})`,
      to: emailAddress,
      replyTo: replyEmailAddress,
      html: bodyHtml,
      subject,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
