/*
Здравствуйте, надеюсь вы прочитали readmi  =)
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const optimization = () => ({
  minimizer: isDev ? [] : [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  splitChunks: {
    chunks: 'all',
  },
});
const cssLoaders = (scss) => {
  const def = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    'css-loader',
    'postcss-loader',
  ];
  if (scss) {
    def.push('sass-loader');
  }

  return def;
};

module.exports = {
  context: path.resolve(__dirname, 'static'),
  entry: ['@babel/polyfill', './yara.ts'],
  output: {
    filename: '[name].[contentHash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  devtool: isDev ? 'source-map' : '',
  optimization: optimization(),
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'static/[name].[contentHash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'icon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'static/images/smile.png'),
          to: path.resolve(__dirname, 'dist/static'),
        },
        {
          from: path.resolve(__dirname, 'static/images/send.png'),
          to: path.resolve(__dirname, 'dist/static'),
        },
        {
          from: path.resolve(__dirname, 'static/images/background.jpg'),
          to: path.resolve(__dirname, 'dist/static'),
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders(true),
      },
      {
        test: /.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
              plugins: ['transform-class-properties'],
            },
          },
          'ts-loader',
        ],
      },
    ],
  },
};
