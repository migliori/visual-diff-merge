<?php // phpcs:disable PSR1.Files.SideEffects

/**
 * Visual Diff Merge - AJAX Diff Merge Handler
 *
 * This script handles file merging operations for the Visual Diff Merge tool.
 * It processes merged content and saves it to the filesystem.
 */

// Include Composer's autoloader
require_once __DIR__ . '/../vendor/autoload.php';

use VisualDiffMerge\CodeBeautifier;
use VisualDiffMerge\Config;
use VisualDiffMerge\PathManager;
use VisualDiffMerge\Security;

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check for demo mode
$demoEnabled = false;
if (file_exists(__DIR__ . '/../demo-enabler.php')) {
    // Include the file and get the DEMO_ENABLED constant
    include_once __DIR__ . '/../demo-enabler.php';
    if (defined('DEMO_ENABLED')) {
        $demoEnabled = DEMO_ENABLED;
    }
}

// Initialize configuration
Config::init();

// Get current language from config
$currentLang = Config::get('javascript.lang', 'en');

// Set response content type
header('Content-Type: application/json');

// Check if this is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit(json_encode([
        'success' => false,
        'message' => Config::get('javascript.translations.' . $currentLang . '.invalidRequestMethod', 'Invalid request method')
    ]));
}

// If demo mode is enabled, return success with simulation message
if ($demoEnabled) {
    exit(json_encode([
        'success' => true,
        'message' => 'Demo mode active: Changes have been simulated but not actually saved to the server.',
        'simulated' => true
    ]));
}

// Check if required data is present - must have fileRefId (no longer supporting direct filepath)
if (
    !isset($_POST['action']) || $_POST['action'] !== 'registerMergedContent' ||
    !isset($_POST['content']) ||
    (!isset($_POST['fileRefId']) && !isset($_POST['oldFileRefId'])) // Only accept fileRefId & oldFileRefId for security
) {
    exit(json_encode(['success' => false, 'message' => 'Missing required parameters']));
}

// Initialize PathManager
$pathManager = PathManager::getInstance();

// Get content
$content = $_POST['content'];

// Determine file path - ONLY use fileRefId for security
$targetPath = '';
if (isset($_POST['fileRefId']) && $_POST['fileRefId']) {
    $targetPath = $pathManager->getPathFromRefId($_POST['fileRefId']);
    if (!$targetPath) {
        exit(json_encode([
            'success' => false,
            'message' => 'Invalid file reference ID'
        ]));
    }
} elseif (isset($_POST['oldFileRefId']) && $_POST['oldFileRefId']) {
    // Also accept oldFileRefId as an alternative
    $targetPath = $pathManager->getPathFromRefId($_POST['oldFileRefId']);
    if (!$targetPath) {
        exit(json_encode([
            'success' => false,
            'message' => 'Invalid old file reference ID'
        ]));
    }
} else {
    // No longer supporting direct filepath for security
    exit(json_encode([
        'success' => false,
        'message' => 'Missing required file reference ID'
    ]));
}

// Security check: Make sure the path is within allowed directories
if (!Security::isPathAllowed($targetPath)) {
    exit(json_encode([
        'success' => false,
        'message' => Config::get('javascript.translations.' . $currentLang . '.accessDenied', 'Access denied: Path is outside allowed directories')
    ]));
}

// Fix the wasBeautified check to handle various data types
$wasBeautified = filter_var($_POST['wasBeautified'] ?? false, FILTER_VALIDATE_BOOLEAN);
$mergeType = $_POST['mergeType'] ?? 'new'; // Default to 'new' for backward compatibility
$targetType = $_POST['targetType'] ?? 'new'; // Default to 'new' for backward compatibility

// Determine which directory to save the file (old or new location)
$basePath = Config::getBasePath();

// Beautify or minify the content if needed
if ($wasBeautified) {
    // Extract file extension for proper formatting
    $fileExtension = pathinfo($targetPath, PATHINFO_EXTENSION);
    if ($fileExtension) {
        try {
            // For minification, pass the file extension
            $content = CodeBeautifier::minify($content, $fileExtension);
        } catch (Exception $e) {
            error_log("Minification error: " . $e->getMessage());
        }
    }
}

// Remove Git-style markers if any
$content = preg_replace('/^\\\\ No newline at end of file$/m', '', $content);

// Get old target path using oldFileRefId
$oldTargetPath = '';
if (isset($_POST['oldFileRefId']) && $_POST['oldFileRefId']) {
    $oldTargetPath = $pathManager->getPathFromRefId($_POST['oldFileRefId']);
    if (!$oldTargetPath && in_array($mergeType, ['overwrite-both', 'new-both', 'old', 'old-suffix'])) {
        exit(json_encode([
            'success' => false,
            'message' => 'Invalid old file reference ID'
        ]));
    }

    // Security check for old file path
    if (!Security::isPathAllowed($oldTargetPath)) {
        exit(json_encode([
            'success' => false,
            'message' => Config::get('javascript.translations.' . $currentLang . '.accessDenied', 'Access denied: Old file path is outside allowed directories')
        ]));
    }
} elseif (in_array($mergeType, ['overwrite-both', 'new-both', 'old', 'old-suffix'])) {
    // If we need the old path but don't have it, exit with error
    exit(json_encode([
        'success' => false,
        'message' => 'Missing old file reference ID for this merge type'
    ]));
}

