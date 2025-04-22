<?php

namespace VisualDiffMerge;

/**
 * PathManager for handling secure file path references
 *
 * This class provides a way to reference server paths securely without
 * exposing actual filesystem paths to the client-side JavaScript.
 */
class PathManager
{
    /**
     * Map of reference IDs to actual file paths
     * @var array
     */
    private $pathMap = [];

    /**
     * Constructor initializes the path map from session if available
     */
    public function __construct()
    {
        // Start session if not already started
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Initialize from session if available
        if (isset($_SESSION['vdmPathMap'])) {
            $this->pathMap = $_SESSION['vdmPathMap'];
        }
    }

    /**
     * Register a server path and get a secure reference ID
     *
     * @param string $serverPath Absolute server path
     * @return string Reference ID for the path
     */
    public function registerPath($serverPath)
    {
        $refId = $this->generateRefId($serverPath);
        $this->pathMap[$refId] = $serverPath;
        $_SESSION['vdmPathMap'] = $this->pathMap;
        return $refId;
    }

    /**
     * Register both new and old file paths and get reference IDs
     *
     * @param string $newServerPath New file absolute server path
     * @param string $oldServerPath Old file absolute server path
     * @return array Associative array with newRefId and oldRefId
     */
    public function registerFilePair($newServerPath, $oldServerPath)
    {
        $newRefId = $this->registerPath($newServerPath);
        $oldRefId = $this->registerPath($oldServerPath);

        return [
            'newRefId' => $newRefId,
            'oldRefId' => $oldRefId
        ];
    }

    /**
     * Get the actual server path from a reference ID
     *
     * @param string $refId Reference ID
     * @return string|null Server path or null if not found
     */
    public function getPathFromRefId($refId)
    {
        return isset($this->pathMap[$refId]) ? $this->pathMap[$refId] : null;
    }

    /**
     * Extract just the filename from a path for safe client use
     *
     * @param string $path Server path
     * @return string Filename without directory path
     */
    public function getFilenameFromPath($path)
    {
        return basename($path);
    }

    /**
     * Extract just the filename from a reference ID
     *
     * @param string $refId Reference ID for the path
     * @return string|null Filename or null if reference ID not found
     */
    public function getFilenameFromRefId($refId)
    {
        $path = $this->getPathFromRefId($refId);
        if ($path === null) {
            return null;
        }
        return $this->getFilenameFromPath($path);
    }

    /**
     * Generate a unique reference ID for a path
     *
     * @param string $path Server path
     * @return string Secure reference ID
     */
    private function generateRefId($path)
    {
        // Get security salt from config or use a default
        $salt = Config::get('php.security.salt', 'vdmPathSecurity');

        // Generate a unique hash for this path
        return hash('sha256', $path . $salt . session_id());
    }

    /**
     * Clear the path map
     *
     * @return void
     */
    public function clearPathMap()
    {
        $this->pathMap = [];
        $_SESSION['vdmPathMap'] = [];
    }

    /**
     * Get singleton instance
     *
     * @return PathManager
     */
    public static function getInstance()
    {
        static $instance = null;
        if ($instance === null) {
            $instance = new self();
        }
        return $instance;
    }
}
