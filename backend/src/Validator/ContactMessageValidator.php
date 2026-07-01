<?php

declare(strict_types=1);

namespace App\Validator;

use App\DTO\ContactMessage;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

final readonly class ContactMessageValidator
{
    public function __construct(
        private ValidatorInterface $validator,
    ) {
    }

    public function validate(
        ContactMessage $contactMessage,
    ): ConstraintViolationListInterface {
        return $this->validator->validate($contactMessage);
    }
}