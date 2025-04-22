<?php

namespace VisualDiffMerge;

/**
 * Data Flow Diagram Generator
 *
 * Generates data flow diagrams for Visual Diff Merge documentation
 */
class DataFlowDiagramGenerator
{
    /**
     * Configuration options
     */
    private $config;

    /**
     * Output directory for generated diagrams
     */
    private $outputDir;

    /**
     * Constructor
     *
     * @param array $config Configuration options
     */
    public function __construct($config = [])
    {
        // Set default configuration
        $this->config = array_merge([
            'outputFormat' => 'svg',
            'theme' => 'default',
            'showConfig' => true,
            'includeTimestamp' => true
        ], $config);

        // Default output directory is docs/images
        $this->outputDir = realpath(__DIR__ . '/../docs/images');
        if (!is_dir($this->outputDir)) {
            mkdir($this->outputDir, 0755, true);
        }
    }

    /**
     * Set output directory
     *
     * @param string $dir Output directory path
     * @return self
     */
    public function setOutputDirectory($dir)
    {
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        $this->outputDir = realpath($dir);
        return $this;
    }

    /**
     * Generate the main architecture overview diagram
     *
     * @return string Path to generated diagram
     */
    public function generateArchitectureOverview()
    {
        $filename = 'architecture-overview.' . $this->config['outputFormat'];
        $outputPath = $this->outputDir . '/' . $filename;

        // For now, output diagram generation information
        $content = $this->generateMermaidDiagram('architecture-overview', [
            'title' => 'Visual Diff Merge - Architecture Overview',
            'elements' => [
                'UI Layer' => ['Frontend Components', 'Theme System', 'Syntax Highlighting'],
                'API Layer' => ['AJAX Endpoints', 'Diff Processing'],
                'Backend Layer' => ['Config System', 'Path Management', 'Security'],
                'Storage' => ['File System']
            ],
            'connections' => [
                ['UI Layer', 'API Layer', 'API Requests'],
                ['API Layer', 'Backend Layer', 'Invokes'],
                ['Backend Layer', 'Storage', 'Reads/Writes'],
                ['API Layer', 'UI Layer', 'JSON Response']
            ]
        ]);

        file_put_contents($outputPath, $content);
        return $outputPath;
    }

    /**
     * Generate data flow diagram for all usage modes
     *
     * @return string Path to generated diagram
     */
    public function generateDataFlowDiagram()
    {
        $filename = 'data-flow-diagram.' . $this->config['outputFormat'];
        $outputPath = $this->outputDir . '/' . $filename;

        $content = $this->generateMermaidDiagram('data-flow', [
            'title' => 'Visual Diff Merge - Data Flow Diagram',
            'elements' => [
                'Client Browser' => ['User Interface'],
                'API Endpoints' => ['ajax-diff-merge.php', 'get-file-content.php', 'get-url-content.php', 'diff-processor.php'],
                'Backend Services' => ['Config', 'PathManager', 'DiffViewer', 'Security'],
                'File System' => ['Source Files']
            ],
            'connections' => [
                ['Client Browser', 'API Endpoints', 'HTTP Requests'],
                ['API Endpoints', 'Backend Services', 'PHP Function Calls'],
                ['Backend Services', 'File System', 'File Operations'],
                ['Backend Services', 'API Endpoints', 'Processed Data'],
                ['API Endpoints', 'Client Browser', 'JSON Response']
            ]
        ]);

        file_put_contents($outputPath, $content);
        return $outputPath;
    }

