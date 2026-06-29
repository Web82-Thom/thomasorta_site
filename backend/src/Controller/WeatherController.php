<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

final class WeatherController extends AbstractController
{
    public function __construct(
        private readonly HttpClientInterface $httpClient,
        private readonly string $openWeatherApiKey,
    ) {
    }

    #[Route('/api/weather', name: 'api_weather_show', methods: ['GET'])]
    public function show(Request $request): JsonResponse
    {
        $city = trim((string) $request->query->get('city', 'montauban'));

        if ($city === '') {
            $city = 'montauban';
        }

        $response = $this->httpClient->request('GET', 'https://api.openweathermap.org/data/2.5/weather', [
            'query' => [
                'q' => $city,
                'lang' => 'fr',
                'units' => 'metric',
                'appid' => $this->openWeatherApiKey,
            ],
        ]);

        if ($response->getStatusCode() === 404) {
            return $this->json([
                'message' => 'Ville introuvable.',
            ], 404);
        }

        if ($response->getStatusCode() !== 200) {
            return $this->json([
                'message' => 'Le service météo est temporairement indisponible.',
            ], 502);
        }

        $weatherData = $response->toArray(false);

        $icon = $weatherData['weather'][0]['icon'] ?? null;

        return $this->json([
            'city' => $weatherData['name'] ?? $city,
            'description' => $weatherData['weather'][0]['description'] ?? '',
            'temperature' => isset($weatherData['main']['temp'])
                ? round($weatherData['main']['temp'])
                : null,
            'temperatureMin' => isset($weatherData['main']['temp_min'])
                ? round($weatherData['main']['temp_min'])
                : null,
            'temperatureMax' => isset($weatherData['main']['temp_max'])
                ? round($weatherData['main']['temp_max'])
                : null,
            'icon' => $icon,
            'iconUrl' => $icon !== null
                ? sprintf('https://openweathermap.org/img/wn/%s@2x.png', $icon)
                : null,
        ]);
    }
}