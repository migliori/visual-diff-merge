<?php

// Include Composer's autoloader
require_once __DIR__ . '/../vendor/autoload.php';

// Use the namespaced class
use VisualDiffMerge\FileBrowser;

// OPTION 1 (ACTIVE): Directory-based file scanning with common files comparison
// =============================================================================
// Configuration - Specify directories to scan for files
$config = [
    'old' => [
        'type' => 'directory',
        'path' => realpath(dirname(__FILE__)) . '/../diff-viewer/samples/old/',
        'baseUrl' => '../diff-viewer/samples/old/'
    ],
    'new' => [
        'type' => 'directory',
        'path' => realpath(dirname(__FILE__)) . '/../diff-viewer/samples/new/',
        'baseUrl' => '../diff-viewer/samples/new/'
    ]
];

// Initialize the FileBrowser
$fileBrowser = new FileBrowser();

// Get common files from both directories organized by subdirectory
$commonFiles = $fileBrowser->compareDirectories(
    $config['old']['path'],
    $config['new']['path'],
    $config['old']['baseUrl'],
    $config['new']['baseUrl']
);

/*
// OPTION 2 (INACTIVE): Explicit file list
// =======================================
// Uncomment this section and comment out Option 1 to use explicit file lists

// Configuration - Specify explicit file lists
$config = [
    'old' => [
        'type' => 'files',
        'files' => [
            realpath(dirname(__FILE__)) . '/../diff-viewer/samples/old/example1.js',
            realpath(dirname(__FILE__)) . '/../diff-viewer/samples/old/example2.php',
            // Add more files as needed
        ],
        'baseUrl' => '../diff-viewer/samples/old/'
    ],
    'new' => [
        'type' => 'files',
        'files' => [
            realpath(dirname(__FILE__)) . '/../diff-viewer/samples/new/example1.js',
            realpath(dirname(__FILE__)) . '/../diff-viewer/samples/new/example2.php',
            // Add more files as needed
        ],
        'baseUrl' => '../diff-viewer/samples/new/'
    ]
];

// Initialize the FileBrowser
$fileBrowser = new FileBrowser();

// Get files from explicit file lists
$oldFiles = $fileBrowser->getFiles($config['old']['files'], $config['old']['baseUrl']);
$newFiles = $fileBrowser->getFiles($config['new']['files'], $config['new']['baseUrl']);
*/

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Browser Comparison - Visual-Diff-Merge Tool</title>
    <meta name="description" content="Browse and compare sample files with Visual-Diff-Merge. Explore code differences across multiple file types with syntax highlighting and merge capabilities.">
    <meta name="keywords" content="file browser, code comparison, Visual-Diff-Merge, diff viewer, merge tool, code analysis">
    <meta name="author" content="Visual-Diff-Merge">
    <!-- No canonical URL to allow flexible hosting -->
    <meta property="og:title" content="File Browser Comparison - Visual-Diff-Merge Tool">
    <meta property="og:description" content="Browse and compare sample files with Visual-Diff-Merge. Explore code differences with syntax highlighting.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://visual-diff-merge.miglisoft.com/diff-viewer/file-browser.php">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="File Browser Comparison - Visual-Diff-Merge Tool">
    <meta name="twitter:description" content="Browse and compare sample files with Visual-Diff-Merge. Explore code differences with syntax highlighting.">
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="Visual Diff Merge" />
    <link rel="manifest" href="/site.webmanifest" />

    <!-- Preconnect to Google Fonts for better performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pavanam&display=swap">

    <!-- Example styles for the demo page -->
    <link rel="stylesheet" href="css/styles.min.css">

    <!-- Include the Visual Diff Merge CSS -->
    <link rel="stylesheet" href="../dist/css/diff-viewer.min.css">

    <!-- Include the Visual Diff Merge theme CSS -->
    <link rel="stylesheet" href="../dist/css/diff-viewer-theme.min.css">

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Visual-Diff-Merge File Browser",
        "description": "Browse and compare sample files with syntax highlighting and visual diff tools",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    }
    </script>
</head>

<body>
    <div class="top-nav">
        <div class="top-nav-container">
            <a href="https://github.com/migliori/visual-diff-merge" target="_blank" class="top-nav-link">GitHub</a>
            <a href="/docs/" class="top-nav-link">Documentation</a>
            <a href="/diff-viewer/" class="top-nav-link">Visual Diff Merge</a>
        </div>
    </div>

    <div class="container p-3">

        <h1 class="mb-3">File Browser Comparison</h1>

        <p class="mb-4"><a href="index.html" class="btn btn-flat btn-sm">← Back Home</a></p>

        <div class="card p-3 mb-4">
            <form id="vdm-file-comparison-form" class="vdm-form vdm-d-flex vdm-flex-column">
                <div class="file-selectors mb-3">
                    <div class="mb-2">
                        <label for="compare-file" class="mb-1 d-block">Select File to Compare:</label>
                        <select id="compare-file" class="form-control">
                            <?php
                            // First, display root files (files without subdirectory)
                            if (isset($commonFiles['']) && !empty($commonFiles[''])) {
                                foreach ($commonFiles[''] as $file) {
                                    echo '<option value="' . htmlspecialchars($file['path']) . '"' .
                                         ' data-old-ref-id="' . htmlspecialchars($file['old_ref_id']) . '"' .
                                         ' data-new-ref-id="' . htmlspecialchars($file['new_ref_id']) . '"' .
                                         ' data-old-path="' . htmlspecialchars($file['old_path']) . '"' .
                                         ' data-new-path="' . htmlspecialchars($file['new_path']) . '">' .
                                         htmlspecialchars($file['language']) . ' (' . htmlspecialchars($file['name']) . ')' .
                                         '</option>';
                                }
                            }

                            // Then, display files organized by subdirectory
                            foreach ($commonFiles as $subdirectory => $files) {
                                if ($subdirectory === '') {
                                    continue; // Skip root files as they are already displayed
                                }

                                echo '<optgroup label="' . htmlspecialchars($subdirectory) . '">';
                                foreach ($files as $file) {
                                    echo '<option value="' . htmlspecialchars($file['path']) . '"' .
                                         ' data-old-ref-id="' . htmlspecialchars($file['old_ref_id']) . '"' .
                                         ' data-new-ref-id="' . htmlspecialchars($file['new_ref_id']) . '"' .
                                         ' data-old-path="' . htmlspecialchars($file['old_path']) . '"' .
                                         ' data-new-path="' . htmlspecialchars($file['new_path']) . '">' .
                                         htmlspecialchars($file['language']) . ' (' . htmlspecialchars($file['name']) . ')' .
                                         '</option>';
                                }
                                echo '</optgroup>';
                            }
                            ?>
                        </select>
                    </div>
                </div>

                <button type="submit" class="vdm-btn vdm-btn--primary vdm-ms-auto icon-compare">Compare Files</button>
            </form>
        </div>

        <div id="vdm-merge__result" class="p-3 mb-3 vdm-d-none"></div>

        <div id="vdm-container__wrapper" class="vdm-theme--dark vdm-d-none">
            <div class="vdm-user-content">
                <h2 class="text-center mb-2">Side by Side Comparison</h2>
                <p class="text-center mb-3">Click on a section to select it for the merged result</p>
            </div>

            <!-- UI elements will be generated by JavaScript -->

        </div>

    </div>

    <footer class="footer-sticky">
        <p><a href="https://github.com/migliori/visual-diff-merge">View on GitHub</a></p>
    </footer>

    <script src="../dist/diff-viewer.min.js"></script>
    <script src="../dist/file-browser.min.js"></script>
</body>

</html>