    /**
     * Generate mode-specific data flow diagrams
     *
     * @param string $mode Operation mode (file-browser, file-upload, text-compare, url-compare)
     * @return string Path to generated diagram
     */
    public function generateModeFlowDiagram($mode)
    {
        $validModes = ['file-browser', 'file-upload', 'text-compare', 'url-compare'];
        if (!in_array($mode, $validModes)) {
            throw new \InvalidArgumentException("Invalid mode: $mode");
        }

        $filename = "mode-$mode-flow." . $this->config['outputFormat'];
        $outputPath = $this->outputDir . '/' . $filename;

        $diagrams = [
            'file-browser' => [
                'title' => 'File Browser Mode - Data Flow',
                'elements' => [
                    'FileBrowser.js' => ['Directory Navigation', 'File Selection'],
                    'get-file-content.php' => ['Directory Listing', 'File Retrieval'],
                    'diff-processor.php' => ['Diff Generation'],
                    'PathManager' => ['Path Validation', 'Security Checks'],
                    'Config' => ['Settings', 'Allowed Directories']
                ],
                'connections' => [
                    ['FileBrowser.js', 'get-file-content.php', 'List Directory/Get File'],
                    ['get-file-content.php', 'PathManager', 'Validate Paths'],
                    ['PathManager', 'Config', 'Check Allowed Directories'],
                    ['get-file-content.php', 'diff-processor.php', 'Request Diff'],
                    ['diff-processor.php', 'Config', 'Get Diff Settings'],
                    ['diff-processor.php', 'FileBrowser.js', 'Return Diff Data']
                ]
            ],
            'file-upload' => [
                'title' => 'File Upload Mode - Data Flow',
                'elements' => [
                    'file-upload.js' => ['File Upload UI', 'AJAX Upload'],
                    'ajax-diff-merge.php' => ['File Processing', 'Temp Storage'],
                    'diff-processor.php' => ['Diff Generation'],
                    'Config' => ['Diff Settings']
                ],
                'connections' => [
                    ['file-upload.js', 'ajax-diff-merge.php', 'Upload Files'],
                    ['ajax-diff-merge.php', 'diff-processor.php', 'Process Diff'],
                    ['diff-processor.php', 'Config', 'Get Settings'],
                    ['diff-processor.php', 'ajax-diff-merge.php', 'Return Diff Data'],
                    ['ajax-diff-merge.php', 'file-upload.js', 'JSON Response']
                ]
            ],
            'text-compare' => [
                'title' => 'Text Compare Mode - Data Flow',
                'elements' => [
                    'text-compare.js' => ['Text Input UI', 'AJAX Submission'],
                    'ajax-diff-merge.php' => ['Text Processing'],
                    'diff-processor.php' => ['Diff Generation'],
                    'Config' => ['Diff Settings']
                ],
                'connections' => [
                    ['text-compare.js', 'ajax-diff-merge.php', 'Submit Text'],
                    ['ajax-diff-merge.php', 'diff-processor.php', 'Process Diff'],
                    ['diff-processor.php', 'Config', 'Get Settings'],
                    ['diff-processor.php', 'ajax-diff-merge.php', 'Return Diff Data'],
                    ['ajax-diff-merge.php', 'text-compare.js', 'JSON Response']
                ]
            ],
            'url-compare' => [
                'title' => 'URL Compare Mode - Data Flow',
                'elements' => [
                    'url-compare.js' => ['URL Input UI', 'AJAX Request'],
                    'get-url-content.php' => ['URL Fetching', 'Content Retrieval'],
                    'diff-processor.php' => ['Diff Generation'],
                    'Config' => ['Diff Settings', 'Security Options']
                ],
                'connections' => [
                    ['url-compare.js', 'get-url-content.php', 'Submit URLs'],
                    ['get-url-content.php', 'External URLs', 'Fetch Content'],
                    ['get-url-content.php', 'diff-processor.php', 'Process Diff'],
                    ['diff-processor.php', 'Config', 'Get Settings'],
                    ['diff-processor.php', 'get-url-content.php', 'Return Diff Data'],
                    ['get-url-content.php', 'url-compare.js', 'JSON Response']
                ]
            ]
        ];

        $content = $this->generateMermaidDiagram("mode-$mode", $diagrams[$mode]);
        file_put_contents($outputPath, $content);
        return $outputPath;
    }

    /**
     * Generate initialization sequence diagram
     *
     * @return string Path to generated diagram
     */
    public function generateInitializationSequence()
    {
        $filename = 'initialization-sequence.' . $this->config['outputFormat'];
        $outputPath = $this->outputDir . '/' . $filename;

        $content = $this->generateMermaidDiagram('init-sequence', [
            'type' => 'sequence',
            'title' => 'Visual Diff Merge - Initialization Sequence',
            'elements' => ['Browser', 'index.js', 'ResourceLoader', 'ConfigUtils', 'ThemeManager', 'DiffViewer', 'EndpointDiscovery', 'Config.php'],
            'sequences' => [
                ['Browser', 'index.js', 'Load Page'],
                ['index.js', 'ConfigUtils', 'Validate Config'],
                ['index.js', 'ResourceLoader', 'Initialize'],
                ['ResourceLoader', 'ThemeManager', 'Load Theme'],
                ['index.js', 'EndpointDiscovery', 'Discover API Endpoints'],
                ['EndpointDiscovery', 'Config.php', 'Get Configuration'],
                ['index.js', 'DiffViewer', 'Initialize Viewer'],
                ['DiffViewer', 'Browser', 'Render UI']
            ]
        ]);

        file_put_contents($outputPath, $content);
        return $outputPath;
    }

