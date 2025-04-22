#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const { compile } = require('sass');

const targets = [
  { src: 'docs/scss/styles.scss', outDir: 'docs/css', name: 'styles' },
  { src: 'diff-viewer/scss/styles.scss', outDir: 'diff-viewer/css', name: 'styles' },
];

/**
 * Compile SCSS to CSS, generate source maps, and minify with proper mapping links.
 */
function compileTarget ({ src, outDir, name }) {
  const inputPath = path.resolve(__dirname, '..', src);
  const outputDir = path.resolve(__dirname, '..', outDir);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Helper to write CSS, sourcemap, and ensure correct sourceMappingURL comment
  function writeResult (result, filename, mapFilename) {
    const cssPath = path.join(outputDir, filename);
    const mapPath = path.join(outputDir, mapFilename);

    // Ensure CSS references the map file by basename
    let css = result.css;
    const mapComment = `/*# sourceMappingURL=${mapFilename} */`;
    if (!css.includes('sourceMappingURL')) {
      css += `\n${mapComment}`;
    }

    fs.writeFileSync(cssPath, css);
    fs.writeFileSync(mapPath, JSON.stringify(result.sourceMap));

    console.log(`✔ ${src} → ${path.join(outDir, filename)}`);
  }

  // 1. Expanded CSS
  const expandedMap = `${name}.css.map`;
  const expandedResult = compile(inputPath, {
    style: 'expanded',
    sourceMap: path.join(outputDir, expandedMap),
    sourceMapIncludeSources: true,
  });
  writeResult(expandedResult, `${name}.css`, expandedMap);

  // 2. Minified CSS
  const minMap = `${name}.min.css.map`;
  const compressedResult = compile(inputPath, {
    style: 'compressed',
    sourceMap: path.join(outputDir, minMap),
    sourceMapIncludeSources: true,
  });
  writeResult(compressedResult, `${name}.min.css`, minMap);
}

targets.forEach(compileTarget);
console.log('✔ All SCSS files compiled successfully.');
