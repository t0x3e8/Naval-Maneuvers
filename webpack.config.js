// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

const isProduction = process.env.NODE_ENV === 'production'

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader'

const config = {
  entry: './src/client/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    clean: true
  },
  devServer: {
    open: true,
    host: 'localhost'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      '...',
      new CssMinimizerPlugin()
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      /* true: 'Options API', false: 'Composition API'.
      Despite the fact that the Composition API is used in the app,
      third-party components like vue-inline-svg use the Options API. */
      __VUE_OPTIONS_API__: JSON.stringify(true),
      /* false for production */
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
    }),
    new HtmlWebpackPlugin({
      template: 'src/client/index.html'
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/client/assets/graphics/pawns'),
          to: path.resolve(__dirname, 'dist/assets/pawns')
        },
        {
          from: path.resolve(__dirname, 'src/client/assets/graphics/favicon.ico'),
          to: path.resolve(__dirname, 'dist/assets/favicon.ico')
        }
      ]
    })
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            reactivityTransform: true
          }
        }
      },
      {
        test: /\.(js|jsx)$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset'
      },
      {
        test: /\.(ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]' // Output the file with its original name and extension
        }
      }
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  }
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'

    config.plugins.push(new MiniCssExtractPlugin())
  } else {
    config.mode = 'development'
  }
  return config
}
