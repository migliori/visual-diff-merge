<?php

namespace VisualDiffMerge;

/**
 * FileBrowser class for Visual-Diff-Merge
 *
 * This class manages file collection from various sources (directories or explicit file lists)
 * for use in the Visual-Diff-Merge diff viewer.
 */
class FileBrowser
{
    /**
     * @var array Language mappings from file extensions to friendly names
     */
    private $languages = [
        'js' => 'JavaScript',
        'php' => 'PHP',
        'html' => 'HTML',
        'css' => 'CSS',
        'json' => 'JSON',
        'md' => 'Markdown',
        'txt' => 'Text',
        'xml' => 'XML',
        'py' => 'Python',
        'java' => 'Java',
        'c' => 'C',
        'cpp' => 'C++',
        'cs' => 'C#',
        'rb' => 'Ruby',
        'go' => 'Go',
        'ts' => 'TypeScript',
        'sql' => 'SQL'
    ];

    /**
     * @var PathManager Path manager instance
     */
    private $pathManager;

    /**
     * Constructor initializes the path manager
     */
    public function __construct()
    {
        $this->pathManager = PathManager::getInstance();
    }

    /**
     * Get files with language information from various sources
     *
     * @param mixed $source Either a directory path or an array of file paths
     * @param string $baseUrl Base URL for browser paths (relative or absolute)
     * @return array Associative array of files with path, ref_id, language and name
     */
    public function getFiles($source, $baseUrl = '')
    {
        $files = [];

        if (is_array($source)) {
            // Handle array of files
            foreach ($source as $filePath) {
                if (file_exists($filePath)) {
                    $files = array_merge($files, $this->processFile($filePath, $baseUrl));
                }
            }
        } elseif (is_string($source) && is_dir($source)) {
            // Handle directory
            $files = $this->scanDirectory($source, $baseUrl);
        }

        return $files;
    }

    /**
     * Process a single file and return its metadata
     *
     * @param string $filePath Server path to the file
     * @param string $baseUrl Base URL for browser paths
     * @return array File metadata
     */
    private function processFile($filePath, $baseUrl)
    {
        $filename = basename($filePath);
        $ext = pathinfo($filename, PATHINFO_EXTENSION);
        $language = $this->getLanguageName($ext);

        // Calculate browser path (URL) from server path
        $browserPath = $this->getBrowserPath($filePath, $baseUrl);

        // Generate a secure reference ID for the server path
        $refId = $this->pathManager->registerPath($filePath);

        return [
            $filename => [
                'path' => $browserPath,
                'server_path' => $filePath, // Still include for backward compatibility
                'ref_id' => $refId, // Add the secure reference ID
                'language' => $language,
                'name' => $filename
            ]
        ];
    }

    /**
     * Convert a server path to a browser path
     *
     * @param string $serverPath Full server path to the file
     * @param string $baseUrl Base URL to prepend
     * @return string Browser-accessible path
     */
    private function getBrowserPath($serverPath, $baseUrl)
    {
        // Use provided baseUrl if it's not empty
        if (!empty($baseUrl)) {
            return rtrim($baseUrl, '/') . '/' . basename($serverPath);
        }

        // For simplicity, return just the filename for defaults
        return basename($serverPath);
    }

    /**
     * Scan a directory and get all files with their metadata
     *
     * @param string $directory Server path to the directory
     * @param string $baseUrl Base URL for browser paths
     * @return array Associative array of files with metadata
     */
    private function scanDirectory($directory, $baseUrl)
    {
        $files = [];
        if (is_dir($directory)) {
            $dirItems = scandir($directory);
            foreach ($dirItems as $item) {
                if ($item != '.' && $item != '..' && !is_dir($directory . DIRECTORY_SEPARATOR . $item)) {
                    $filePath = $directory . DIRECTORY_SEPARATOR . $item;
                    $files = array_merge($files, $this->processFile($filePath, $baseUrl));
                }
            }
        }
        return $files;
    }

    /**
     * Get a friendly language name from a file extension
     *
     * @param string $ext File extension
     * @return string Friendly language name
     */
    private function getLanguageName($ext)
    {
        return isset($this->languages[$ext]) ? $this->languages[$ext] : ucfirst($ext);
    }

    /**
     * Get file content safely without executing PHP code
     *
     * @param string $filePath Path to the file or reference ID
     * @return array File content and metadata
     */
    public function getFileContent($filePath)
    {
        // Check if this is a reference ID
        $serverPath = $this->pathManager->getPathFromRefId($filePath);
        if ($serverPath) {
            $filePath = $serverPath;
        }

        // Validate that the path is allowed
        if (!Security::isPathAllowed($filePath)) {
            return [
                'type' => 'error',
                'content' => Config::get('javascript.translations.en.accessDenied', 'Access denied'),
                'path' => null,
                'filename' => basename($filePath)
            ];
        }

        if (!file_exists($filePath)) {
            return [
                'type' => 'error',
                'content' => 'File not found: ' . $filePath,
                'path' => $filePath,
                'filename' => basename($filePath)
            ];
        }

        // Get file extension
        $ext = pathinfo($filePath, PATHINFO_EXTENSION);

        // For PHP files, we need to read them differently to avoid execution
        if (strtolower($ext) === 'php') {
            // Read file with show_source but capture the output
            ob_start();
            highlight_file($filePath, true);

            // If we want raw content instead of highlighted content, use file_get_contents with php://filter
            $content = file_get_contents('php://filter/read=convert.base64-encode/resource=' . $filePath);
            $content = base64_decode($content);
        } else {
            // For non-PHP files, use regular file_get_contents
            $content = file_get_contents($filePath);
        }

        // Generate a secure reference ID for the server path
        $refId = $this->pathManager->registerPath($filePath);

        return [
            'type' => 'file',
            'content' => $content,
            'path' => $filePath,
            'ref_id' => $refId,
            'filename' => basename($filePath)
        ];
    }