    /**
     * Generate configuration flow diagram
     *
     * @return string Path to generated diagram
     */
    public function generateConfigurationFlow()
    {
        $filename = 'configuration-flow.' . $this->config['outputFormat'];
        $outputPath = $this->outputDir . '/' . $filename;

        $content = $this->generateMermaidDiagram('config-flow', [
            'title' => 'Visual Diff Merge - Configuration Flow',
            'elements' => [
                'Config Default Values' => ['In Config.php'],
                'User Config' => ['api/config.php'],
                'Config.php init()' => ['Merge Configurations'],
                'Backend Components' => ['PathManager', 'DiffViewer', 'Security'],
                'API Endpoints' => ['ajax-diff-merge.php', 'get-file-content.php'],
                'window.diffConfig' => ['Browser JS Config'],
                'Frontend Components' => ['ThemeManager', 'ResourceLoader', 'DiffViewer.js']
            ],
            'connections' => [
                ['Config Default Values', 'Config.php init()', 'Start with defaults'],
                ['User Config', 'Config.php init()', 'Merge user settings'],
                ['Config.php init()', 'Backend Components', 'Configure PHP components'],
                ['Config.php init()', 'API Endpoints', 'Configure endpoints'],
                ['API Endpoints', 'window.diffConfig', 'Pass JS config'],
                ['window.diffConfig', 'Frontend Components', 'Configure JS components']
            ]
        ]);

        file_put_contents($outputPath, $content);
        return $outputPath;
    }

    /**
     * Generate a Mermaid diagram based on the specified type and data
     *
     * @param string $type Diagram type
     * @param array $data Diagram data
     * @return string Mermaid diagram markup
     */
    private function generateMermaidDiagram($type, $data)
    {
        $diagramType = isset($data['type']) ? $data['type'] : 'flowchart';
        $output = "```mermaid\n";

        switch ($diagramType) {
            case 'sequence':
                $output .= "sequenceDiagram\n";
                if (isset($data['title'])) {
                    $output .= "    title: " . $data['title'] . "\n";
                }

                foreach ($data['sequences'] as $sequence) {
                    $output .= "    " . $sequence[0] . "->>+" . $sequence[1] . ": " . $sequence[2] . "\n";
                }
                break;

            case 'flowchart':
            default:
                $output .= "flowchart TD\n";
                if (isset($data['title'])) {
                    $output .= "    title[\"" . $data['title'] . "\"]\n";
                }

                // Add elements
                $nodeIds = [];
                foreach ($data['elements'] as $group => $items) {
                    $groupId = $this->sanitizeId($group);
                    $nodeIds[$group] = $groupId;
                    $output .= "    " . $groupId . "[\"" . $group . "\"]\n";

                    // Add subitems if any
                    foreach ($items as $index => $item) {
                        $itemId = $this->sanitizeId($group . '_' . $item);
                        $nodeIds[$item] = $itemId;
                        $output .= "    " . $itemId . "[\"" . $item . "\"]\n";
                        $output .= "    " . $groupId . " --> " . $itemId . "\n";
                    }
                }

                // Add connections
                if (isset($data['connections'])) {
                    foreach ($data['connections'] as $connection) {
                        $from = isset($nodeIds[$connection[0]]) ? $nodeIds[$connection[0]] : $this->sanitizeId($connection[0]);
                        $to = isset($nodeIds[$connection[1]]) ? $nodeIds[$connection[1]] : $this->sanitizeId($connection[1]);
                        $label = isset($connection[2]) ? " |\"" . $connection[2] . "\"| " : " --> ";

                        $output .= "    " . $from . " -->" . $label . $to . "\n";
                    }
                }
                break;
        }

        $output .= "```";

        if ($this->config['includeTimestamp']) {
            $output .= "\n\n<!-- Generated on: " . date('Y-m-d H:i:s') . " -->";
        }

        return $output;
    }

    /**
     * Sanitize a string to be used as a Mermaid node ID
     *
     * @param string $id The raw ID string
     * @return string Sanitized ID
     */
    private function sanitizeId($id)
    {
        // Replace spaces and special characters with underscores
        $id = preg_replace('/[^a-zA-Z0-9_]/', '_', $id);
        // Ensure ID starts with a letter
        if (!preg_match('/^[a-zA-Z]/', $id)) {
            $id = 'n_' . $id;
        }
        return $id;
    }
}
