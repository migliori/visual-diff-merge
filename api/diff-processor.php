<?php

use VisualDiffMerge\DiffViewer;
use VisualDiffMerge\DebugLogger;
use VisualDiffMerge\Config;
use VisualDiffMerge\PathManager;
use VisualDiffMerge\Security;

require_once __DIR__ . '/../vendor/autoload.php';

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Initialize configuration system
Config::init();

// Initialize demo mode flag
$demoEnabled = false;

// Access configuration values consistently
$debug = Config::isDebugEnabled();
$contextLines = Config::get('php.diff.contextLines');
$logFile = Config::get('php.debug.logFile');
$userLang = Config::get('javascript.lang');

// Always prepare for JSON response
header('Content-Type: application/json');

// Basic request validation
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo json_encode([
        'error' => Config::get('javascript.translations.' . $userLang . '.invalidRequestMethod'),
        'success' => false
    ]);
    exit;
}

// Initialize common variables
$data = [];
$serverSaveEnabled = false;
$fileRefId = '';
$oldFileRefId = '';
$newFileName = '';
$oldFileName = '';
$fileExtension = '';

// Parse input based on content type
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? $_SERVER["CONTENT_TYPE"] : '';
$isJson = strpos($contentType, 'application/json') !== false;

if ($isJson) {
    $jsonInput = file_get_contents('php://input');
    $jsonData = json_decode($jsonInput, true);

    if ($jsonData === null && json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode([
            'error' => 'Invalid JSON data: ' . json_last_error_msg(),
            'success' => false
        ]);
        exit;
    }

    $data = $jsonData;
} else {
    $data = $_POST;
}

// Initialize logging
if ($debug) {
    DebugLogger::init(true, __DIR__ . '/' . $logFile);
    DebugLogger::log("Processing diff request", $data);
}

// Validate required fields
if (!isset($data['old']) || !isset($data['new'])) {
    echo json_encode([
        'error' => 'Missing required old or new content information',
        'success' => false
    ]);
    exit;
}

