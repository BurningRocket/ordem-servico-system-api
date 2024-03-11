import { Twilio } from 'twilio';
import queryString from 'query-string';
import { TwilioMessageDto } from '../models/twilioMessageDto';

export class WhatsappService {
  constructor() { }

  async sendMessage(to: string, message: string) {
    const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    const response = await client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${to}`
    });

    return response;
  }

  async webhook(twilioMessage: any) {
    const jsonPayload: TwilioMessageDto = queryString.parse(twilioMessage.Body);
    

  }
}