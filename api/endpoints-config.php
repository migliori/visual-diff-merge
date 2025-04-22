<?php

/**
 * Visual Diff Merge - API Endpoints Configuration
 * This file provides information about API endpoints to the JavaScript client.
 * It can return either relative or absolute URLs based on the request.
 */

// Require composer autoloader if needed
require_once __DIR__ . '/../vendor/autoload.php';

// Set header for JSON response
header('Content-Type: application/json');
header('Cache-Control: max-age=3600, public');

// Determine if we should return absolute URLs
$absolute = isset($_GET['absolute']) && $_GET['absolute'] === '1';

// Determine the server protocol and host if absolute URLs are requested
$baseUrl = '';
if ($absolute) {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
    $host = $_SERVER['HTTP_HOST'];
    $scriptDir = dirname($_SERVER['SCRIPT_NAME']);
    $baseUrl = $protocol . $host . $scriptDir . '/';
}

// Provide endpoints with the appropriate base URL
$endpoints = [
    'diffProcessor' => $baseUrl . 'diff-processor.php',
    'ajaxDiffMerge' => $baseUrl . 'ajax-diff-merge.php',
    'endpoints'     => $baseUrl . 'endpoints-config.php'
];

// Output the endpoints
echo json_encode($endpoints);
