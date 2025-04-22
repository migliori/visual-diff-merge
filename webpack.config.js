const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');
const fs = require('fs');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// Custom plugin to clean up temp files and prevent generating unwanted JS files
class CleanupTempFilesPlugin {
  constructor(options = {}) {
    this.options = {
      tmpDir: options.tmpDir || 'dist/css/.tmp',
      verbose: options.verbose !== false
    };
  }

  apply(compiler) {
    // Create the temp directory before it's needed
    compiler.hooks.beforeRun.tap('CleanupTempFilesPlugin', () => {
      const tmpDir = path.resolve(compiler.context, this.options.tmpDir);
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
    });

    // Use watchRun hook for --watch mode
    compiler.hooks.watchRun.tap('CleanupTempFilesPlugin', () => {
      const tmpDir = path.resolve(compiler.context, this.options.tmpDir);
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
    });

    // Clean up temp files after assets are emitted
    compiler.hooks.afterEmit.tap('CleanupTempFilesPlugin', (compilation) => {
      const tmpDir = path.resolve(compiler.context, this.options.tmpDir);
      if (fs.existsSync(tmpDir)) {
        const files = glob.sync(`${tmpDir}/**/*`);
        files.forEach(file => {
          if (fs.statSync(file).isFile()) {
            try {
              fs.unlinkSync(file);
              if (this.options.verbose) {
                console.log(`Cleaned up temp file: ${path.relative(compiler.context, file)}`);
              }
            } catch (err) {
              console.error(`Failed to delete temp file: ${err.message}`);
            }
          }
        });
      }
    });
  }
}

// Define JS entries and CSS entries
const jsEntries = {
  'diff-viewer': './src/index.js',
  'file-browser': './src/file-browser.js',
  'file-upload': './src/file-upload.js',
  'url-compare': './src/url-compare.js',
  'text-compare': './src/text-compare.js'
};

const cssEntries = {
  'diff-viewer': './src/scss/main.scss',
  'diff-viewer-theme': './src/scss/theme.scss'
};

// Main webpack configuration
module.exports = (env, argv) => {
  const mode = argv.mode || 'development';
  const isDevelopment = mode === 'development';
  const isAnalyze = env && env.analyze === 'true';

  console.log(`Running webpack in ${mode} mode`);
  if (isAnalyze) {
    console.log('Bundle analysis enabled');
  }

  const configs = [];

  // Add JS configurations
  Object.entries(jsEntries).forEach(([name, entry]) => {
    // Regular JS
    const jsConfig = {
      name: `${name}-js`,
      mode,
      entry: { [name]: entry },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: {
          type: 'umd',
          export: 'default'
        },
        globalObject: 'this'
      },
      resolve: {
        extensions: ['.js', '.json'],
        alias: {
          '@src': path.resolve(__dirname, 'src/'),
          '@constants': path.resolve(__dirname, 'src/constants/')
        }
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: { presets: ['@babel/preset-env'] }
            }
          }
        ]
      },
      optimization: {
        minimize: false,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 250000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true
            }
          }
        }
      },
      devtool: 'source-map',
      plugins: []
    };

    // Add bundle analyzer only to the first config when analyze flag is set
    if (isAnalyze && name === 'diff-viewer') {
      jsConfig.plugins.push(new BundleAnalyzerPlugin({
        analyzerPort: 8889, // Use a different port to avoid conflicts
        openAnalyzer: true
      }));
    }

    configs.push(jsConfig);

    // Minified JS
    configs.push({
      name: `${name}-js-min`,
      mode,
      entry: { [`${name}.min`]: entry },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: {
          type: 'umd',
          export: 'default'
        },
        globalObject: 'this'
      },
      resolve: {
        extensions: ['.js', '.json'],
        alias: {
          '@src': path.resolve(__dirname, 'src/'),
          '@constants': path.resolve(__dirname, 'src/constants/')
        }
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: { presets: ['@babel/preset-env'] }
            }
          }
        ]
      },
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: false,
            terserOptions: {
              format: { comments: false },
              compress: {
                drop_console: false // Prevent dropping console logs
              }
            }
          })
        ]
      },
      devtool: 'source-map'
    });
  });

  // CSS configurations - only for dist/css now
  Object.entries(cssEntries).forEach(([name, entry]) => {
    // Regular CSS
    configs.push({
      name: `${name}-css`,
      mode,
      devtool: 'source-map',
      entry: { [name]: entry },
      output: {
        path: path.resolve(__dirname, 'dist/css'),
        filename: '.tmp/[name].js',
        devtoolModuleFilenameTemplate: (info) => {
          return `webpack://diff-files/${path.relative(__dirname, info.absoluteResourcePath).replace(/\\/g, '/')}`;
        }
      },
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  postcssOptions: {
                    config: path.resolve(__dirname, 'postcss.config.js')
                  }
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  implementation: require('sass'),
                  sassOptions: {
                    outputStyle: 'expanded',
                    sourceMapContents: true
                  }
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css'
        }),
        new CleanupTempFilesPlugin({
          tmpDir: 'dist/css/.tmp',
          verbose: false
        })
      ],
      optimization: {
        minimize: false
      }
    });

    // Minified CSS
    configs.push({
      name: `${name}-css-min`,
      mode,
      devtool: 'source-map',
      entry: { [`${name}.min`]: entry },
      output: {
        path: path.resolve(__dirname, 'dist/css'),
        filename: '.tmp/[name].js',
        devtoolModuleFilenameTemplate: (info) => {
          return `webpack://diff-files/${path.relative(__dirname, info.absoluteResourcePath).replace(/\\/g, '/')}`;
        }
      },
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  postcssOptions: {
                    config: path.resolve(__dirname, 'postcss.config.js')
                  }
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  implementation: require('sass'),
                  sassOptions: {
                    outputStyle: 'expanded',
                    sourceMapContents: true
                  }
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css'
        }),
        new CleanupTempFilesPlugin({
          tmpDir: 'dist/css/.tmp',
          verbose: false
        })
      ],
      optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin({
            minimizerOptions: {
              preset: ['default', {
                discardComments: { removeAll: true }
              }]
            }
          })
        ]
      }
    });
  });

  // Add debug logging in development mode
  if (isDevelopment && configs.length > 0 && configs[0].plugins) {
    configs[0].plugins.push({
      apply: (compiler) => {
        compiler.hooks.done.tap('ReportFiles', (stats) => {
          console.log('\nGenerated files:');

          // Regular CSS files
          const cssFiles = glob.sync(path.resolve(__dirname, 'dist/css/*.css'))
            .filter(file => !file.includes('.map'));
          if (cssFiles.length > 0) {
            console.log('\nCSS:');
            cssFiles.forEach(file => {
              console.log(`- ${path.relative(__dirname, file)}`);
            });
          }

          // Sourcemap files
          const mapFiles = glob.sync(path.resolve(__dirname, 'dist/css/*.map'));
          if (mapFiles.length > 0) {
            console.log('\nSourcemaps:');
            mapFiles.forEach(file => {
              console.log(`- ${path.relative(__dirname, file)}`);
            });
          }
        });
      }
    });
  }

  return configs;
}
