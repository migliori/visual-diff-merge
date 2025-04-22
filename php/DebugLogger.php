<?php

namespace VisualDiffMerge;

/**
 * Simple Debug Logger for Diff Viewer
 * Logs diff data information to a file for analysis
 */
class DebugLogger
{
    private static $logFile = 'debug-php-diff.log';
    private static $enabled = true;

    /**
     * Initialize the logger - always clear previous content
     * @param bool $enabled Whether to enable logging
     * @param string $logFilePath Custom log file path (optional)
     */
    public static function init($enabled = true, $logFilePath = null)
    {
        self::$enabled = $enabled;
        if ($logFilePath !== null) {
            self::$logFile = $logFilePath;
        }

        // Always clear the log file on initialization
        if (self::$enabled) {
            file_put_contents(self::$logFile, "=== PHP Diff Viewer Debug Log - " . date('Y-m-d H:i:s') . " ===\n\n");
        }
    }

    /**
     * Log a message with optional data
     * @param string $message The message to log
     * @param mixed $data Optional data to log (will be JSON encoded)
     */
    public static function log($message, $data = null)
    {
        if (!self::$enabled) {
            return;
        }

        $logEntry = "[" . date('H:i:s') . "] $message";

        if ($data !== null) {
            // Format data based on type
            if (is_array($data) || is_object($data)) {
                // Use JSON_PARTIAL_OUTPUT_ON_ERROR to avoid failures with circular references
                $jsonOptions = JSON_PRETTY_PRINT | JSON_PARTIAL_OUTPUT_ON_ERROR;
                try {
                    $jsonData = json_encode($data, $jsonOptions);
                    if ($jsonData === false) {
                        $jsonData = "Error encoding data: " . json_last_error_msg();
                    }
                    $logEntry .= "\n" . $jsonData;
                } catch (\Exception $e) {
                    $logEntry .= "\nError encoding data: " . $e->getMessage();
                }
            } else {
                $logEntry .= " - " . print_r($data, true);
            }
        }

        $logEntry .= "\n" . str_repeat("-", 80) . "\n";
        file_put_contents(self::$logFile, $logEntry, FILE_APPEND);
    }

    /**
     * Log details of a diff chunk - consistent method name
     * @param array $chunk The chunk to log
     * @param int $index The chunk index
     */
    public static function logChunk($chunk, $index)
    {
        if (!self::$enabled) {
            return;
        }

        $chunkSummary = [
            'index' => $index,
            'type' => $chunk['type'] ?? 'unknown',
            'oldStart' => $chunk['oldStart'] ?? null,
            'newStart' => $chunk['newStart'] ?? null,
            'oldLines' => $chunk['oldLines'] ?? 0,
            'newLines' => $chunk['newLines'] ?? 0,
            'conflict' => $chunk['type'] === 'replace'
        ];

        // Add lines data if available
        if (isset($chunk['lines']) && is_array($chunk['lines'])) {
            $chunkSummary['lines_count'] = count($chunk['lines']);
            $chunkSummary['line_samples'] = array_slice($chunk['lines'], 0, 5);
        }

        // Add old and new content if available
        if (isset($chunk['oldContent']) && is_array($chunk['oldContent'])) {
            $chunkSummary['oldContent_count'] = count($chunk['oldContent']);
            $chunkSummary['oldContent_samples'] = array_slice($chunk['oldContent'], 0, 5);
        }

        if (isset($chunk['newContent']) && is_array($chunk['newContent'])) {
            $chunkSummary['newContent_count'] = count($chunk['newContent']);
            $chunkSummary['newContent_samples'] = array_slice($chunk['newContent'], 0, 5);
        }

        self::log("Diff chunk #$index:", $chunkSummary);
    }

    /**
     * For compatibility with existing code - alias to logChunk
     */
    public static function logDiffChunk($chunk, $index)
    {
        return self::logChunk($chunk, $index);
    }

    /**
     * Log a separator line for better readability
     */
    public static function separator()
    {
        if (!self::$enabled) {
            return;
        }
        file_put_contents(self::$logFile, "\n" . str_repeat("=", 80) . "\n\n", FILE_APPEND);
    }
}
