import { ChunkUtils } from '../../utils/ChunkUtils';
import { Debug } from '../../utils/Debug';

/**
 * Generates merged content from selections
 */
export class MergeContentGenerator {
    /**
     * @param {ChunkManager} chunkManager - Parent chunk manager
     */
    constructor(chunkManager) {
        this.chunkManager = chunkManager;
    }

    /**
     * Generate merged content based on selections
     * @param {Object} selections - Map of chunk IDs to selected sides
     * @returns {string} Merged content
     */
    generateMergedContent(selections) {
        // If no selections, return right side content
        if (Object.keys(selections).length === 0) {
            return ChunkUtils.generateFileContent(this.chunkManager.newContent);
        }

        // Start with empty result array
        const result = [];

        // Group right-side lines by chunk ID for better lookups
        const rightChunkLines = {};
        this.chunkManager.newContent.forEach(line => {
            if (line.chunkId) {
                if (!rightChunkLines[line.chunkId]) {
                    rightChunkLines[line.chunkId] = [];
                }
                rightChunkLines[line.chunkId].push(line);
            }
        });

        // Group left-side lines by chunk ID for better lookups
        const leftChunkLines = {};
        this.chunkManager.oldContent.forEach(line => {
            if (line.chunkId) {
                if (!leftChunkLines[line.chunkId]) {
                    leftChunkLines[line.chunkId] = [];
                }
                leftChunkLines[line.chunkId].push(line);
            }
        });

        Debug.log('leftChunkLines', leftChunkLines, 3);
        Debug.log('rightChunkLines', rightChunkLines, 3);
        Debug.log('selections', selections, 3);

        // Track processed chunks to avoid duplicates
        const processedChunks = new Set();

        // First pass: add non-chunk lines and handle chunk lines based on selection
        for (let i = 0; i < this.chunkManager.newContent.length; i++) {
            const line = this.chunkManager.newContent[i];

            // Non-chunk content lines always get added
            if (!line.chunkId && line.type === 'content') {
                result.push(line.line);
                continue;
            }

            // Skip non-content lines
            if (line.type !== 'content') {
                continue;
            }

            // Process chunk lines
            if (line.chunkId && !processedChunks.has(line.chunkId)) {
                // Mark this chunk as processed
                processedChunks.add(line.chunkId);

                // Get chunk selection (left, right, or undefined)
                const selection = selections[line.chunkId];

                // Handle based on selection
                if (selection === 'left') {
                    // Use left content for this chunk
                    const leftLines = leftChunkLines[line.chunkId] || [];
                    const contentLines = leftLines.filter(l => l.type === 'content');

                    if (contentLines.length > 0) {
                        contentLines.forEach(l => result.push(l.line));
                    }
                } else {
                    // Use right content for this chunk
                    const rightLines = rightChunkLines[line.chunkId] || [];
                    const contentLines = rightLines.filter(l => l.type === 'content');

                    if (contentLines.length > 0) {
                        contentLines.forEach(l => result.push(l.line));
                    }
                }
            }
        }

        // Return the combined content
        return result.join('\n');
    }

    /**
     * Generate file content from lines
     * @param {Array} lines - Array of line objects
     * @returns {string} Generated content
     */
    generateFileFromLines(lines) {
        return ChunkUtils.generateFileContent(lines);
    }
}
