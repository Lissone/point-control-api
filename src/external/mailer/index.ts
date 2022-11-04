import { createTransport, SendMailOptions, Transporter } from 'nodemailer'
import { Address } from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

class Mailer {
  private readonly mailer: Transporter<SMTPTransport.SentMessageInfo>
  // valores padrão
  private readonly from: Address
  private readonly user = process.env.NODEMAILER_USER || 'test@gmail.com'

  constructor() {
    const transport = createTransport({
      service: 'gmail',
      auth: {
        user: this.user,
        pass: process.env.NODEMAILER_PASS || '123'
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    transport.verify(error => {
      // eslint-disable-next-line no-console
      if (error) console.error(error)
    })

    this.mailer = transport
    this.from = {
      name: 'PointControl',
      address: this.user
    }
  }

  send(mailOptions: SendMailOptions) {
    return this.mailer.sendMail({
      from: this.from,
      ...mailOptions
    })
  }
}

export const mail = new Mailer()
