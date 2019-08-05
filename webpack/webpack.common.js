const Path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    index: Path.resolve(__dirname, '../src/scripts/index.js'),
    demo: Path.resolve(__dirname, '../src/scripts/demo.js'),
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: Path.resolve(__dirname, '..'),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Popper: 'popper.js',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'demo.html',
      template: './src/demo.html',
      inject: true,
      chunks: ['demo'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'img',
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.(js)$/,
        include: Path.resolve(__dirname, '../src'),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // extracts css into separate files
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src'],
          },
        },
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
