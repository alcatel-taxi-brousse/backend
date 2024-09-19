import { Contact } from 'rainbow-node-sdk/lib/common/models/Contact';

export type LoginResponse = {
  token: string;
  loggedInUser: Contact;
  loggedInApplication: unknown;
};
