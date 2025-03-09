import { createTransport, SendMailOptions, Transporter } from 'nodemailer'
import { Address } from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

class Mailer {
  send(mailOptions: SendMailOptions) {
    return true
  }
}

export const mail = new Mailer()
