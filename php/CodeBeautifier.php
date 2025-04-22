<?php

namespace VisualDiffMerge;

use MatthiasMullie\Minify;

/**
 * CodeBeautifier - Handles minification and beautification of code files
 */
class CodeBeautifier
{
    /**
     * Detect if content is likely minified
     *
     * @param string $content The file content
     * @param string $fileExtension The file extension
     * @return bool True if the content appears to be minified
     */
    public static function isLikelyMinified(string $content, string $fileExtension): bool
    {
        // Quick empty check
        if (empty($content)) {
            return false;
        }

        // Get line count and average line length
        $lines = explode("\n", $content);
        $lineCount = count($lines);
        $avgLineLength = strlen($content) / $lineCount;

        // Different thresholds based on file type
        switch ($fileExtension) {
            case 'js':
                return $avgLineLength > 150 || ($lineCount < 5 && strlen($content) > 500);
            case 'css':
                return $avgLineLength > 120 || ($lineCount < 5 && strlen($content) > 500);
            case 'html':
            case 'php':
                return $avgLineLength > 300 || ($lineCount < 5 && strlen($content) > 1000);
            case 'json':
                // JSON is typically considered minified if it's all on one line or has very few lines
                return $lineCount < 3 && strlen($content) > 100;
            default:
                return $avgLineLength > 150;
        }
    }

    /**
     * Get supported file extensions for beautification/minification
     *
     * @return array List of supported file extensions
     */
    public static function getSupportedExtensions(): array
    {
        return [
            'js',
            'css',
            'html',
            'php',
            'json',
        ];
    }

    /**
     * Check if file extension is supported
     *
     * @param string $fileExtension File extension to check
     * @return bool True if supported
     */
    public static function isExtensionSupported(string $fileExtension): bool
    {
        return in_array(strtolower($fileExtension), static::getSupportedExtensions());
    }

    /**
     * Beautify content based on file extension
     *
     * @param string $content The content to beautify
     * @param string $fileExtension The file extension
     * @return string Beautified content
     * @throws \InvalidArgumentException If file extension is not supported
     */
    public static function beautify(string $content, string $fileExtension): string
    {
        if (empty($content)) {
            return $content;
        }

        $fileExtension = strtolower($fileExtension);

        if (!static::isExtensionSupported($fileExtension)) {
            throw new \InvalidArgumentException("Unsupported file extension for beautification: $fileExtension");
        }

        switch ($fileExtension) {
            case 'js':
                return static::beautifyJavascript($content);
            case 'css':
                return static::beautifyCss($content);
            case 'html':
                return static::beautifyHtml($content);
            case 'php':
                return static::beautifyPhp($content);
            case 'json':
                return static::beautifyJson($content);
            default:
                return $content;
        }
    }

    /**
     * Minify content based on file extension
     *
     * @param string $content The content to minify
     * @param string $fileExtension The file extension
     * @return string Minified content
     * @throws \InvalidArgumentException If file extension is not supported
     */
    public static function minify(string $content, string $fileExtension): string
    {
        if (empty($content)) {
            return $content;
        }

        $fileExtension = strtolower($fileExtension);

        if (!static::isExtensionSupported($fileExtension)) {
            throw new \InvalidArgumentException("Unsupported file extension for minification: $fileExtension");
        }
        switch ($fileExtension) {
            case 'js':
                $minifier = new Minify\JS($content);
                return $minifier->minify();

            case 'css':
                $minifier = new Minify\CSS($content);
                return $minifier->minify();

            case 'json':
                // Remove whitespace from JSON
                return static::minifyJson($content);

            case 'html':
            case 'php':
                // Simple minification for HTML/PHP
                return preg_replace([
                    '/<!--(?!\[if).*?-->/s',    // Remove HTML comments (except IE conditionals)
                    '/\s+/',                     // Collapse whitespace
                    '/>\s+</',                   // Remove whitespace between tags
                ], [
                    '',
                    ' ',
                    '><'
                ], $content);

            default:
                return $content;
        }
    }

