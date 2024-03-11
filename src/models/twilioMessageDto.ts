export interface TwilioMessageDto {
  Body?: string;
  To?: string;
  From?: string;
  MessageSid?: string;
  AccountSid?: string;
  MessagingServiceSid?: string;
  NumMedia?: string;
  NumSegments?: string;
  ApiVersion?: string;
  SmsMessageSid?: string;
  SmsSid?: string;
  SmsStatus?: string;
  MessageStatus?: string;
  ChannelToAddress?: string;
  ChannelPrefix?: string;
  ProfileName?: string;
  WaId?: string;
  ButtonText?: string;
  ButtonPayload?: string;
  ReferralNumMedia?: string;
}