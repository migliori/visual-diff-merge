<?php

/**
 * Visual Diff Merge - Get URL Content Endpoint
 *
 * This script provides a secure way to fetch content from URLs,
 * helping to overcome CORS limitations for client-side requests.
 */

require_once __DIR__ . '/../vendor/autoload.php';

use VisualDiffMerge\Config;

// Initialize config
Config::init();

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Set headers for JSON response
header('Content-Type: application/json');

// Get the URL parameter
$url = isset($_GET['url']) ? $_GET['url'] : '';

// If no URL provided, return error
if (empty($url)) {
    echo json_encode([
        'success' => false,
        'error' => 'No URL provided'
    ]);
    exit;
}

// Basic URL validation
if (!filter_var($url, FILTER_VALIDATE_URL)) {
    echo json_encode([
        'success' => false,
        'error' => 'Invalid URL format'
    ]);
    exit;
}

// Configure context with proper User-Agent
$context = stream_context_create([
    'http' => [
        'header' => 'User-Agent: Visual-Diff-Merge/1.0',
        'timeout' => 15
    ]
]);

// Attempt to fetch content from the URL
try {
    // Set custom error handler to catch warnings from file_get_contents
    set_error_handler(function ($errstr) {
        throw new Exception($errstr);
    });

    $content = file_get_contents($url, false, $context);

    // Restore normal error handler
    restore_error_handler();

    if ($content === false) {
        echo json_encode([
            'success' => false,
            'error' => 'Failed to fetch content from URL'
        ]);
        exit;
    }

    // Return the content
    echo json_encode([
        'success' => true,
        'content' => $content,
        'url' => $url
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Error fetching URL: ' . $e->getMessage()
    ]);
}
