<?php

/**
 * Visual Diff Merge - Get File Content Endpoint
 *
 * This script provides a secure way to fetch file content, especially for PHP files
 * that shouldn't be directly executed when opened.
 */

require_once __DIR__ . '/../vendor/autoload.php';

use VisualDiffMerge\FileBrowser;
use VisualDiffMerge\PathManager;
use VisualDiffMerge\Security;
use VisualDiffMerge\Config;

// Initialize config
Config::init();

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Check request parameters
$filePath = isset($_GET['path']) ? $_GET['path'] : '';
$fileRefId = isset($_GET['refId']) ? $_GET['refId'] : '';

// If no parameters provided, return error
if (empty($filePath) && empty($fileRefId)) {
    echo json_encode([
        'success' => false,
        'error' => 'No file path or reference ID provided'
    ]);
    exit;
}

// Prioritize refId over direct path if both are provided
if (!empty($fileRefId)) {
    $pathManager = PathManager::getInstance();
    $resolvedPath = $pathManager->getPathFromRefId($fileRefId);

    if (!$resolvedPath) {
        echo json_encode([
            'success' => false,
            'error' => 'Invalid file reference ID'
        ]);
        exit;
    }

    $filePath = $resolvedPath;
}

// Validate the path for security
if (!Security::isPathAllowed($filePath)) {
    echo json_encode([
        'success' => false,
        'error' => Config::get('javascript.translations.en.accessDenied', 'Access denied: Path is outside allowed directories')
    ]);
    exit;
}

// Make sure the file exists
if (!file_exists($filePath)) {
    echo json_encode([
        'success' => false,
        'error' => 'File not found: ' . basename($filePath)
    ]);
    exit;
}

// Get the file content safely
$fileBrowser = new FileBrowser();
$fileContent = $fileBrowser->getFileContent($filePath);

// Add success flag for consistent response format
if (isset($fileContent['error'])) {
    $fileContent['success'] = false;
} else {
    $fileContent['success'] = true;
}

// Return the content
echo json_encode($fileContent);
