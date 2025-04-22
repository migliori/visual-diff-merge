<?php

namespace VisualDiffMerge;

/**
 * Security utilities for Visual Diff Merge
 */
class Security
{
    /**
     * Check if a path is allowed based on configuration
     *
     * @param string $path The path to check
     * @return bool True if path is allowed, false otherwise
     */
    public static function isPathAllowed($path)
    {
        // Get allowed directories from configuration
        $config = Config::get();
        $allowedDirs = isset($config['php']['security']['allowedDirectories'])
            ? $config['php']['security']['allowedDirectories']
            : [];

        // If no allowed directories specified, default to application root
        if (empty($allowedDirs)) {
            $allowedDirs = [realpath(__DIR__ . '/..')];
        }

        // Normalize path
        $normalizedPath = realpath($path);
        if ($normalizedPath === false) {
            // Path doesn't exist yet - check parent directory
            $normalizedPath = realpath(dirname($path));
            if ($normalizedPath === false) {
                return false; // Neither file nor parent dir exists
            }
        }

        // Check if path is within any allowed directory
        foreach ($allowedDirs as $dir) {
            $normalizedDir = realpath($dir);
            if ($normalizedDir && strpos($normalizedPath, $normalizedDir) === 0) {
                return true;
            }
        }

        return false;
    }

    /**
     * Validate the current request for CSRF protection
     *
     * @return bool True if valid, exits with error if invalid
     */
    public static function validateRequest()
    {
        // If CSRF protection is enabled in config
        $config = Config::get();
        if (
            !empty($config['php']['security']['csrfProtection']) &&
            (!isset($_POST['csrfToken']) || $_POST['csrfToken'] !== $_SESSION['csrfToken'])
        ) {
            exit(json_encode(['success' => false, 'message' => 'Invalid security token']));
        }
        return true;
    }

    /**
     * Generate a CSRF token and store it in the session
     *
     * @return string The generated token
     */
    public static function generateCsrfToken()
    {
        if (!isset($_SESSION['csrfToken'])) {
            $_SESSION['csrfToken'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrfToken'];
    }
}
