import { Debug } from '../../utils/Debug';
import { StringUtils } from '../../utils/StringUtils';
import Selectors from '../../constants/Selectors';
import { LoaderManager } from '../../utils/LoaderManager';
import { TranslationManager } from '../../utils/TranslationManager';

/**
 * Responsible for rendering chunk content
 */
export class ChunkRenderer {
    /**
     * @param {ChunkManager} chunkManager - Parent chunk manager
     */
    constructor(chunkManager) {
        this.chunkManager = chunkManager;
    }

    /**
     * Render all chunks to container
     */
    renderChunks() {
        Debug.log('ChunkRenderer: Beginning chunk rendering', null, 2);

        // Show loading indicator for large diffs (more than 100 chunks)
        let loaderId = null;
        if (this.chunkManager.chunks.length > 100) {
            const translationManager = TranslationManager.getInstance();
            const loaderManager = LoaderManager.getInstance();
            const loadingMessage = translationManager.get('renderingDiff', 'Rendering diff...');

            loaderId = loaderManager.showLoader(loadingMessage, {
                fullscreen: true,
                zIndex: 1000
            });

            Debug.log('ChunkRenderer: Showing loader for large diff rendering', null, 2);
        }

        // Performance tracking
        const startTime = performance.now();

        // Generate HTML for both panes
        const leftHtml = this.buildDiffPaneHtml(this.chunkManager.oldContent, 'left');
        const rightHtml = this.buildDiffPaneHtml(this.chunkManager.newContent, 'right');

        // Inject HTML into container - WITHOUT creating empty pane headers
        // The headers will be added by ChunkSelectionHandler later
        this.chunkManager.diffViewer.container.innerHTML = `
            <div class="${Selectors.DIFF.PANES_CONTAINER.name()}">
                <div class="${Selectors.DIFF.PANE.name()}" id="${Selectors.DIFF.PANE_LEFT.name()}" data-side="left">
                    ${leftHtml}
                </div>
                <div class="${Selectors.DIFF.PANE.name()}" id="${Selectors.DIFF.PANE_RIGHT.name()}" data-side="right">
                    ${rightHtml}
                </div>
            </div>
        `;

        // Hide loader if shown
        if (loaderId) {
            const loaderManager = LoaderManager.getInstance();
            loaderManager.hideLoader(loaderId);

            // Log performance metrics
            const endTime = performance.now();
            const duration = endTime - startTime;
            Debug.log(`ChunkRenderer: Rendered ${this.chunkManager.chunks.length} chunks in ${duration.toFixed(2)}ms`, null, 2);
        } else {
            Debug.log(`ChunkRenderer: Rendered ${this.chunkManager.chunks.length} chunks successfully`, null, 2);
        }
    }

    /**
     * Build HTML for a diff pane
     * @param {Array} lines - Content lines
     * @param {string} side - 'left' or 'right'
     * @returns {string} Generated HTML
     */
    buildDiffPaneHtml(lines, side) {
        // First, identify chunks that have placeholder lines
        const chunksWithPlaceholders = new Set();
        for (const line of lines) {
            if (line.type === 'placeholder' && line.chunkId) {
                chunksWithPlaceholders.add(line.chunkId);
            }
        }

        // Create HTML with nested containers for proper scrolling
        let html = `<div class="${Selectors.DIFF.PANE_CONTENT.name()} hljs">`; // Add scrolling container
        html += `<div class="${Selectors.DIFF.TABLE_WRAPPER.name()}">`;
        html += `<table class="${Selectors.CODE.TABLE.name()}"><tbody>`;

        let lineCounter = 0;

        for (const line of lines) {
            html += this._renderDiffLine(line, side, ++lineCounter, chunksWithPlaceholders);
        }

        html += '</tbody></table>';
        html += '</div>'; // Close table wrapper
        html += '</div>'; // Close scrolling container

        return html;
    }

    /**
     * Render a single diff line
     * @private
     */
    _renderDiffLine(line, side, lineNumber, chunksWithPlaceholders) {
        let html = '<tr>';

        const chunkId = line.chunkId !== undefined ? line.chunkId : '';

        // Get chunk type if this is a chunk line
        let chunkType = '';
        if (chunkId !== '') {
            const chunk = this.chunkManager.chunks.find(c => c.id === chunkId);
            chunkType = chunk ? chunk.type : '';
        }

        // Add line number cell
        html += `<td class="${Selectors.CODE.LINE_NUMBER.name()}">${lineNumber}</td>`;

        // Check if this chunk has placeholder lines
        const hasPlaceholder = chunkId !== '' && chunksWithPlaceholders.has(chunkId);

        if (line.type === 'placeholder') {
            html += this._renderPlaceholderLine(line, chunkId, chunkType, side, lineNumber);
        } else {
            html += this._renderContentLine(line, chunkId, chunkType, side, lineNumber, hasPlaceholder);
        }

        html += '</tr>';
        return html;
    }

