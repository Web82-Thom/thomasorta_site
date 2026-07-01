<?php

declare(strict_types=1);

namespace App\Service\Contact;

use App\DTO\ContactMessage;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

final readonly class ContactMailSender
{
    public function __construct(
        private MailerInterface $mailer,
        private string $contactRecipientEmail,
        private string $contactSenderEmail,
    ) {
    }

    public function send(ContactMessage $contactMessage): void
    {
        $email = (new Email())
            ->from($this->contactSenderEmail)
            ->to($this->contactRecipientEmail)
            ->replyTo($contactMessage->email)
            ->subject('[ThomasOrta.fr] ' . $contactMessage->subject)
            ->text($this->buildTextContent($contactMessage));

        $this->mailer->send($email);
    }

    private function buildTextContent(ContactMessage $contactMessage): string
    {
        return sprintf(
            "Nouveau message depuis ThomasOrta.fr\n\nNom : %s\nEmail : %s\nSujet : %s\n\nMessage :\n%s\n",
            $contactMessage->name,
            $contactMessage->email,
            $contactMessage->subject,
            $contactMessage->message,
        );
    }
}
