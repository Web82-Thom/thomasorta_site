export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
  website?: string;
};