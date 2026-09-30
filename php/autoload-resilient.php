<?php

/**
 * Resilient autoloader bootstrap for API endpoints.
 *
 * - Standalone deployment (package served from its own directory):
 *   loads the package-internal vendor/autoload.php.
 * - Composer deployment (package lives inside the host vendor/ directory):
 *   the composer autoloader of the host application is already registered,
 *   so nothing has to be loaded — the VisualDiffMerge classes are resolvable.
 *   As a fallback for CLI/edge cases, we walk up the parent directories
 *   looking for a vendor/autoload.php that provides the package.
 */

if (!class_exists('VisualDiffMerge\\Config')) {
    // Package-internal vendor (standalone deployment)
    $internalAutoloader = __DIR__ . '/../vendor/autoload.php';
    if (file_exists($internalAutoloader)) {
        require_once $internalAutoloader;
    } else {
        // Walk up the directory tree looking for a host composer autoloader
        $dir = dirname(__DIR__);
        for ($i = 0; $i < 5; $i++) {
            $candidate = $dir . '/vendor/autoload.php';
            if (file_exists($candidate)) {
                require_once $candidate;
                // Stop as soon as the classes are resolvable
                if (class_exists('VisualDiffMerge\\Config')) {
                    break;
                }
            }
            $parent = dirname($dir);
            if ($parent === $dir) {
                break; // Filesystem root reached
            }
            $dir = $parent;
        }
    }
}

// Final safety net: without a usable autoloader the endpoints cannot work.
if (!class_exists('VisualDiffMerge\\Config')) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'error' => 'VisualDiffMerge autoloader not found. '
            . 'Install dependencies with composer (package or host application).'
    ]);
    exit;
}
