<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController
{
    #[Route('/api', name: 'api_home', methods: ['GET'])]
    public function __invoke(): JsonResponse
    {
        return new JsonResponse([
            'application' => 'ThomasOrta API',
            'version' => '1.0.0',
            'status' => 'running',
            'message' => 'API publique du site ThomasOrta.fr',
        ]);
    }
}