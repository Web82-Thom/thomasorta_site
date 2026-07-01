<?php

use App\Kernel;
use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\HttpFoundation\Request;

/*
 * IONOS public entrypoint for:
 * /testsite/api/index.php
 *
 * The Symfony application stays outside the public folder:
 * /private_thomasorta_site/backend
 */
$backendProjectDir = dirname(__DIR__, 2) . '/private_thomasorta_site/backend';

require_once $backendProjectDir . '/vendor/autoload.php';

// IONOS does not execute Symfony from its project root, so the production
// environment file is loaded explicitly from the private backend directory.
(new Dotenv())->usePutenv()->load($backendProjectDir . '/.env.prod.local');

$_SERVER['APP_ENV'] = $_ENV['APP_ENV'] = $_SERVER['APP_ENV'] ?? $_ENV['APP_ENV'] ?? 'prod';
$_SERVER['APP_DEBUG'] = $_ENV['APP_DEBUG'] = $_SERVER['APP_DEBUG'] ?? $_ENV['APP_DEBUG'] ?? '0';

// The physical front controller is stored in /api/index.php on IONOS, but the
// Symfony routes are intentionally declared with the /api prefix to match local
// development and frontend fetch URLs. Resetting SCRIPT_NAME prevents Symfony
// from stripping /api from the request path.
$_SERVER['SCRIPT_NAME'] = '/index.php';
$_SERVER['PHP_SELF'] = '/index.php';

$kernel = new Kernel($_SERVER['APP_ENV'], (bool) $_SERVER['APP_DEBUG']);
$request = Request::createFromGlobals();
$response = $kernel->handle($request);

$response->send();
$kernel->terminate($request, $response);
