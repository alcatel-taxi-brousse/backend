import { Contact } from 'rainbow-node-sdk/lib/common/models/Contact';

export interface LoginResponse {
  token: string;
  loggedInUser: Contact;
  loggedInApplication: unknown;
}
