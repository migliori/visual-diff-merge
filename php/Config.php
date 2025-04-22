<?php

namespace VisualDiffMerge;

/**
 * Configuration system for Visual Diff Merge tool
 * Provides centralized access to all configuration settings
 */
class Config
{
    /**
     * Holds the merged configuration
     */
    private static $config = null;

    /**
     * Default configuration values
     */
    private static $defaults = [
        // PHP-only settings
        'php' => [
            'debug' => [
                'enabled' => false,
                'logLevel' => 2,
                'logFile' => 'debug-php-diff.log'
            ],
            'diff' => [
                'contextLines' => 3,
                'ignoreWhitespace' => false,
                'ignoreCase' => false
            ],
            'security' => [
                'csrfProtection' => true,
                'salt' => '',
                'allowedDirectories' => []
            ],
            'paths' => [
                'base' => ''
            ],
            /**
             * Environment Settings
             * Controls environment-specific behavior
             */
            'environment' => [
                // Set to 'production' for normal use
                'type' => 'production'
            ]
        ],

        // Settings passed to JavaScript
        'javascript' => [
            'lang' => 'en',
            'debug' => false,
            'logLevel' => 2,
            'theme' => [
                'defaultFamily' => 'atom-one',
                'defaultMode' => 'dark',
                'showSelector' => true
            ],
            'ui' => [
                // UI element classes
                'alertDanger' => 'alert-danger',
                'alertInfo' => 'alert-info',
                'alertSuccess' => 'alert-success',
                'alert' => 'alert',
                'buttonDanger' => 'btn-danger',
                'buttonFlat' => 'btn-flat',
                'buttonInfo' => 'btn-info',
                'buttonPrimary' => 'btn-primary',
                'buttonSecondary' => 'btn-secondary',
                'buttonSuccess' => 'btn-success',
                'buttonWarning' => 'btn-warning',
                'button' => 'btn'
            ],
            'apiEndpoint' => null,
            'translations' => [
                'en' => [
                    // UI elements
                    'alert' => 'Alert',
                    'applyMerge' => 'Apply Merge',
                    'cancel' => 'Cancel',
                    'checkAll' => 'Check All',
                    'confirm' => 'Confirm',
                    'confirmation' => 'Confirmation',
                    'continueResolving' => 'Continue Resolving',
                    'copy' => 'Copy',
                    'copyCode' => 'Copy Code',
                    'copyToClipboard' => 'Copy to Clipboard',
                    'copyInstructions' => 'Select the code below or use the copy button:',
                    'copied' => 'Copied!',
                    'copyFailed' => 'Copy Failed',
                    'getMergedResult' => 'Get Merged Result',
                    'getMergedResultTooltip' => 'View and download the merged content',
                    'loadingTheme' => 'Loading theme...',
                    'loadingContent' => 'Processing content...',
                    'loadingDiff' => 'Initializing viewer...',
                    'processingChunks' => 'Processing diff...',
                    'renderingDiff' => 'Rendering diff...',
                    'newText' => 'New Text:',
                    'ok' => 'OK',
                    'oldText' => 'Old Text:',
                    'tryAgain' => 'Try Again',
                    'filesIdenticalMessage' => '<strong>Files are identical</strong><br>The files you are comparing are identical. No differences found.',
                    'identicalContentMessage' => 'The contents are identical. There\'s nothing to merge.',
                    'mergeAnyway' => 'Merge Anyway',
                    'mergeAsNewDone' => '%FILE% has been created successfully',
                    'mergeDone' => 'The %FILE% file has been updated.',
                    'mergeOverwriteDone' => 'File %FILE% has been overwritten successfully',
                    'saveToOriginal' => 'Replace the current file',
                    'saveToOriginalTooltip' => 'Replace the current file with merged content',
                    'saveWithSuffix' => 'Save with suffix',
                    'saveWithSuffixTooltip' => 'Save merged content as a new file with -merged suffix',
                    'saveToOld' => 'Overwrite old file',
                    'saveToOldTooltip' => 'Replace the old file with merged content',
                    'saveToOldWithSuffix' => 'Save to old with suffix',
                    'saveToOldWithSuffixTooltip' => 'Save merged content as a new file with -merged suffix in old location',
                    'saveToBoth' => 'Overwrite both files',
                    'saveToBothTooltip' => 'Replace both old and new files with merged content',
                    'saveToBothWithSuffix' => 'Save to both with suffix',
                    'saveToBothWithSuffixTooltip' => 'Save merged content as new files with -merged suffix in both locations',
                    'unableToMerge' => 'Unable to merge: not all conflicts have been resolved.',
                    'unresolvedChunkSingular' => 'There is <strong>%COUNT%</strong> unresolved chunk remaining.',
                    'unresolvedChunksPlural' => 'There are <strong>%COUNT%</strong> unresolved chunks remaining.',
                    'backupVersion' => 'Backup Version',
                    'newVersion' => 'New Version',
                    'close' => 'Close',
                    'preview' => 'Preview',
                    'resolveConflictsMessage' => 'Would you like to resolve these conflicts before merging?',
                    'mergeSuccessClipboard' => 'Merge completed successfully. The merged content is ready.',

                    // Error messages
                    'invalidRequestMethod' => 'Invalid request method. Only POST requests are allowed.',
                    'fileNotFound' => 'Unable to locate the specified file in the backup directory.',
                    'errorReadingFiles' => 'Error reading files:',
                    'errorProcessingDiff' => 'Error processing diff:',
                    'accessDenied' => 'Access denied: Path is outside allowed directories'
                ]
            ]
        ]
    ];