    /**
     * Beautify JavaScript code
     *
     * @param string $content JavaScript content
     * @return string Beautified JavaScript
     */
    private static function beautifyJavascript(string $content): string
    {
        // Simple indentation-based beautifier
        $result = '';
        $indent = 0;
        $inString = false;
        $stringChar = '';
        $inComment = false;
        $multiComment = false;
        $escaped = false;
        $skipNextIteration = false;

        $chars = str_split($content);
        for ($i = 0; $i < count($chars); $i++) {
            $char = $chars[$i];
            $nextChar = $chars[$i + 1] ?? '';

            // Handle string literals
            if (($char === '"' || $char === "'") && !$inComment) {
                if ($inString && $stringChar === $char && !$escaped) {
                    $inString = false;
                } elseif (!$inString && !$escaped) {
                    $inString = true;
                    $stringChar = $char;
                }
            }

            // Handle escape characters in strings
            if ($char === '\\' && $inString && !$escaped) {
                $escaped = true;
            } else {
                $escaped = false;
            }

            // Handle comments
            if ($char === '/' && $nextChar === '*' && !$inString && !$inComment) {
                $inComment = true;
                $multiComment = true;
            }

            if ($char === '/' && $nextChar === '/' && !$inString && !$inComment) {
                $inComment = true;
                $multiComment = false;
            }

            if ($char === '*' && $nextChar === '/' && $inComment) {
                $inComment = false;
                $result .= $char . $nextChar;
                // Record that we need to skip the next character
                $skipNextIteration = true;
                continue;
            }

            // Skip the next iteration if needed
            if ($skipNextIteration) {
                $skipNextIteration = false;
                continue;
            }

            if ($char === "\n" && $inComment && !$multiComment) {
                $inComment = false;
            }

            // Format braces
            if ($char === '{' && !$inString && !$inComment) {
                $indent++;
                $result .= $char . "\n" . str_repeat('    ', $indent);
            } elseif ($char === '}' && !$inString && !$inComment) {
                $indent--;
                $result .= "\n" . str_repeat('    ', $indent) . $char;
                if ($nextChar !== ';' && $nextChar !== '}' && $nextChar !== ',') {
                    $result .= "\n" . str_repeat('    ', $indent);
                }
            } elseif ($char === ';' && !$inString && !$inComment) {
                // Format semicolons
                $result .= $char;
                if ($nextChar !== '}' && $nextChar !== ' ' && $nextChar !== "\n") {
                    $result .= "\n" . str_repeat('    ', $indent);
                }
            } elseif (
                $char === ',' && !$inString && !$inComment &&
                // Add newlines after commas in arrays/objects
                    (static::lastNonSpaceChar($result) === '}' || static::lastNonSpaceChar($result) === ']')
            ) {
                $result .= $char . "\n" . str_repeat('    ', $indent);
            } elseif ($char === "\n") {
                // Keep line breaks
                $result .= $char . ($inComment || $inString ? '' : str_repeat('    ', $indent));
            } else {
                // Add everything else
                $result .= $char;
            }
        }

        return $result;
    }

    /**
     * Beautify CSS code
     *
     * @param string $content CSS content
     * @return string Beautified CSS
     */
    private static function beautifyCss(string $content): string
    {
        // Apply basic formatting
        $result = '';
        $indent = 0;
        $inString = false;
        $stringChar = '';
        $inComment = false;
        $escaped = false;
        $skipNextIteration = false;  // Added flag variable
        $chars = str_split($content);

        for ($i = 0; $i < count($chars); $i++) {
            // Skip the next iteration if needed
            if ($skipNextIteration) {
                $skipNextIteration = false;
                continue;
            }

            $char = $chars[$i];
            $nextChar = isset($chars[$i + 1]) ? $chars[$i + 1] : '';

            // Handle string literals
            if (($char === '"' || $char === "'") && !$inComment) {
                if ($inString && $stringChar === $char && !$escaped) {
                    $inString = false;
                } elseif (!$inString) {
                    $inString = true;
                    $stringChar = $char;
                }
            }

            // Handle escape characters
            if ($char === '\\' && $inString && !$escaped) {
                $escaped = true;
            } else {
                $escaped = false;
            }

            // Handle comments
            if ($char === '/' && $nextChar === '*' && !$inString) {
                $inComment = true;
            }

            if ($char === '*' && $nextChar === '/' && $inComment) {
                $inComment = false;
                $result .= $char . $nextChar;
                // Record that we need to skip the next character
                $skipNextIteration = true;
                continue;
            }

            // Format braces
            if ($char === '{' && !$inString && !$inComment) {
                $indent++;
                $result .= " " . $char . "\n" . str_repeat('    ', $indent);
            } elseif ($char === '}' && !$inString && !$inComment) {
                $indent--;
                $result .= "\n" . str_repeat('    ', $indent) . $char . "\n";
            } elseif ($char === ';' && !$inString && !$inComment) {
                // Format semicolons
                $result .= $char . "\n" . str_repeat('    ', $indent);
            } elseif ($char === ',' && !$inString && !$inComment) {
                // Add newlines after commas in media queries
                $result .= $char . "\n" . str_repeat('    ', $indent);
            } elseif ($char === "\n" && !$inString) {
                // Keep line breaks
                $result .= $char . str_repeat('    ', $indent);
            } else {
                // Add everything else
                $result .= $char;
            }
        }

        return $result;
    }

    /**
     * Beautify PHP code
     *
     * @param string $content PHP content
     * @return string Beautified PHP
     */
    private static function beautifyPhp(string $content): string
    {
        // Use PHP_CodeSniffer's beautifier or a simple fallback
        if (extension_loaded('tokenizer')) {
            $tokens = token_get_all($content);
            $formatted = '';
            $indent = 0;

            foreach ($tokens as $token) {
                if (is_array($token)) {
                    [$id, $text] = $token;
                    if ($id === T_OPEN_TAG || $id === T_CLOSE_TAG) {
                        $formatted .= $text;
                    } elseif ($id === T_WHITESPACE) {
                        $formatted .= str_repeat('    ', $indent);
                    } else {
                        $formatted .= $text;
                    }
                } else {
                    if ($token === '{') {
                        $indent++;
                        $formatted .= $token . "\n" . str_repeat('    ', $indent);
                    } elseif ($token === '}') {
                        $indent--;
                        $formatted .= "\n" . str_repeat('    ', $indent) . $token;
                    } else {
                        $formatted .= $token;
                    }
                }
            }

            return $formatted;
        }

        // Fallback: return original content if tokenizer is unavailable
        return $content;
    }