try {
    // Determine file extension if provided
    if (isset($data['filepath'])) {
        $fileExtension = pathinfo($data['filepath'], PATHINFO_EXTENSION);
    } elseif (isset($data['old']['filename'])) {
        $fileExtension = pathinfo($data['old']['filename'], PATHINFO_EXTENSION);
    } elseif (isset($data['new']['filename'])) {
        $fileExtension = pathinfo($data['new']['filename'], PATHINFO_EXTENSION);
    }

    // Extract content for comparison
    $oldContent = $newContent = null;

    // Get old content
    if ($data['old']['type'] === 'file' && isset($data['old']['server_path']) && file_exists($data['old']['server_path'])) {
        $oldContent = file_get_contents($data['old']['server_path']);
        $oldFileName = basename($data['old']['server_path']);
    } elseif ($data['old']['type'] === 'url' && !empty($data['old']['url']) && empty($data['old']['content'])) {
        // URL content will be fetched later if needed
        $oldContent = null;
        $oldFileName = basename(parse_url($data['old']['url'], PHP_URL_PATH));
    } else {
        $oldContent = $data['old']['content'] ?? '';
        $oldFileName = $data['old']['filename'] ?? 'old-file';
    }

    // Get new content
    if ($data['new']['type'] === 'file' && isset($data['new']['server_path']) && file_exists($data['new']['server_path'])) {
        $newContent = file_get_contents($data['new']['server_path']);
        $newFileName = basename($data['new']['server_path']);
    } elseif ($data['new']['type'] === 'url' && !empty($data['new']['url']) && empty($data['new']['content'])) {
        // URL content will be fetched later if needed
        $newContent = null;
        $newFileName = basename(parse_url($data['new']['url'], PHP_URL_PATH));
    } else {
        $newContent = $data['new']['content'] ?? '';
        $newFileName = $data['new']['filename'] ?? 'new-file';
    }

    // Early check for identical content when both contents are available
    if ($oldContent !== null && $newContent !== null && $oldContent === $newContent) {
        if ($debug) {
            DebugLogger::log("Content comparison: Files are identical");
        }

        // Get JavaScript configuration for translations
        $jsConfig = Config::getJsConfig();
        $userLang = $jsConfig['lang'];

        // Get language-specific translations
        if (isset($jsConfig['translations'][$userLang]) && is_array($jsConfig['translations'][$userLang])) {
            $translations = $jsConfig['translations'][$userLang];
        } else {
            $translations = $jsConfig['translations']['en'] ?? [];
        }

        // Return early with identical content message
        echo json_encode([
            'success' => true,
            'identical' => true,
            'message' => $translations['identicalContent'] ?? 'The files are identical.',
            'config' => [
                'translations' => $translations
            ]
        ]);
        exit;
    }

    // Create DiffViewer with common config
    $diffViewer = new DiffViewer([
        'debug' => $debug,
        'diffContextLines' => Config::get('php.diff.contextLines'),
        'ignoreWhitespace' => Config::get('php.diff.ignoreWhitespace'),
        'ignoreCase' => Config::get('php.diff.ignoreCase'),
        'serverSaveEnabled' => false,
        'newFileServerPath' => ''
    ]);

    // Initialize path manager
    $pathManager = PathManager::getInstance();

    // Process based on content types
    if ($data['old']['type'] === 'url' && $data['new']['type'] === 'url') {
        // Handle URL comparison
        $oldUrl = $data['old']['url'] ?? '';
        $newUrl = $data['new']['url'] ?? '';

        if (empty($oldUrl) || empty($newUrl)) {
            throw new Exception("Missing URL for comparison");
        }

        $diffData = $diffViewer->compareUrls($oldUrl, $newUrl, $fileExtension);
    } elseif (
        $data['old']['type'] === 'file' && $data['new']['type'] === 'file' &&
        isset($data['old']['path']) && isset($data['new']['path']) &&
        file_exists($data['old']['path']) && file_exists($data['new']['path'])
    ) {
        // Enable server save for file comparison
        $serverSaveEnabled = true;

        // Check if demo-enabler.php exists in the root
        if (file_exists(__DIR__ . '/../demo-enabler.php')) {
            // Include the file and get the DEMO_ENABLED constant
            include_once __DIR__ . '/../demo-enabler.php';
            if (defined('DEMO_ENABLED')) {
                $demoEnabled = DEMO_ENABLED;
            }
        }

        // Register both paths with PathManager and get secure reference IDs
        $refIds = $pathManager->registerFilePair($data['new']['path'], $data['old']['path']);
        $fileRefId = $refIds['newRefId'];
        $oldFileRefId = $refIds['oldRefId'];

        // Update DiffViewer config
        $diffViewer->updateConfig([
            'serverSaveEnabled' => $serverSaveEnabled,
            'fileRefId' => $fileRefId
        ]);

        $diffData = $diffViewer->compareFiles($data['old']['path'], $data['new']['path']);
    } else {
        // Handle content comparison (text, upload, or file without server path)
        $oldContent = $data['old']['content'] ?? '';
        $newContent = $data['new']['content'] ?? '';

        // Special handling for URL+content mixed comparisons
        if ($data['old']['type'] === 'url' && $data['new']['type'] === 'url') {
            // If both are URLs but we got here, they may have provided content directly
            // Let's use compareUrls if URLs are provided but content is empty
            if (
                empty($oldContent) && !empty($data['old']['url']) &&
                empty($newContent) && !empty($data['new']['url'])
            ) {
                $diffData = $diffViewer->compareUrls($data['old']['url'], $data['new']['url'], $fileExtension);
            } else {
                // Use provided content for comparison
                $diffData = $diffViewer->compareContent($oldContent, $newContent, $fileExtension);
            }
        } elseif ($data['old']['type'] === 'url' && empty($oldContent) && !empty($data['old']['url'])) {
        // Handle a URL + content comparison (left side is URL)
            try {
                // Use compareUrls with a modified approach for mixed content
                $oldUrl = $data['old']['url'];
                // Create a temporary data URL for the new content
                $tempNewUrl = 'data:text/plain;base64,' . base64_encode($newContent);
                $diffData = $diffViewer->compareUrls($oldUrl, $tempNewUrl, $fileExtension);
            } catch (Exception $e) {
                // If compareUrls fails, fall back to manual fetching
                if ($debug) {
                    DebugLogger::log("Error using compareUrls, falling back to manual fetch: " . $e->getMessage());
                }

                // Get content for the URL
                try {
                    $context = stream_context_create([
                        'http' => [
                            'timeout' => 10,
                            'header' => 'User-Agent: Visual-Diff-Merge/1.0'
                        ]
                    ]);
                    $oldContent = file_get_contents($data['old']['url'], false, $context);
                    if ($oldContent === false) {
                        throw new Exception("Failed to fetch content from URL");
                    }
                } catch (Exception $urlError) {
                    if ($debug) {
                        DebugLogger::log("Error fetching URL: " . $urlError->getMessage());
                    }
                    $oldContent = "// Error fetching content from URL: {$data['old']['url']}\n// {$urlError->getMessage()}";
                }

                $diffData = $diffViewer->compareContent($oldContent, $newContent, $fileExtension);
            }
        } elseif ($data['new']['type'] === 'url' && empty($newContent) && !empty($data['new']['url'])) {
            // Handle a URL + content comparison (right side is URL)
            try {
                // Use compareUrls with a modified approach for mixed content
                $newUrl = $data['new']['url'];
                // Create a temporary data URL for the old content
                $tempOldUrl = 'data:text/plain;base64,' . base64_encode($oldContent);
                $diffData = $diffViewer->compareUrls($tempOldUrl, $newUrl, $fileExtension);
            } catch (Exception $e) {
                // If compareUrls fails, fall back to manual fetching
                if ($debug) {
                    DebugLogger::log("Error using compareUrls, falling back to manual fetch: " . $e->getMessage());
                }

                // Get content for the URL
                try {
                    $context = stream_context_create([
                        'http' => [
                            'timeout' => 10,
                            'header' => 'User-Agent: Visual-Diff-Merge/1.0'
                        ]
                    ]);
                    $newContent = file_get_contents($data['new']['url'], false, $context);
                    if ($newContent === false) {
                        throw new Exception("Failed to fetch content from URL");
                    }
                } catch (Exception $urlError) {
                    if ($debug) {
                        DebugLogger::log("Error fetching URL: " . $urlError->getMessage());
                    }
                    $newContent = "// Error fetching content from URL: {$data['new']['url']}\n// {$urlError->getMessage()}";
                }

                $diffData = $diffViewer->compareContent($oldContent, $newContent, $fileExtension);
            }
        } else {
            // Simple content comparison (standard case)
            $diffData = $diffViewer->compareContent($oldContent, $newContent, $fileExtension);
        }
    }

    // Get JavaScript configuration
    $jsConfig = Config::getJsConfig();

    // Debug: log language and translations
    if ($debug) {
        DebugLogger::log("Language setting:", ['configured_lang' => $jsConfig['lang']]);
        if (isset($jsConfig['translations'])) {
            DebugLogger::log("Translations structure:", ['structure' => array_keys($jsConfig['translations'])]);
        } else {
            DebugLogger::log("Warning: No translations found in jsConfig");
        }
    }

    // We'll maintain the proper translations structure
    // No need to extract single language and flatten the structure
    $userLang = $jsConfig['lang'];

    // Keep the existing nested translations structure as is
    if ($debug) {
        DebugLogger::log("Using properly structured translations with languages:", ['available_languages' => array_keys($jsConfig['translations'])]);
    }

    // Add runtime properties to the config
    $jsConfig['diffData'] = $diffData;
    $jsConfig['serverSaveEnabled'] = $serverSaveEnabled;
    $jsConfig['fileRefId'] = $fileRefId;
    $jsConfig['oldFileRefId'] = $oldFileRefId;
    $jsConfig['demoEnabled'] = $demoEnabled;

    // Pass only the file names rather than the full paths
    $jsConfig['newFileName'] = $newFileName;
    $jsConfig['oldFileName'] = $oldFileName;

    // If client sent translations, log it but don't use them
    if (isset($data['translations']) && $debug) {
        DebugLogger::log("Client sent translations that were ignored", ['client_translations' => $data['translations']]);
    }

    // If a filepath was provided, include it
    if (isset($data['filepath'])) {
        $jsConfig['filepath'] = $data['filepath'];
    }

    // Return the diff data as JSON
    $final_response = [
        'success' => true,
        'config' => $jsConfig,
        // Add critical properties directly at the root level of the response
        'diffData' => $diffData,
        'serverSaveEnabled' => $serverSaveEnabled,
        'fileRefId' => $fileRefId,
        'oldFileRefId' => $oldFileRefId,
        'demoEnabled' => $demoEnabled,
        'newFileName' => $newFileName,
        'oldFileName' => $oldFileName
    ];

    // If a filepath was provided, include it at the root level too
    if (isset($data['filepath'])) {
        $final_response['filepath'] = $data['filepath'];
    }

    // Debug: log the final response translations
    if ($debug) {
        DebugLogger::log("Final response translations:", ['translations' => $final_response['config']['translations']]);
    }

    echo json_encode($final_response);
} catch (Exception $e) {
    if ($debug) {
        DebugLogger::log("Error processing diff", ['error' => $e->getMessage()]);
    }

    echo json_encode([
        'error' => $e->getMessage(),
        'success' => false
    ]);
}
