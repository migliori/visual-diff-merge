<?php

namespace VisualDiffMerge;

use SebastianBergmann\Diff\Differ;
use SebastianBergmann\Diff\Output\StrictUnifiedDiffOutputBuilder;

/**
 * DiffViewer - Main class for file comparison and merging
 */
class DiffViewer
{
    /**
     * @var array Configuration options
     */
    private $config;

    /**
     * @var array Original file content
     */
    private $originalContent = [];

    /**
     * @var array Processed content for display
     */
    private $displayContent = [];

    /**
     * @var array Diff data generated from comparison
     */
    private $diffData;

    /**
     * Constructor
     *
     * @param array $config Configuration options
     */
    public function __construct(array $config = [])
    {
        $this->config = array_merge([
            'debug' => false,
            'language' => 'php', // Default language
            'diffContextLines' => 3,
            'ignoreWhitespace' => false,
            'ignoreCase' => false,
            'serverSaveEnabled' => false,
            'serverPath' => ''
        ], $config);
    }

    /**
     * Update configuration values after initialization
     *
     * @param array $config New configuration values to merge
     * @return void
     */
    public function updateConfig(array $config): void
    {
        $this->config = array_merge($this->config, $config);
    }

    /**
     * Compare two files and prepare diff data
     *
     * @param string $oldFilePath Path to the old file
     * @param string $newFilePath Path to the new file
     * @return array Diff data ready for rendering
     * @throws \Exception If files can't be read
     */
    public function compareFiles(string $oldFilePath, string $newFilePath): array
    {
        // Read files
        $oldContent = file_get_contents($oldFilePath);
        $newContent = file_get_contents($newFilePath);

        if ($oldContent === false) {
            throw new \Exception("Unable to read old file: $oldFilePath");
        }

        if ($newContent === false) {
            throw new \Exception("Unable to read new file: $newFilePath");
        }

        // Get file extension from new file path
        $fileExtension = pathinfo($newFilePath, PATHINFO_EXTENSION);

        // Detect language
        $language = LanguageDetector::detect($newContent, $fileExtension);

        // Update config with detected language
        $this->config['language'] = $language;

        return $this->compareContent($oldContent, $newContent, $fileExtension);
    }

    /**
     * Compare two content strings
     *
     * @param string $oldContent Old file content
     * @param string $newContent New file content
     * @param string|null $fileExtension File extension for language detection
     * @return array Diff data ready for rendering
     */
    public function compareContent(string $oldContent, string $newContent, ?string $fileExtension = null): array
    {
        // Store original content
        $this->originalContent = [
            'old' => $oldContent,
            'new' => $newContent
        ];
        $this->displayContent = $this->originalContent;

        // Detect language if not in config
        if (empty($this->config['language']) || $this->config['language'] === 'php') {
            $language = LanguageDetector::detect($newContent, $fileExtension);
            $this->config['language'] = $language;
        }

        // Check if content is minified
        $wasBeautified = false;
        try {
            $oldIsMinified = CodeBeautifier::isLikelyMinified($oldContent, $fileExtension);
            $newIsMinified = CodeBeautifier::isLikelyMinified($newContent, $fileExtension);

            // If either file is minified, beautify both for better comparison
            if ($oldIsMinified || $newIsMinified) {
                $wasBeautified = true;
                $oldContent = CodeBeautifier::beautify($oldContent, $fileExtension);
                $newContent = CodeBeautifier::beautify($newContent, $fileExtension);

                $this->displayContent = [
                    'old' => $oldContent,
                    'new' => $newContent
                ];
            }
        } catch (\InvalidArgumentException $e) {
            // Log the warning but continue with original content
            $warningMessage = "<div style=\"background-color: #fff3cd; color: #856404; padding: 12px 15px; margin: 15px 0; border-left: 5px solid #ffeeba; border-radius: 4px; font-family: sans-serif;\"><strong style=\"margin-right: 5px;\">⚠️ Warning:</strong> Beautification unavailable: " . $e->getMessage() . "</div>";
            echo $warningMessage;
            // Proceed with original content
        }

        // Create diff - don't limit context lines to ensure full file comparison
        $builder = new StrictUnifiedDiffOutputBuilder([
            'contextLines' => PHP_INT_MAX, // Show all context lines
            'fromFile' => 'Old',
            'toFile' => 'New'
        ]);

        $differ = new Differ($builder);
        $diff = $differ->diff($oldContent, $newContent);

        // Process the diff into a structured format
        $this->diffData = $this->processDiff($diff);
        $this->diffData['wasBeautified'] = $wasBeautified;
        $this->diffData['serverSaveEnabled'] = $this->config['serverSaveEnabled'];
        $this->diffData['serverPath'] = $this->config['serverPath'];

        // Add detected language to the result
        $this->diffData['language'] = $this->config['language'];

        return $this->diffData;
    }

