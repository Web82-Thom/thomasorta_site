import type { ContactMessage } from "../domain/ContactMessage";

export type ContactFormErrors = Partial<
  Record<keyof ContactMessage, string>
>;

export class ContactFormValidator {
  static validate(
    contactMessage: ContactMessage,
  ): ContactFormErrors {
    const errors: ContactFormErrors = {};

    if (contactMessage.website?.trim()) {
      errors.website = "Requête invalide.";
    }

    if (!contactMessage.name.trim()) {
      errors.name = "Veuillez saisir votre nom.";
    } else if (contactMessage.name.length > 100) {
      errors.name = "Le nom ne peut pas dépasser 100 caractères.";
    }

    if (!contactMessage.email.trim()) {
      errors.email = "Veuillez saisir votre adresse e-mail.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactMessage.email)
    ) {
      errors.email = "Adresse e-mail invalide.";
    }

    if (!contactMessage.subject.trim()) {
      errors.subject = "Veuillez saisir un sujet.";
    } else if (contactMessage.subject.length > 150) {
      errors.subject = "Le sujet ne peut pas dépasser 150 caractères.";
    }

    if (!contactMessage.message.trim()) {
      errors.message = "Veuillez saisir un message.";
    } else if (contactMessage.message.length < 20) {
      errors.message =
        "Votre message doit contenir au moins 20 caractères.";
    } else if (contactMessage.message.length > 5000) {
      errors.message =
        "Le message ne peut pas dépasser 5000 caractères.";
    }

    if (!contactMessage.consent) {
      errors.consent =
        "Vous devez accepter le traitement de vos données.";
    }

    return errors;
  }

  static isValid(errors: ContactFormErrors): boolean {
    return Object.keys(errors).length === 0;
  }
}