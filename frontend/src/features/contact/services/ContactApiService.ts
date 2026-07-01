import type { ContactMessage } from "../domain/ContactMessage";

export type ContactApiResponse = {
  success?: boolean;
  message: string;
  errors?: Record<string, string>;
};

export class ContactApiService {
  private static readonly endpoint = "/api/contact";

  static async send(
    contactMessage: ContactMessage,
  ): Promise<ContactApiResponse> {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactMessage),
    });

    const body = await this.parseResponse(response);

    if (!response.ok) {
      throw new Error(
        body.message || "Une erreur est survenue pendant l'envoi du message.",
      );
    }

    return body;
  }

  private static async parseResponse(
    response: Response,
  ): Promise<ContactApiResponse> {
    try {
      return (await response.json()) as ContactApiResponse;
    } catch {
      return {
        success: false,
        message: response.ok
          ? "Message envoye."
          : "Une erreur est survenue pendant l'envoi du message.",
      };
    }
  }
}