    /**
     * Path to user configuration file
     */
    private static $configPath = '/../api/config.php';

    /**
     * Initialize configuration system
     * Loads and merges configuration from user file if it exists
     *
     * @return void
     */
    public static function init()
    {
        if (static::$config !== null) {
            return; // Already initialized
        }

        // Start with defaults
        $config = static::$defaults;

        // Load user configuration if it exists
        $fullPath = __DIR__ . static::$configPath;
        if (file_exists($fullPath)) {
            $userConfig = include $fullPath;
            if (is_array($userConfig)) {
                $config = static::mergeConfig($config, $userConfig);
            }
        }

        // Generate a security salt if not set
        if (empty($config['php']['security']['salt'])) {
            $config['php']['security']['salt'] = bin2hex(random_bytes(16));
        }

        // If base path not set, use application root
        if (empty($config['php']['paths']['base'])) {
            $config['php']['paths']['base'] = realpath(__DIR__ . '/..');
        }

        // Store merged configuration
        static::$config = $config;
    }

    /**
     * Recursively merge configurations
     *
     * @param array $base Base configuration
     * @param array $override Override configuration
     * @return array Merged configuration
     */
    private static function mergeConfig($base, $override)
    {
        foreach ($override as $key => $value) {
            // If the key exists in base and both are arrays, merge recursively
            if (isset($base[$key]) && is_array($base[$key]) && is_array($value)) {
                $base[$key] = static::mergeConfig($base[$key], $value);
            } else {
                // Otherwise override the value
                $base[$key] = $value;
            }
        }

        return $base;
    }

    /**
     * Get a configuration value
     *
     * @param string $path Dot-notation path to config value (e.g. 'php.debug.enabled')
     * @param mixed $default Default value if path not found
     * @return mixed Configuration value
     */
    public static function get($path = null, $default = null)
    {
        // Initialize if needed
        if (static::$config === null) {
            static::init();
        }

        // Return entire config if no path specified
        if ($path === null) {
            return static::$config;
        }

        // Handle dot notation
        $keys = explode('.', $path);
        $value = static::$config;

        foreach ($keys as $key) {
            if (!isset($value[$key])) {
                return $default;
            }
            $value = $value[$key];
        }

        return $value;
    }

    /**
     * Check if debug is enabled
     *
     * @return bool Debug status
     */
    public static function isDebugEnabled()
    {
        return static::get('php.debug.enabled', false);
    }

    /**
     * Get debug log level
     *
     * @return int Log level
     */
    public static function getLogLevel()
    {
        return static::get('php.debug.logLevel', 2);
    }

    /**
     * Get the base application path
     *
     * @return string Base path
     */
    public static function getBasePath()
    {
        return static::get('php.paths.base', realpath(__DIR__ . '/..'));
    }

    /**
     * Get translations for a specified language
     *
     * @param string $lang Language code
     * @return array Translations for the language
     */
    public static function getTranslations($lang = 'en')
    {
        $translations = static::get('javascript.translations.' . $lang);

        if (!$translations) {
            // Fallback to English
            $translations = static::get('javascript.translations.en', []);
        }

        return $translations;
    }

    /**
     * Get configuration for JavaScript client
     *
     * @return array Configuration for JS client
     */
    public static function getJsConfig()
    {
        // Initialize if needed
        if (static::$config === null) {
            static::init();
        }

        // Get the JavaScript config
        $jsConfig = static::get('javascript', []);

        return $jsConfig;
    }
}
