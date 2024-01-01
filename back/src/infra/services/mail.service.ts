import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025, // Port par défaut utilisé par MailHog
    secure: false, // Pas de connexion sécurisée nécessaire
  });

  async send(from: string, object: string, body: string): Promise<void> {
    const mailOptions = {
      from,
      to: 'destinataire@example.com',
      subject: 'Test d\'e-mail avec Node.js et MailHog',
      text: 'Ceci est un e-mail de test envoyé depuis Node.js avec MailHog.',
    };

    // Envoi de l'e-mail
    const info = await this.transporter.sendMail(mailOptions);
  }
}