    /**
     * Compare content from two URLs
     *
     * @param string $oldUrl URL to old content
     * @param string $newUrl URL to new content
     * @param string|null $fileExtension Optional file extension for language detection
     * @return array Diff data ready for rendering
     * @throws \Exception If URLs can't be accessed
     */
    public function compareUrls(string $oldUrl, string $newUrl, ?string $fileExtension = null): array
    {
        // Extract file extension from URLs if not provided
        if (!$fileExtension) {
            $oldUrlPath = parse_url($oldUrl, PHP_URL_PATH);
            $newUrlPath = parse_url($newUrl, PHP_URL_PATH);

            $oldExtension = pathinfo($oldUrlPath, PATHINFO_EXTENSION);
            $newExtension = pathinfo($newUrlPath, PATHINFO_EXTENSION);

            // Use the new file's extension, or old if new doesn't have one
            $fileExtension = $newExtension ?: $oldExtension;
        }

        // Fetch content from URLs with proper error handling
        $oldContent = $this->fetchUrlContent($oldUrl);
        $newContent = $this->fetchUrlContent($newUrl);

        // Pass to compareContent with detected language
        return $this->compareContent($oldContent, $newContent, $fileExtension);
    }

    /**
     * Fetch content from URL with error handling
     *
     * @param string $url URL to fetch
     * @return string Content from URL
     * @throws \Exception If URL can't be accessed
     */
    private function fetchUrlContent(string $url): string
    {
        // Configure context with proper User-Agent
        $context = stream_context_create([
            'http' => [
                'header' => 'User-Agent: Visual-Diff-Merge/1.0'
            ]
        ]);

        // Fetch content with error handling
        try {
            $content = file_get_contents($url, false, $context);
        } catch (\Exception $e) {
            throw new \Exception("Failed to fetch content from URL: $url - " . $e->getMessage());
        }

        if ($content === false) {
            $error = error_get_last();
            throw new \Exception("Failed to fetch content from URL: $url - " . ($error['message'] ?? 'Unknown error'));
        }

        return $content;
    }

