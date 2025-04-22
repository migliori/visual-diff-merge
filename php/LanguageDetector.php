<?php

namespace VisualDiffMerge;

use League\MimeTypeDetection\ExtensionMimeTypeDetector;

class LanguageDetector
{
    /**
     * Map of file extensions to language names
     */
    private static $extensionMap = [
        'php' => 'php',
        'js' => 'javascript',
        'jsx' => 'javascript',
        'ts' => 'typescript',
        'tsx' => 'typescript',
        'html' => 'html',
        'htm' => 'html',
        'css' => 'css',
        'scss' => 'scss',
        'sass' => 'sass',
        'less' => 'less',
        'json' => 'json',
        'xml' => 'xml',
        'md' => 'markdown',
        'py' => 'python',
        'rb' => 'ruby',
        'java' => 'java',
        'c' => 'c',
        'cpp' => 'cpp',
        'h' => 'c',
        'hpp' => 'cpp',
        'cs' => 'csharp',
        'go' => 'go',
        'rs' => 'rust',
        'sql' => 'sql',
        'yml' => 'yaml',
        'yaml' => 'yaml',
        'txt' => 'plaintext',
        // Add more extensions as needed
    ];

    /**
     * Language signatures to detect languages based on content
     */
    private static $contentSignatures = [
        '<?php' => 'php',
        '<\?=' => 'php',
        '#!/usr/bin/env node' => 'javascript',
        'function(' => 'javascript',
        'const ' => 'javascript',
        'let ' => 'javascript',
        'var ' => 'javascript',
        'import React' => 'javascript',
        'class="' => 'html',
        '<!DOCTYPE' => 'html',
        '<html' => 'html',
        '@media' => 'css',
        '@import' => 'css',
        'body {' => 'css',
        '#[' => 'php', // PHP attributes
        'package ' => 'java',
        'public class ' => 'java',
        'def ' => 'python',
        'import ' => ['python', 'java', 'javascript'],
        'func ' => 'go',
        'fn ' => 'rust',
        'SELECT ' => 'sql',
        'CREATE TABLE ' => 'sql'
    ];

    /**
     * Detect language based on file extension
     *
     * @param string $extension File extension (without dot)
     * @return string Language name or default
     */
    public static function detectFromExtension(string $extension): string
    {
        $extension = strtolower(trim($extension, '.'));
        return static::$extensionMap[$extension] ?? 'plaintext';
    }

    /**
     * Detect language based on file content
     *
     * @param string $content File content
     * @return string Language name or default
     */
    public static function detectFromContent(string $content): string
    {
        $content = trim($content);

        // Check for content signatures
        foreach (static::$contentSignatures as $signature => $language) {
            if (preg_match('/' . preg_quote($signature, '/') . '/i', $content)) {
                if (is_array($language)) {
                    // For ambiguous signatures, do additional checks
                    if ($signature === 'import ' && strpos($content, '{') !== false && strpos($content, 'from ') !== false) {
                        return 'javascript'; // ES6 imports
                    }
                    // Return first language as default for array
                    return $language[0];
                }
                return $language;
            }
        }

        // Try mime type detection as fallback
        $detector = new ExtensionMimeTypeDetector();
        $tempFile = tempnam(sys_get_temp_dir(), 'lang_detect');
        file_put_contents($tempFile, $content);
        $mimeType = $detector->detectMimeTypeFromFile($tempFile);
        unlink($tempFile);

        // Map mime type to language
        switch ($mimeType) {
            case 'text/html':
                return 'html';
            case 'text/css':
                return 'css';
            case 'application/javascript':
            case 'text/javascript':
                return 'javascript';
            case 'application/json':
                return 'json';
            case 'text/xml':
            case 'application/xml':
                return 'xml';
            default:
                return 'plaintext';
        }
    }

    /**
     * Main detect method that tries extension first, then content
     *
     * @param string $content File content
     * @param string|null $extension File extension (optional)
     * @return string Detected language
     */
    public static function detect(string $content, ?string $extension = null): string
    {
        // If extension is provided, try that first
        if ($extension) {
            return static::detectFromExtension($extension);
        }

        // Otherwise detect from content
        return static::detectFromContent($content);
    }
}
