import { useState, type ChangeEvent, type FormEvent } from "react";

import type { ContactMessage } from "../../../../contact/domain/ContactMessage";
import { ContactApiService } from "../../../../contact/services/ContactApiService";
import {
  ContactFormValidator,
  type ContactFormErrors,
} from "../../../../contact/validators/ContactFormValidator";
import styles from "./Contact.module.css";
import type { ContactProps } from "./Contact.types";

type ContactFormStatus = "idle" | "loading" | "success" | "error";

const initialContactMessage: ContactMessage = {
  name: "",
  email: "",
  subject: "",
  message: "",
  consent: false,
  website: "",
};

export function Contact({ className }: ContactProps) {
  const [contactMessage, setContactMessage] = useState<ContactMessage>(
    initialContactMessage,
  );
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, type, value } = event.target;

    setContactMessage((currentContactMessage) => ({
      ...currentContactMessage,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors =
      ContactFormValidator.validate(contactMessage);

    setErrors(validationErrors);
    setFeedbackMessage("");

    if (!ContactFormValidator.isValid(validationErrors)) {
      setStatus("error");
      setFeedbackMessage("Merci de corriger les champs indiqués.");
      return;
    }

    try {
      setStatus("loading");

      const response = await ContactApiService.send(contactMessage);

      setContactMessage(initialContactMessage);
      setErrors({});
      setStatus("success");
      setFeedbackMessage(response.message);
    } catch (error) {
      setStatus("error");
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue pendant l’envoi du message.",
      );
    }
  }

  const isSubmitting = status === "loading";

  return (
    <section
      id="contact"
      className={`${styles.contact} ${className ?? ""}`}
      aria-labelledby="contact-title"
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Contact</p>

          <h2 id="contact-title" className={styles.title}>
            Parlons de votre projet.
          </h2>

          <p className={styles.description}>
            Vous avez besoin d’un site vitrine, d’une application métier ou
            d’un accompagnement technique ? Envoyez-moi un message, je vous
            répondrai rapidement.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.field}>
            <span>Nom</span>
            <input
              name="name"
              type="text"
              placeholder="Votre nom"
              value={contactMessage.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.name && (
              <small className={styles.errorMessage}>{errors.name}</small>
            )}
          </label>

          <label className={styles.field}>
            <span>Email</span>
            <input
              name="email"
              type="email"
              placeholder="votre@email.fr"
              value={contactMessage.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.email && (
              <small className={styles.errorMessage}>{errors.email}</small>
            )}
          </label>

          <label className={styles.field}>
            <span>Sujet</span>
            <input
              name="subject"
              type="text"
              placeholder="Sujet de votre demande"
              value={contactMessage.subject}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.subject && (
              <small className={styles.errorMessage}>{errors.subject}</small>
            )}
          </label>

          <label className={styles.field}>
            <span>Message</span>
            <textarea
              name="message"
              placeholder="Décrivez votre besoin..."
              rows={6}
              value={contactMessage.message}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.message && (
              <small className={styles.errorMessage}>{errors.message}</small>
            )}
          </label>

          <label className={styles.honeypot}>
            <span>Site web</span>
            <input
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={contactMessage.website}
              onChange={handleChange}
            />
          </label>

          <label className={styles.consent}>
            <input
              name="consent"
              type="checkbox"
              checked={contactMessage.consent}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <span>
              J’accepte que les informations saisies soient utilisées pour me
              recontacter dans le cadre de ma demande.
            </span>
          </label>

          {errors.consent && (
            <small className={styles.errorMessage}>{errors.consent}</small>
          )}

          <p className={styles.privacyNotice}>
            Vos données ne sont utilisées que pour répondre à votre message.
            Elles ne sont pas revendues ni utilisées à des fins publicitaires.
          </p>

          {feedbackMessage && (
            <p
              className={
                status === "success"
                  ? styles.successMessage
                  : styles.errorMessage
              }
            >
              {feedbackMessage}
            </p>
          )}

          <button
            className={styles.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
          </button>
        </form>
      </div>
    </section>
  );
}