    /**
     * Process unified diff output into structured data using the original algorithm
     *
     * @param string $diff Unified diff output
     * @return array Structured diff data
     */
    private function processDiff(string $diff): array
    {
        // Strip git-style markers from the diff content before processing
        $diff = preg_replace('/^\\\\ No newline at end of file$/m', '', $diff);

        $lines = explode("\n", $diff);
        $result = [
            'old' => [],
            'new' => [],
            'chunks' => []
        ];

        // Skip the first two lines (headers)
        array_shift($lines); // --- Old
        array_shift($lines); // +++ New

        // Track original line numbers
        $oldLineNum = 0;
        $newLineNum = 0;
        $chunkIndex = 0;
        $currentChunkId = null;
        $inChunk = false;
        $chunk = null;
        $skipNextIteration = false;  // Add this flag variable

        // Process each line of the diff
        for ($i = 0; $i < count($lines); $i++) {
            // Skip the next iteration if needed
            if ($skipNextIteration) {
                $skipNextIteration = false;
                continue;
            }

            $line = $lines[$i];
            $nextLine = isset($lines[$i + 1]) ? $lines[$i + 1] : null;

            // Skip empty lines
            if (empty(trim($line))) {
                continue;
            }

            $firstChar = substr($line, 0, 1);

            // Chunk header (e.g. @@ -1,7 +1,7 @@)
            if (substr($line, 0, 2) === '@@') {
                // Extract line numbers
                if (preg_match('/@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/', $line, $matches)) {
                    $oldLineNum = (int)$matches[1];
                    $newLineNum = (int)$matches[2];
                }

                // Close previous chunk if needed
                if ($inChunk) {
                    $inChunk = false;
                }
                continue;
            }

            // Check if we have an identical empty line marked as change
            if ($firstChar === '-' && isset($lines[$i + 1])) {
                $leftLine = substr($line, 1);
                $nextChar = substr($lines[$i + 1], 0, 1);
                $rightLine = substr($lines[$i + 1], 1);

                // If both lines are empty and one is marked as deleted and the next as added
                if (
                    $nextChar === '+' &&
                    (trim($leftLine) === '' && trim($rightLine) === '')
                ) {
                    // Add as regular content to both sides
                    $result['old'][] = [
                        'type' => 'content',
                        'line' => $leftLine, // Preserve original whitespace
                        'index' => $oldLineNum
                    ];
                    $oldLineNum++;

                    $result['new'][] = [
                        'type' => 'content',
                        'line' => $rightLine, // Preserve original whitespace
                        'index' => $newLineNum
                    ];
                    $newLineNum++;

                    // Skip the next line as we've already processed it
                    $skipNextIteration = true;
                    continue;
                }
            }

            // Handle different line types
            switch ($firstChar) {
                case ' ': // Context line (unchanged)
                    // Add to both sides
                    $result['old'][] = [
                        'type' => 'content',
                        'line' => substr($line, 1),
                        'index' => $oldLineNum
                    ];
                    $oldLineNum++;

                    $result['new'][] = [
                        'type' => 'content',
                        'line' => substr($line, 1),
                        'index' => $newLineNum
                    ];
                    $newLineNum++;
                    break;

                case '-': // Deletion (only in old file)
                    // Start a new chunk if needed
                    if (!$inChunk) {
                        $chunkIndex++;
                        $currentChunkId = $chunkIndex;
                        $inChunk = true;
                        $chunkType = 'delete';
                        $chunk = [
                            'id' => $currentChunkId,
                            'type' => $chunkType,
                            'oldStart' => count($result['old']),
                            'newStart' => count($result['new']),
                            'oldLines' => 0,
                            'newLines' => 0
                        ];
                    }

                    // Add to old side
                    $result['old'][] = [
                        'type' => 'content',
                        'line' => substr($line, 1),
                        'chunkId' => $currentChunkId,
                        'index' => $oldLineNum,
                        'diffType' => 'delete'
                    ];
                    $oldLineNum++;

                    // Track chunk info
                    $chunk['oldLines']++;

                    break;

                case '+': // Addition (only in new file)
                    // Start a new chunk if needed
                    if (!$inChunk) {
                        $chunkIndex++;
                        $currentChunkId = $chunkIndex;
                        $inChunk = true;
                        $chunkType = 'add';
                        $chunk = [
                            'id' => $currentChunkId,
                            'type' => $chunkType,
                            'oldStart' => count($result['old']),
                            'newStart' => count($result['new']),
                            'oldLines' => 0,
                            'newLines' => 0
                        ];
                    } elseif ($chunk['type'] === 'delete') {
                        // If we see a '+' after a '-', this is a replace operation
                        $chunk['type'] = 'replace';
                    }

                    // Add to new side with explicit chunk ID
                    $result['new'][] = [
                        'type' => 'content',
                        'line' => substr($line, 1),
                        'chunkId' => $currentChunkId,
                        'index' => $newLineNum,
                        'diffType' => 'add'
                    ];
                    $newLineNum++;

                    // Track chunk info
                    $chunk['newLines']++;

                    break;

                default:
                    // Treat as regular content in both sides
                    $result['old'][] = [
                        'type' => 'content',
                        'line' => $line,
                        'index' => $oldLineNum
                    ];
                    $oldLineNum++;

                    $result['new'][] = [
                        'type' => 'content',
                        'line' => $line,
                        'index' => $newLineNum
                    ];
                    $newLineNum++;
                    break;
            }

            // Check if we need to close a chunk
            if ($inChunk && ($firstChar === ' ' || ($nextLine && substr($nextLine, 0, 1) === ' '))) {
                // Add placeholders as needed to align the two sides
                if ($chunk['oldLines'] === 0 && $chunk['newLines'] > 0) {
                    // Only additions - add placeholders on old side
                    for ($j = 0; $j < $chunk['newLines']; $j++) {
                        $result['old'][] = [
                            'type' => 'placeholder',
                            'line' => '',
                            'chunkId' => $currentChunkId,
                            'placeholderType' => 'addition',
                        ];
                    }
                } elseif ($chunk['newLines'] === 0 && $chunk['oldLines'] > 0) {
                    // Only deletions - add placeholders on new side
                    for ($j = 0; $j < $chunk['oldLines']; $j++) {
                        $result['new'][] = [
                            'type' => 'placeholder',
                            'line' => '',
                            'chunkId' => $currentChunkId,
                            'placeholderType' => 'deletion',
                        ];
                    }
                }

                // Add the chunk to the list and reset
                $result['chunks'][] = $chunk;
                $inChunk = false;
            }
        }

        // Check if we need to close the final chunk
        if ($inChunk) {
            // Apply the same placeholder logic for the final chunk
            if ($chunk['oldLines'] === 0 && $chunk['newLines'] > 0) {
                for ($j = 0; $j < $chunk['newLines']; $j++) {
                    $result['old'][] = [
                        'type' => 'placeholder',
                        'line' => '',
                        'chunkId' => $currentChunkId,
                        'placeholderType' => 'addition',
                    ];
                }
            } elseif ($chunk['newLines'] === 0 && $chunk['oldLines'] > 0) {
                for ($j = 0; $j < $chunk['oldLines']; $j++) {
                    $result['new'][] = [
                        'type' => 'placeholder',
                        'line' => '',
                        'chunkId' => $currentChunkId,
                        'placeholderType' => 'deletion',
                    ];
                }
            }

            $result['chunks'][] = $chunk;
        }

        // Now ensure chunk sizes are properly balanced
        $this->normalizeChunkSizes($result);

        return $result;
    }

