<?php

/**
 * Endpoint Configuration
 * Provides API endpoint and configuration details to the client
 */

// Load the main configuration
$config = require_once __DIR__ . '/config.php';

// Security headers
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

// Extract client-side configuration from main config
$clientConfig = isset($config['javascript']) ? $config['javascript'] : [];

// Always provide at least these basic settings
$response = [
    'apiEndpoint' => './api/',
    'lang' => 'en',
    'debug' => false,
    'logLevel' => 1
];

// Override with configured values if available
if (!empty($clientConfig)) {
    // Extract language settings
    if (isset($clientConfig['lang'])) {
        $response['lang'] = $clientConfig['lang'];
    }

    // Extract translations if available
    if (isset($clientConfig['translations'])) {
        $response['translations'] = $clientConfig['translations'];
    }

    // Debug settings
    if (isset($clientConfig['debug'])) {
        $response['debug'] = $clientConfig['debug'];
    }

    if (isset($clientConfig['logLevel'])) {
        $response['logLevel'] = $clientConfig['logLevel'];
    }

    // Other client-side configurations
    if (isset($clientConfig['theme'])) {
        $response['theme'] = $clientConfig['theme'];
    }

    // UI configuration
    if (isset($clientConfig['ui'])) {
        $response['ui'] = $clientConfig['ui'];
    }

    // Save options
    if (isset($clientConfig['saveOptions'])) {
        $response['saveOptions'] = $clientConfig['saveOptions'];
    }

    // API endpoint (if specified in config)
    if (isset($clientConfig['apiEndpoint'])) {
        $response['apiEndpoint'] = $clientConfig['apiEndpoint'];
    }

    // API base URL (if specified in config)
    if (isset($clientConfig['apiBaseUrl'])) {
        $response['apiBaseUrl'] = $clientConfig['apiBaseUrl'];
    }
}

// Output JSON response
echo json_encode($response);
