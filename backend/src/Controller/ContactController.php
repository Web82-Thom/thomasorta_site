<?php

declare(strict_types=1);

namespace App\Controller;

use App\DTO\ContactMessage;
use App\Service\Contact\ContactMailSender;
use App\Validator\ContactMessageValidator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\ConstraintViolationListInterface;

final class ContactController extends AbstractController
{
    #[Route('/api/contact', name: 'api_contact_send', methods: ['POST'])]
    public function send(
        Request $request,
        ContactMessageValidator $contactMessageValidator,
        ContactMailSender $contactMailSender,
    ): JsonResponse {
        $payload = json_decode($request->getContent(), true);

        if (!is_array($payload)) {
            return $this->json([
                'success' => false,
                'message' => 'Payload JSON invalide.',
            ], 400);
        }

        $contactMessage = new ContactMessage(
            name: trim((string) ($payload['name'] ?? '')),
            email: trim((string) ($payload['email'] ?? '')),
            subject: trim((string) ($payload['subject'] ?? '')),
            message: trim((string) ($payload['message'] ?? '')),
            consent: (bool) ($payload['consent'] ?? false),
            website: isset($payload['website'])
                ? trim((string) $payload['website'])
                : null,
        );

        $violations = $contactMessageValidator->validate($contactMessage);

        if ($violations->count() > 0) {
            return $this->json([
                'success' => false,
                'message' => 'Certains champs sont invalides.',
                'errors' => $this->formatValidationErrors($violations),
            ], 400);
        }

        try {
            $contactMailSender->send($contactMessage);
        } catch (TransportExceptionInterface) {
            return $this->json([
                'success' => false,
                'message' => 'Impossible d\'envoyer le message pour le moment.',
            ], 500);
        }

        return $this->json([
            'success' => true,
            'message' => 'Votre message a bien été envoyé.',
        ]);
    }

    /**
     * @return array<string, string>
     */
    private function formatValidationErrors(
        ConstraintViolationListInterface $violations,
    ): array {
        $errors = [];

        foreach ($violations as $violation) {
            $fieldName = $violation->getPropertyPath();

            if ($fieldName === '') {
                $fieldName = 'form';
            }

            $errors[$fieldName] = (string) $violation->getMessage();
        }

        return $errors;
    }
}
