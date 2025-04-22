<?php

/**
 * Generate Data Flow Diagrams
 *
 * This script generates data flow diagrams for documentation
 * using the DataFlowDiagramGenerator class
 */

// Include autoloader
require_once __DIR__ . '/../vendor/autoload.php';

// Include Config
require_once __DIR__ . '/../php/Config.php';
require_once __DIR__ . '/../php/DataFlowDiagramGenerator.php';

use VisualDiffMerge\Config;
use VisualDiffMerge\DataFlowDiagramGenerator;

// Initialize configuration
Config::init();

// Create output directory if it doesn't exist
$outputDir = __DIR__ . '/../docs/images';
if (!is_dir($outputDir)) {
    mkdir($outputDir, 0755, true);
}

echo "Generating data flow diagrams...\n";

// Initialize diagram generator
$generator = new DataFlowDiagramGenerator([
    'outputFormat' => 'svg',
    'theme' => 'default',
    'showConfig' => true,
    'includeTimestamp' => true
]);

$generator->setOutputDirectory($outputDir);

// Generate architecture overview diagram
echo "Generating architecture overview diagram...\n";
$archPath = $generator->generateArchitectureOverview();
echo "  - Created: " . basename($archPath) . "\n";

// Generate data flow diagram
echo "Generating general data flow diagram...\n";
$dataFlowPath = $generator->generateDataFlowDiagram();
echo "  - Created: " . basename($dataFlowPath) . "\n";

// Generate mode-specific flow diagrams
$modes = ['file-browser', 'file-upload', 'text-compare', 'url-compare'];
echo "Generating mode-specific flow diagrams...\n";
foreach ($modes as $mode) {
    echo "  - Mode: $mode\n";
    $modePath = $generator->generateModeFlowDiagram($mode);
    echo "    Created: " . basename($modePath) . "\n";
}

// Generate initialization sequence
echo "Generating initialization sequence diagram...\n";
$initPath = $generator->generateInitializationSequence();
echo "  - Created: " . basename($initPath) . "\n";

// Generate configuration flow
echo "Generating configuration flow diagram...\n";
$configPath = $generator->generateConfigurationFlow();
echo "  - Created: " . basename($configPath) . "\n";

echo "\nAll diagrams generated successfully!\n";
echo "Diagrams are available in: " . realpath($outputDir) . "\n";

// Reminder to add diagrams to the documentation
echo "\nRemember to update the documentation files to include these diagrams.\n";
echo "You can add them to HTML files using: <img src=\"images/diagram-name.svg\" alt=\"Diagram description\">\n";