    /**
     * Beautify HTML code
     *
     * @param string $content HTML content
     * @return string Beautified HTML
     */
    private static function beautifyHtml(string $content): string
    {
        // Use tidy extension if available
        if (extension_loaded('tidy') && class_exists('tidy')) {
            $tidy = new \tidy();
            $config = [
                'indent'        => true,
                'wrap'          => 0,
                'indent-spaces' => 4
            ];
            $tidy->parseString($content, $config, 'utf8');
            $tidy->cleanRepair();
            return (string)$tidy;
        }

        // Fallback simple HTML formatter
        $result = '';
        $indent = 0;
        $inTag = false;
        $inComment = false;
        $inScript = false;
        $inStyle = false;
        $tagName = '';
        $skipNextIndent = false;

        $lines = explode("\n", $content);
        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line)) {
                $result .= "\n";
                continue;
            }

            // Process the line character by character
            for ($i = 0; $i < strlen($line); $i++) {
                $char = $line[$i];
                $nextChar = isset($line[$i + 1]) ? $line[$i + 1] : '';

                // Handle comments
                if ($char === '<' && $nextChar === '!' && substr($line, $i, 4) === '<!--') {
                    $inComment = true;
                }

                if ($inComment && substr($line, $i, 3) === '-->') {
                    $inComment = false;
                }

                // Handle tags
                if ($char === '<' && !$inComment && $nextChar !== '/') {
                    $inTag = true;
                    $tagName = '';
                }

                if ($inTag && !$inComment && $char !== '<' && $char !== ' ' && $char !== '>') {
                    $tagName .= $char;
                }

                if ($char === '>' && $inTag) {
                    $inTag = false;

                    // Check for void elements
                    $voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
                    if (in_array(strtolower($tagName), $voidElements)) {
                        $skipNextIndent = true;
                    }

                    // Check for script/style
                    if (strtolower($tagName) === 'script') {
                        $inScript = true;
                    }

                    if (strtolower($tagName) === 'style') {
                        $inStyle = true;
                    }
                }

                // Handle closing tags
                if ($char === '<' && $nextChar === '/') {
                    $closingTag = '';
                    for ($j = $i + 2; $j < strlen($line); $j++) {
                        if ($line[$j] === '>' || $line[$j] === ' ') {
                            break;
                        }
                        $closingTag .= $line[$j];
                    }

                    if (strtolower($closingTag) === 'script') {
                        $inScript = false;
                    }

                    if (strtolower($closingTag) === 'style') {
                        $inStyle = false;
                    }

                    // Decrease indent for closing tag unless it's on same line as opening
                    if (!$skipNextIndent) {
                        $indent = max(0, $indent - 1);
                    }
                    $skipNextIndent = false;
                }

                // Add the character with indentation
                if ($i === 0) {
                    $result .= str_repeat('    ', $indent);
                }
                $result .= $char;

                // Increase indent after tag ends
                if ($char === '>' && !$inComment && !$inScript && !$inStyle && !$skipNextIndent) {
                    $indent++;
                }
            }

            $result .= "\n";
        }

        return $result;
    }

    /**
     * Beautify JSON content
     *
     * @param string $content JSON content
     * @return string Beautified JSON
     * @throws \InvalidArgumentException If content is not valid JSON
     */
    private static function beautifyJson(string $content): string
    {
        // Try to decode and re-encode with pretty print
        $decoded = json_decode($content);

        // Check for JSON decode errors
        if ($decoded === null && json_last_error() !== JSON_ERROR_NONE) {
            throw new \InvalidArgumentException("Invalid JSON: " . json_last_error_msg());
        }

        // Pretty print with 4 spaces indentation
        return json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    /**
     * Minify JSON content
     *
     * @param string $content JSON content
     * @return string Minified JSON
     * @throws \InvalidArgumentException If content is not valid JSON
     */
    private static function minifyJson(string $content): string
    {
        // Try to decode and re-encode without pretty print
        $decoded = json_decode($content);

        // Check for JSON decode errors
        if ($decoded === null && json_last_error() !== JSON_ERROR_NONE) {
            throw new \InvalidArgumentException("Invalid JSON: " . json_last_error_msg());
        }

        // Compact encoding (no whitespace)
        return json_encode($decoded, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    /**
     * Get the last non-space character in a string
     *
     * @param string $str Input string
     * @return string Last non-space character
     */
    private static function lastNonSpaceChar(string $str): string
    {
        for ($i = strlen($str) - 1; $i >= 0; $i--) {
            if ($str[$i] !== ' ' && $str[$i] !== "\n" && $str[$i] !== "\t") {
                return $str[$i];
            }
        }
        return '';
    }
}