    /**
     * Render placeholder line
     * @private
     */
    _renderPlaceholderLine(line, chunkId, chunkType, side, lineNumber) {
        // Add status class for chunks that can be navigated
        let additionalClass = '';
        if (chunkId !== '') {
            // Add the vdm-diff__chunk class for elements with chunk IDs
            additionalClass += ` ${Selectors.DIFF.CHUNK.name()}`;

            if (line.conflict || chunkType === 'replace' || chunkType === 'add' || chunkType === 'delete') {
                additionalClass += ` ${Selectors.STATUS.UNRESOLVED.name()}`;
            }
        }

        return `<td class="${Selectors.CODE.LINE_CONTENT.name()} ${Selectors.DIFF.LINE_CONTENT_EMPTY.name()} ${Selectors.DIFF.LINE_PLACEHOLDER.name()}${additionalClass}"
                   data-chunk-id="${chunkId}"
                   data-chunk-type="${chunkType}"
                   data-side="${side}"
                   data-placeholder-type="${line.placeholderType || 'default'}"
                   data-line-id="${side}-${lineNumber}"
                   data-has-placeholder="true">&nbsp;</td>`;
    }

    /**
     * Render content line
     * @private
     */
    _renderContentLine(line, chunkId, chunkType, side, lineNumber, hasPlaceholder) {
        const lineContent = line.line;
        const isEmpty = !lineContent || lineContent === '\r' || lineContent === '\n';

        // Add different classes based on chunk type
        let additionalClass = '';
        if (chunkId !== '') {
            additionalClass = this._getChunkClass(chunkType, side);

            // Add the vdm-diff__chunk class for elements with chunk IDs
            additionalClass += ` ${Selectors.DIFF.CHUNK.name()}`;

            // Add status class for chunks that can be navigated - include all chunk types that need resolution
            if (line.conflict || chunkType === 'replace' || chunkType === 'add' || chunkType === 'delete') {
                additionalClass += ` ${Selectors.STATUS.UNRESOLVED.name()}`;
            }
        }

        if (isEmpty) {
            additionalClass += ` ${Selectors.CODE.LINE_EMPTY.name()}`;
            return `<td class="${Selectors.CODE.LINE_CONTENT.name()}${additionalClass}"
                       data-chunk-id="${chunkId}"
                       data-chunk-type="${chunkType}"
                       data-side="${side}"
                       data-line-id="${side}-${lineNumber}"
                       ${hasPlaceholder ? 'data-has-placeholder="true"' : ''}>&nbsp;</td>`;
        } else {
            // Add the line content with proper attributes for chunk handling
            const displayContent = StringUtils.escapeHtml ?
                                   StringUtils.escapeHtml(lineContent) :
                                   lineContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');

            // Add cursor: pointer to all clickable chunk elements
            const styleAttr = chunkId !== '' ? ' style="cursor: pointer;"' : '';

            return `<td class="${Selectors.CODE.LINE_CONTENT.name()}${additionalClass}"
                       data-chunk-id="${chunkId}"
                       data-chunk-type="${chunkType}"
                       data-side="${side}"
                       data-line-id="${side}-${lineNumber}"
                       ${hasPlaceholder ? 'data-has-placeholder="true"' : ''}${styleAttr}>${displayContent}</td>`;
        }
    }

    /**
     * Get CSS class for a chunk type
     * @private
     */
    _getChunkClass(chunkType, side) {
        if (chunkType === 'delete' && side === 'left') {
            return ` ${Selectors.DIFF.LINE_DELETE.name()}`;
        } else if (chunkType === 'add' && side === 'right') {
            return ` ${Selectors.DIFF.LINE_ADD.name()}`;
        } else if (chunkType === 'replace') {
            let cls = ` ${Selectors.DIFF.LINE_ADD.name()}`;
            if (side === 'left') {
                cls += ` ${Selectors.DIFF.LINE_REPLACE_LEFT.name()}`;
            } else {
                cls += ` ${Selectors.DIFF.LINE_REPLACE_RIGHT.name()}`;
            }
            return cls;
        }
        return '';
    }
}
