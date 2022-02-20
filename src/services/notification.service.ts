import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
const sgMail = require('@sendgrid/mail');
@injectable({scope: BindingScope.TRANSIENT})
export class NotificationService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * "Service used to notify customers via email"
   */
  SendEmail(userName: string, emailSubject: string, content: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: userName, // Change to your recipient
      from: llaves.EmailFrom, // Change to your verified sender,"is the email registered in sendgrid"
      subject: emailSubject,
      html: content,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })
  }
}