// Process based on merge type
$results = [];

// Handle different merge types
switch ($mergeType) {
    case 'new': // Save to current file (overwrite)
        $results[] = saveToPath($targetPath, $content, false);
        break;

    case 'new-suffix': // Save with suffix (new)
        $results[] = saveToPath($targetPath, $content, true);
        break;

    case 'old': // Save to old file (overwrite)
        if (empty($oldTargetPath)) {
            exit(json_encode([
                'success' => false,
                'message' => 'Missing old file path for saving'
            ]));
        }
        $results[] = saveToPath($oldTargetPath, $content, false);
        break;

    case 'old-suffix': // Save to old with suffix
        if (empty($oldTargetPath)) {
            exit(json_encode([
                'success' => false,
                'message' => 'Missing old file path for saving'
            ]));
        }
        $results[] = saveToPath($oldTargetPath, $content, true);
        break;

    case 'both': // Overwrite both files
        $results[] = saveToPath($targetPath, $content, false);
        if (!empty($oldTargetPath)) {
            $results[] = saveToPath($oldTargetPath, $content, false);
        }
        break;

    case 'both-suffix': // Save to both with suffix
        $results[] = saveToPath($targetPath, $content, true);
        if (!empty($oldTargetPath)) {
            $results[] = saveToPath($oldTargetPath, $content, true);
        }
        break;

    default:
        // Default to saving with suffix to new file
        $results[] = saveToPath($targetPath, $content, true);
}

// Check if any operation failed
$anyFailure = false;
$failureMessage = '';
foreach ($results as $result) {
    if (!$result['success']) {
        $anyFailure = true;
        $failureMessage = $result['message'];
        break;
    }
}

if ($anyFailure) {
    exit(json_encode([
        'success' => false,
        'message' => $failureMessage,
        'results' => $results
    ]));
}

// If all succeeded, return success with combined message
if (count($results) === 1) {
    $response = [
        'success' => true,
        'message' => $results[0]['message'],
        'newFilePath' => $results[0]['newFilePath'] ?? '',
        'results' => $results
    ];

    exit(json_encode($response));
} else {
    $response = [
        'success' => true,
        'message' => 'All files have been saved successfully',
        'results' => $results
    ];

    exit(json_encode($response));
}

/**
 * Save content to a file path
 *
 * @param string $filePath The path to save to
 * @param string $content The content to save
 * @param bool $useSuffix Whether to add a -merged suffix to the filename
 * @return array Result array with success status and message
 */
function saveToPath($filePath, $content, $useSuffix = false)
{
    global $basePath, $currentLang;

    // Create directory if it doesn't exist
    $directory = dirname($filePath);
    if (!is_dir($directory)) {
        mkdir($directory, 0755, true);
    }

    if ($useSuffix) {
        // Create a new file with -merged suffix
        $pathInfo = pathinfo($filePath);
        $dirname = $pathInfo['dirname'];
        $filename = $pathInfo['filename'];
        $extension = isset($pathInfo['extension']) ? '.' . $pathInfo['extension'] : '';

        // Create the merged filepath with the suffix before the extension
        $savePath = $dirname . DIRECTORY_SEPARATOR . $filename . '-merged' . $extension;

        // Save merged content
        $result = file_put_contents($savePath, $content);

        // Get the relative path for the response
        $relativeNewPath = str_replace(
            str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $basePath) . DIRECTORY_SEPARATOR,
            '',
            $savePath
        );

        if ($result !== false) {
            return [
                'success' => true,
                'message' => str_replace(
                    '%FILE%',
                    basename($savePath),
                    Config::get('javascript.translations.' . $currentLang . '.mergeAsNewDone', '%FILE% has been created successfully')
                ),
                'newFilePath' => $relativeNewPath
            ];
        } else {
            return [
                'success' => false,
                'message' => 'Failed to write to file: ' . basename($savePath)
            ];
        }
    } else {
        // Overwrite the existing file
        $result = file_put_contents($filePath, $content);

        if ($result !== false) {
            return [
                'success' => true,
                'message' => str_replace(
                    '%FILE%',
                    basename($filePath),
                    Config::get('javascript.translations.' . $currentLang . '.mergeOverwriteDone', 'File %FILE% has been overwritten successfully')
                )
            ];
        } else {
            return [
                'success' => false,
                'message' => 'Failed to write to file: ' . basename($filePath)
            ];
        }
    }
}