    /**
     * Ensure all chunks have balanced sizes between old and new sides
     *
     * @param array &$diffData Reference to diffData containing old, new, and chunks
     */
    private function normalizeChunkSizes(array &$diffData): void
    {
        $chunkMap = [];
        foreach ($diffData['chunks'] as $idx => $chunk) {
            $chunkMap[$chunk['id']] = $idx;
        }

        foreach ($diffData['chunks'] as &$chunk) {
            // Get all lines in this chunk
            $oldChunkLines = array_filter($diffData['old'], function ($l) use ($chunk) {
                return isset($l['chunkId']) && $l['chunkId'] === $chunk['id'];
            });

            $newChunkLines = array_filter($diffData['new'], function ($l) use ($chunk) {
                return isset($l['chunkId']) && $l['chunkId'] === $chunk['id'];
            });

            $oldCount = count($oldChunkLines);
            $newCount = count($newChunkLines);

            // If sizes don't match, add placeholders to the smaller side
            if ($oldCount < $newCount) {
                // Add placeholders to old side
                $placeholdersNeeded = $newCount - $oldCount;

                // Find insertion point (beginning of the chunk)
                $insertPosition = $chunk['oldStart'];

                // Insert the placeholders
                for ($i = 0; $i < $placeholdersNeeded; $i++) {
                    array_splice($diffData['old'], $insertPosition, 0, [[
                        'type' => 'placeholder',
                        'line' => '',
                        'chunkId' => $chunk['id'],
                        'placeholderType' => 'alignment'
                    ]]);

                    // Update insertion point for subsequent placeholders
                    $insertPosition++;
                }

                // Update chunk size
                $chunk['oldLines'] += $placeholdersNeeded;
                // Update start positions for subsequent chunks
                foreach ($diffData['chunks'] as &$otherChunk) {
                    if ($otherChunk['id'] > $chunk['id'] && isset($chunkMap[$otherChunk['id']])) {
                        $otherChunk['oldStart'] += $placeholdersNeeded;
                    }
                }
                unset($otherChunk);
            } elseif ($newCount < $oldCount) {
                // Add placeholders to new side
                $placeholdersNeeded = $oldCount - $newCount;

                // Find insertion point (beginning of the chunk)
                $insertPosition = $chunk['newStart'];

                // Insert the placeholders
                for ($i = 0; $i < $placeholdersNeeded; $i++) {
                    array_splice($diffData['new'], $insertPosition, 0, [[
                        'type' => 'placeholder',
                        'line' => '',
                        'chunkId' => $chunk['id'],
                        'placeholderType' => 'alignment'
                    ]]);

                    // Update insertion point for subsequent placeholders
                    $insertPosition++;
                }

                // Update chunk size
                // Update chunk size
                $chunk['newLines'] += $placeholdersNeeded;
                // Update start positions for subsequent chunks
                foreach ($diffData['chunks'] as &$otherChunk) {
                    if ($otherChunk['id'] > $chunk['id'] && isset($chunkMap[$otherChunk['id']])) {
                        $otherChunk['newStart'] += $placeholdersNeeded;
                    }
                }
                unset($otherChunk);
            }
        }
    }
    /**
     * Generate merged content based on chunk selections
     *
     * @param array $selections User's chunk selections (chunkId => side)
     * @return string Merged content
     */
    public function generateMergedContent(array $selections): string
    {
        if (empty($this->diffData)) {
            throw new \Exception("No diff data available. Run compareFiles() first.");
        }

        $mergedLines = [];

        // Process chunks in order
        foreach ($this->diffData['chunks'] as $chunk) {
            $chunkId = $chunk['id'];
            $selectedSide = $selections[$chunkId] ?? null;

            if ($chunk['type'] === 'context' || $selectedSide === null) {
                // For unchanged chunks or chunks without selection, use new content
                $chunkLines = array_filter($this->diffData['new'], function ($line) use ($chunkId) {
                    return $line['chunkId'] === $chunkId && $line['type'] === 'content';
                });

                foreach ($chunkLines as $line) {
                    $mergedLines[] = $line['line'];
                }
            } else { // Use selected side for changed chunks
                $sourceSide = $selectedSide === 'left' ? 'old' : 'new';
                $chunkLines = array_filter($this->diffData[$sourceSide], function ($line) use ($chunkId) {
                    return $line['chunkId'] === $chunkId && $line['type'] === 'content';
                });

                foreach ($chunkLines as $line) {
                    $mergedLines[] = $line['line'];
                }
            }
        }

        $mergedContent = implode("\n", $mergedLines);

        // Remove Git-style markers from the final content
        $mergedContent = preg_replace('/^\\\\ No newline at end of file$/m', '', $mergedContent);

        // If content was beautified, minify it back to original format
        if ($this->diffData['wasBeautified']) {
            $fileExtension = $this->config['language'] ?? 'php';
            $mergedContent = CodeBeautifier::minify($mergedContent, $fileExtension);
        }

        return $mergedContent;
    }
}
