<?php

declare(strict_types=1);

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

final class ContactMessage
{
    public function __construct(
        #[Assert\NotBlank(message: 'Le nom est obligatoire.')]
        #[Assert\Length(max: 100, maxMessage: 'Le nom ne peut pas dépasser {{ limit }} caractères.')]
        public readonly string $name,

        #[Assert\NotBlank(message: 'L’adresse e-mail est obligatoire.')]
        #[Assert\Email(message: 'L’adresse e-mail est invalide.')]
        #[Assert\Length(max: 180, maxMessage: 'L’adresse e-mail ne peut pas dépasser {{ limit }} caractères.')]
        public readonly string $email,

        #[Assert\NotBlank(message: 'Le sujet est obligatoire.')]
        #[Assert\Length(max: 150, maxMessage: 'Le sujet ne peut pas dépasser {{ limit }} caractères.')]
        public readonly string $subject,

        #[Assert\NotBlank(message: 'Le message est obligatoire.')]
        #[Assert\Length(
            min: 20,
            max: 5000,
            minMessage: 'Le message doit contenir au moins {{ limit }} caractères.',
            maxMessage: 'Le message ne peut pas dépasser {{ limit }} caractères.',
        )]
        public readonly string $message,

        #[Assert\IdenticalTo(value: true, message: 'Le consentement est obligatoire.')]
        public readonly bool $consent,

        #[Assert\Blank(message: 'Requête invalide.')]
        public readonly ?string $website = null,
    ) {
    }
}