    /**
     * Compare two directories and return common files organized by subdirectory
     *
     * @param string $oldPath Path to the old directory
     * @param string $newPath Path to the new directory
     * @param string $oldBaseUrl Base URL for old files
     * @param string $newBaseUrl Base URL for new files
     * @return array Array of common files organized by subdirectory
     */
    public function compareDirectories($oldPath, $newPath, $oldBaseUrl, $newBaseUrl)
    {
        // Get all files recursively from both directories
        $oldFiles = $this->scanDirectoryRecursive($oldPath, $oldBaseUrl, $oldPath);
        $newFiles = $this->scanDirectoryRecursive($newPath, $newBaseUrl, $newPath);

        // Find common files (files that exist in both directories with same relative path)
        $commonFiles = [];

        foreach ($oldFiles as $relativePath => $oldFileData) {
            if (isset($newFiles[$relativePath])) {
                // Determine the subdirectory for grouping
                $subdirectory = $this->getSubdirectoryName($relativePath);

                if (!isset($commonFiles[$subdirectory])) {
                    $commonFiles[$subdirectory] = [];
                }

                // Create combined file data with both old and new references
                $commonFiles[$subdirectory][] = [
                    'path' => $relativePath,
                    'name' => basename($relativePath),
                    'language' => $oldFileData['language'],
                    'old_ref_id' => $oldFileData['ref_id'],
                    'new_ref_id' => $newFiles[$relativePath]['ref_id'],
                    'old_path' => $oldFileData['browser_path'],
                    'new_path' => $newFiles[$relativePath]['browser_path']
                ];
            }
        }

        // Sort files alphabetically within each subdirectory
        foreach ($commonFiles as $subdirectory => &$files) {
            usort($files, function ($a, $b) {
                return strcasecmp($a['name'], $b['name']);
            });
        }
        unset($files); // Break the reference

        // Sort subdirectories alphabetically, keeping root files ('') first
        uksort($commonFiles, function ($a, $b) {
            // Keep root files first
            if ($a === '') {
                return -1;
            }
            if ($b === '') {
                return 1;
            }
            return strcasecmp($a, $b);
        });

        return $commonFiles;
    }

    /**
     * Scan a directory recursively and return all files with their relative paths
     *
     * @param string $directory Directory to scan
     * @param string $baseUrl Base URL for browser paths
     * @param string $rootPath Root path for calculating relative paths
     * @return array Array of files indexed by relative path
     */
    private function scanDirectoryRecursive($directory, $baseUrl, $rootPath)
    {
        $files = [];

        if (!is_dir($directory)) {
            return $files;
        }

        $iterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($directory, \RecursiveDirectoryIterator::SKIP_DOTS)
        );

        foreach ($iterator as $file) {
            if ($file->isFile()) {
                $filePath = $file->getRealPath();
                $relativePath = $this->getRelativePath($rootPath, $filePath);

                $filename = basename($filePath);
                $ext = pathinfo($filename, PATHINFO_EXTENSION);
                $language = $this->getLanguageName($ext);

                // Calculate browser path with relative path preserved
                if (!empty($baseUrl)) {
                    $browserPath = rtrim($baseUrl, '/') . '/' . $relativePath;
                } else {
                    $browserPath = $relativePath;
                }

                // Generate a secure reference ID for the server path
                $refId = $this->pathManager->registerPath($filePath);

                $files[$relativePath] = [
                    'server_path' => $filePath,
                    'browser_path' => $browserPath,
                    'ref_id' => $refId,
                    'language' => $language,
                    'name' => $filename
                ];
            }
        }

        return $files;
    }

    /**
     * Get relative path from root to file
     *
     * @param string $rootPath Root directory path
     * @param string $filePath Full file path
     * @return string Relative path
     */
    private function getRelativePath($rootPath, $filePath)
    {
        $rootPath = rtrim(str_replace('\\', '/', realpath($rootPath)), '/');
        $filePath = str_replace('\\', '/', realpath($filePath));

        return ltrim(str_replace($rootPath, '', $filePath), '/');
    }

    /**
     * Get subdirectory name for grouping (empty string for root files)
     *
     * @param string $relativePath Relative path of the file
     * @return string Full subdirectory path or empty string for root files
     */
    private function getSubdirectoryName($relativePath)
    {
        $pathParts = explode('/', $relativePath);

        // If file is in root (only filename), return empty string
        if (count($pathParts) <= 1) {
            return '';
        }

        // Remove the filename (last element) and return the full directory path
        array_pop($pathParts);
        return implode('/', $pathParts);
    }
}
