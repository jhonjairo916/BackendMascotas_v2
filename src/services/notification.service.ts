import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
const sgMail = require('@sendgrid/mail');
var twilio = require('twilio');
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
  SendSMS(telefonoDestino: string, message: string) {
    try {
      var accountSid = process.env.TWILIO_SID;
      var authToken = process.env.TWILIO_TOKEN;
      //const accountSid = 'AC3c2076bfdf980f0db223f40beabfa5aa'; // Your Account SID from www.twilio.com/console
      //const authToken = '2a90cc54520db8c93442b21ad147217a'; // Your Auth Token from www.twilio.com/console

      const client = new twilio(accountSid, authToken);

      client.messages
        .create({
          body: message,
          to: telefonoDestino, // Text this number
          from: llaves.TwilioPhone, // From a valid Twilio number
        })
        .then((message: any) => {
          console.log(message.sid);
        });
      return true;
    } catch {
      return false;
    }

  }
}

