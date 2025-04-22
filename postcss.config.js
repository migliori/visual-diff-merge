/**
 * Main PostCSS configuration file used by webpack's postcss-loader
 *
 * We use PostCSS with all its features (including PurgeCSS) only for webpack builds,
 * not for example files which use a simpler minification setup.
 */

module.exports = {
  plugins: [
    require('autoprefixer')(),
    require('postcss-preset-env')({
      browsers: 'last 2 versions',
      stage: 3,
      features: { 'nesting-rules': true }
    }),
    require('@fullhuman/postcss-purgecss').default({
      content: ['./src/**/*.js', './diff-viewer/**/*.html', './diff-viewer/**/*.php'],
      safelist: {
        standard: [/vdm-theme/, /hljs/, /dragging/, /opened/, /selected/, /active/],
        deep: [/vdm-alert/, /vdm-modal/, /vdm-icon/, /vdm-code/, /vdm-diff/, /vdm-badge/],
        greedy: [/vdm-diff__chunk/, /vdm-alert/, /vdm-btn/]
      }
    }),
    require('cssnano')()
  ]
};
