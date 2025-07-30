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
            'enabled' => false,  // Set to true for debugging

            // Log detail level: 1=minimal, 2=normal, 3=verbose
            'logLevel' => 3,    // Set to highest level for detailed logs

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
        'lang' => 'fr', // Default language code (e.g., 'en', 'fr', etc.)

        /**
         * Debug Settings
         */
        'debug' => false,  // Enable or disable client-side debugging
        'logLevel' => 3,   // Client-side log level: 1=minimal, 2=normal, 3=verbose

        /**
         * Save Options
         * Enable or disable different save options in the merge UI
         */
        'saveOptions' => [
            // Save to current file (new file)
            'saveToOriginal' => true,

            // Save to current file with suffix
            'saveWithSuffix' => true,

            // Save to old file (overwrite)
            'saveToOld' => true,

            // Save to old file with suffix
            'saveToOldWithSuffix' => true,

            // Save to both files (overwrite both)
            'saveToBoth' => true,

            // Save to both files with suffix
            'saveToBothWithSuffix' => true
        ],

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
                'saveWithSuffix' => 'Save to new with suffix',
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
                'resolveConflictsMessage' => 'Would you like to resolve these conflicts before merging?'
            ],
            'fr' => [
                // UI elements
                'alert' => 'Alerte',
                'applyMerge' => 'Appliquer la fusion',
                'cancel' => 'Annuler',
                'checkAll' => 'Tout cocher',
                'confirm' => 'Confirmer',
                'confirmation' => 'Confirmation',
                'continueResolving' => 'Continuer la résolution',
                'copy' => 'Copier',
                'copyCode' => 'Copier le code',
                'copyToClipboard' => 'Copier dans le presse-papiers',
                'copyInstructions' => 'Sélectionnez le code ci-dessous ou utilisez le bouton de copie :',
                'copied' => 'Copié !',
                'copyFailed' => 'Échec de la copie',
                'getMergedResult' => 'Obtenir le résultat fusionné',
                'getMergedResultTooltip' => 'Afficher et télécharger le contenu fusionné',
                'loadingTheme' => 'Chargement du thème...',
                'newText' => 'Nouveau texte :',
                'ok' => 'OK',
                'oldText' => 'Ancien texte :',
                'tryAgain' => 'Réessayer',
                'filesIdenticalMessage' => '<strong>Fichiers identiques</strong><br>Les fichiers que vous comparez sont identiques. Aucune différence trouvée.',
                'identicalContentMessage' => 'Les contenus sont identiques. Il n\'y a rien à fusionner.',
                'mergeAnyway' => 'Fusionner quand même',
                'mergeAsNewDone' => '%FILE% a été créé avec succès',
                'mergeDone' => 'Le fichier %FILE% a été mis à jour.',
                'mergeOverwriteDone' => 'Le fichier %FILE% a été écrasé avec succès',
                'saveToOriginal' => 'Remplacer le fichier actuel',
                'saveToOriginalTooltip' => 'Remplacer le fichier actuel par le contenu fusionné',
                'saveWithSuffix' => 'Enregistrer avec suffixe (dossier actuel)',
                'saveWithSuffixTooltip' => 'Sauvegarder le contenu fusionné dans le dossier actuel en tant que nouveau fichier avec le suffixe -merged',
                'saveToOld' => 'Écraser l\'ancien fichier',
                'saveToOldTooltip' => 'Remplacer l\'ancien fichier par le contenu fusionné',
                'saveToOldWithSuffix' => 'Sauvegarder avec suffixe (ancien dossier)',
                'saveToOldWithSuffixTooltip' => 'Sauvegarder le contenu fusionné en tant que nouveau fichier avec le suffixe -merged dans l\'ancien emplacements',
                'saveToBoth' => 'Écraser les deux fichiers',
                'saveToBothTooltip' => 'Remplacer les anciens et nouveaux fichiers par le contenu fusionné',
                'saveToBothWithSuffix' => 'Sauvegarder avec suffixe (ancien et nouveau dossier)',
                'saveToBothWithSuffixTooltip' => 'Sauvegarder le contenu fusionné en tant que nouveaux fichiers avec le suffixe -merged dans les deux emplacements',
                'unableToMerge' => 'Impossible de fusionner : tous les conflits n\'ont pas été résolus.',
                'unresolvedChunkSingular' => 'Il reste <strong>%COUNT%</strong> fragment non résolu.',
                'unresolvedChunksPlural' => 'Il reste <strong>%COUNT%</strong> fragments non résolus.',
                'backupVersion' => 'Version de sauvegarde',
                'newVersion' => 'Nouvelle version',
                'close' => 'Fermer',
                'preview' => 'Aperçu'
            ]
        ]
    ]
];
