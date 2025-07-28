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
     * Extract lines for a specific chunk and side
     * @param {string} chunkId - Chunk identifier
     * @param {string} side - Side to extract ('old' or 'new')
     * @returns {Array} Array of lines for the chunk
     */
    extractChunkLines(chunkId, side) {
        const chunk = this.chunkManager.chunks.find(c => c.id === chunkId);
        if (!chunk) {
            Debug.log(`MergeContentGenerator: Chunk not found: ${chunkId}`, null, 3);
            return [];
        }

        // Get the content array based on side (old or new)
        const contentArray = side === 'old' ? this.chunkManager.oldContent : this.chunkManager.newContent;

        // Filter lines that belong to this chunk
        const lines = contentArray.filter(line => line.chunkId === chunkId);

        Debug.log(`MergeContentGenerator: Extracted ${lines.length} lines from chunk ${chunkId} (${side})`, {
            chunkId,
            side,
            linesCount: lines.length,
            totalContentLines: contentArray.length,
            sampleLines: lines.slice(0, 3)
        }, 3);

        return lines;
    }

    /**
     * Generate merged content based on selections
     * @param {Object} selections - Map of chunk IDs to selected sides
     * @returns {string} Merged content
     */
    generateMergedContent(selections) {
        Debug.log('MergeContentGenerator: Starting merge generation', {
            totalChunks: this.chunkManager.chunks.length,
            selections: Object.keys(selections).length
        }, 2);

        // If no selections, return right side content
        if (Object.keys(selections).length === 0) {
            Debug.log('MergeContentGenerator: No selections, returning new content', null, 2);
            return ChunkUtils.generateFileContent(this.chunkManager.newContent);
        }

        const mergedLines = [];

        // Create a map of chunk lines by chunk ID for faster lookup
        const oldChunkLines = {};
        const newChunkLines = {};

        // Group lines by chunk ID
        this.chunkManager.oldContent.forEach(line => {
            if (line.chunkId) {
                if (!oldChunkLines[line.chunkId]) {
                    oldChunkLines[line.chunkId] = [];
                }
                oldChunkLines[line.chunkId].push(line);
            }
        });

        this.chunkManager.newContent.forEach(line => {
            if (line.chunkId) {
                if (!newChunkLines[line.chunkId]) {
                    newChunkLines[line.chunkId] = [];
                }
                newChunkLines[line.chunkId].push(line);
            }
        });

        // Track which chunks we've processed to avoid duplicates
        const processedChunks = new Set();

        // Process all lines from newContent in order, but replace chunks as needed
        for (const line of this.chunkManager.newContent) {
            if (line.chunkId && selections[line.chunkId]) {
                // This line belongs to a chunk with a selection
                if (!processedChunks.has(line.chunkId)) {
                    // First time we encounter this chunk - add all lines from selected side
                    const selectedSide = selections[line.chunkId];

                    if (selectedSide === 'left') {
                        // Add all lines from old content for this chunk
                        const chunkLines = oldChunkLines[line.chunkId] || [];
                        chunkLines.forEach(chunkLine => {
                            if (chunkLine.type === 'content') {
                                mergedLines.push(chunkLine);
                            }
                        });
                    } else {
                        // Add all lines from new content for this chunk
                        const chunkLines = newChunkLines[line.chunkId] || [];
                        chunkLines.forEach(chunkLine => {
                            if (chunkLine.type === 'content') {
                                mergedLines.push(chunkLine);
                            }
                        });
                    }
                    processedChunks.add(line.chunkId);
                }
                // Skip this individual line since we've added the whole chunk
            } else if (!line.chunkId) {
                // This is common content (not part of any chunk)
                if (line.type === 'content') {
                    mergedLines.push(line);
                }
            }
            // Skip lines that belong to chunks without selections
        }

        Debug.log('MergeContentGenerator: Processing complete', {
            totalMergedLines: mergedLines.length,
            processedChunks: Array.from(processedChunks),
            sampleLines: mergedLines.slice(0, 3).map(l => l.line?.substring(0, 50) + '...' || 'empty')
        }, 3);

        const mergedContent = ChunkUtils.generateFileContent(mergedLines);

        Debug.log('MergeContentGenerator: Merge generation complete', {
            totalLines: mergedLines.length,
            contentLength: mergedContent.length
        }, 2);

        return mergedContent;
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
