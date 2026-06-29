<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController
{
    #[Route('/', name: 'api_home', methods: ['GET'])]
    public function __invoke(): JsonResponse
    {
        return new JsonResponse([
            'application' => 'ThomasOrta API',
            'version' => '1.0.0',
            'status' => 'running',
            'framework' => 'Symfony 7.4',
            'environment' => 'development',
            'message' => 'Bienvenue sur l’API du site ThomasOrta.fr'
        ]);
    }
}