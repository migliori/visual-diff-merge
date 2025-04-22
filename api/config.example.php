<?php

/**
 * Visual Diff Merge Tool - Configuration File Example
 *
 * HOW TO USE:
 * 1. Copy this file to "config.php" in the same directory
 * 2. Modify the settings to your preferences
 * 3. The application will automatically use your custom settings
 *
 * NOTE: Any settings not specified in your config.php will use the defaults.
 */

return [
    /**
     * PHP-only settings
     * These settings are only used on the server side
     */
    'php' => [
        /**
         * Debug Settings
         * Controls logging and debug information
         */
        'debug' => [
            // Enable or disable debug mode
            'enabled' => false,

            // Log detail level: 1=minimal, 2=normal, 3=verbose
            'logLevel' => 2,

            // Path to log file (relative to the api directory)
            'logFile' => 'debug-php-diff.log'
        ],

        /**
         * Diff Generation Settings
         * Controls how differences are detected
         */
        'diff' => [
            // Number of unchanged lines to show around changes
            'contextLines' => 3,

            // Whether to ignore whitespace when comparing
            'ignoreWhitespace' => false,

            // Whether to ignore case when comparing
            'ignoreCase' => false
        ],

        /**
         * Security Settings
         * Controls security-related configurations
         */
        'security' => [
            // Enable CSRF protection for API endpoints
            'csrfProtection' => true,

            // Salt for hashing reference IDs (leave empty to auto-generate)
            'salt' => '',

            // List of allowed directories that can be accessed
            // If empty, defaults to application root directory
            'allowedDirectories' => [
                // Examples (uncomment and modify as needed):
                // realpath(__DIR__ . '/../diff-viewer/samples'),
                // '/var/www/html/my-project',
                // 'C:\\Projects\\my-files'
            ]
        ],

        /**
         * Path Configuration
         * Controls path-related settings
         */
        'paths' => [
            // Base application path (leave empty to auto-detect)
            'base' => ''
        ]
    ],

    /**
     * JavaScript Settings
     * These settings are passed to the client-side application
     */
    'javascript' => [
        /**
         * Language Settings
         */
        'lang' => 'en', // Default language code (e.g., 'en', 'fr', etc.)

        /**
         * Debug Settings
         */
        'debug' => false,  // Enable or disable client-side debugging
        'logLevel' => 2,   // Client-side log level: 1=minimal, 2=normal, 3=verbose

        /**
         * Theme Settings
         */
        'theme' => [
            // Syntax highlighting theme family (e.g., 'atom-one', 'github')
            'defaultFamily' => 'atom-one',

            // Default theme mode: 'dark' or 'light'
            'defaultMode' => 'dark',

            // Whether to show theme selector in the UI
            'showSelector' => true
        ],

        /**
         * UI Settings
         * Define CSS classes used for styling UI elements
         */
        'ui' => [
            'alertDanger' => 'vdm-alert--danger',
            'alertInfo' => 'vdm-alert--info',
            'alertSuccess' => 'vdm-alert--success',
            'alert' => 'vdm-alert',
            'buttonDanger' => 'vdm-btn--danger',
            'buttonFlat' => 'vdm-btn--flat',
            'buttonInfo' => 'vdm-btn--info',
            'buttonPrimary' => 'vdm-btn--primary',
            'buttonSecondary' => 'vdm-btn--secondary',
            'buttonSuccess' => 'vdm-btn--success',
            'buttonWarning' => 'vdm-btn--warning',
            'button' => 'vdm-btn'
        ],

        /**
         * API Endpoint
         * Base URL for API calls - if null, will be auto-discovered
         */
        'apiEndpoint' => null,

        /**
         * Translations
         * Customize the text shown in the user interface
         */
        'translations' => [
            // English translations
            'en' => [
                // UI elements
                'applyMerge' => 'Apply Merge',
                'continueResolving' => 'Continue Resolving',
                'filesIdenticalMessage' => '<strong>Files are identical</strong><br>The files you are comparing are identical. No differences found.',
                'mergeAnyway' => 'Merge Anyway',
                'mergeAsNewDone' => '%FILE% has been created successfully',
                'mergeDone' => 'The %FILE% file has been updated.',
                'mergeOverwriteDone' => 'File %FILE% has been overwritten successfully',
                'saveToOriginal' => 'Save to original',
                'saveToOriginalTooltip' => 'Replace the current file with merged content',
                'saveWithSuffix' => 'Save with suffix',
                'saveWithSuffixTooltip' => 'Save merged content as a new file with -merged suffix',
                // New extended save options
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

                // Error messages
                'invalidRequestMethod' => 'Invalid request method. Only POST requests are allowed.',
                'fileNotFound' => 'Unable to locate the specified file in the backup directory.',
                'errorReadingFiles' => 'Error reading files:',
                'errorProcessingDiff' => 'Error processing diff:',

                // Confirmation dialogs
                'unresolvedConflicts' => 'Unresolved Conflicts',
                'resolveConflictsMessage' => 'Would you like to resolve these conflicts before merging?'
            ],

            // French translations
            'fr' => [
                // UI elements
                'applyMerge' => 'Appliquer la fusion',
                'continueResolving' => 'Continuer la résolution',
                'filesIdenticalMessage' => '<strong>Fichiers identiques</strong><br>Les fichiers que vous comparez sont identiques. Aucune différence trouvée.',
                'mergeAnyway' => 'Fusionner quand même',
                'mergeAsNewDone' => '%FILE% a été créé avec succès',
                'mergeDone' => 'Le fichier %FILE% a été mis à jour.',
                'mergeOverwriteDone' => 'Le fichier %FILE% a été écrasé avec succès',
                'saveToOriginal' => 'Sauvegarder dans l\'original',
                'saveToOriginalTooltip' => 'Remplacer le fichier actuel par le contenu fusionné',
                'saveWithSuffix' => 'Sauvegarder avec suffixe',
                'saveWithSuffixTooltip' => 'Sauvegarder le contenu fusionné en tant que nouveau fichier avec le suffixe -merged',
                // New extended save options
                'saveToOld' => 'Écraser l\'ancien fichier',
                'saveToOldTooltip' => 'Remplacer l\'ancien fichier par le contenu fusionné',
                'saveToOldWithSuffix' => 'Sauvegarder dans l\'ancien avec suffixe',
                'saveToOldWithSuffixTooltip' => 'Sauvegarder le contenu fusionné en tant que nouveau fichier avec le suffixe -merged dans l\'ancien emplacement',
                'saveToBoth' => 'Écraser les deux fichiers',
                'saveToBothTooltip' => 'Remplacer les anciens et nouveaux fichiers par le contenu fusionné',
                'saveToBothWithSuffix' => 'Sauvegarder dans les deux avec suffixe',
                'saveToBothWithSuffixTooltip' => 'Sauvegarder le contenu fusionné en tant que nouveaux fichiers avec le suffixe -merged dans les deux emplacements',
                'unableToMerge' => 'Impossible de fusionner : tous les conflits n\'ont pas été résolus.',
                'unresolvedChunkSingular' => 'Il reste <strong>%COUNT%</strong> fragment non résolu.',
                'unresolvedChunksPlural' => 'Il reste <strong>%COUNT%</strong> fragments non résolus.',
                'backupVersion' => 'Version de sauvegarde',
                'newVersion' => 'Nouvelle version',
                'close' => 'Fermer',
                'preview' => 'Aperçu',

                // Error messages
                'invalidRequestMethod' => 'Méthode de requête invalide. Seules les requêtes POST sont autorisées.',
                'fileNotFound' => 'Impossible de localiser le fichier spécifié dans le répertoire de sauvegarde.',
                'errorReadingFiles' => 'Erreur de lecture des fichiers :',
                'errorProcessingDiff' => 'Erreur lors du traitement de la différence :',

                // Confirmation dialogs
                'unresolvedConflicts' => 'Conflits non résolus',
                'resolveConflictsMessage' => 'Voulez-vous résoudre ces conflits avant la fusion ?'
            ]
        ]
    ]
];
