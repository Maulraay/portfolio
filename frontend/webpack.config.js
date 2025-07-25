const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Récupérer NODE_ENV (development ou production)
const mode = process.env.NODE_ENV || 'development';

// Charger le bon .env.* automatiquement
const envPath = mode === "development" ? '.env' : `.env.production`;
const env = dotenv.config({ path: path.resolve(__dirname, envPath) }).parsed || {};

// Convertir pour DefinePlugin
const envKeys = Object.keys(env).reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(env[key]);
  return acc;
}, {});

/*We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve.
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/

module.exports={
  /** "mode"
   * the environment - development, production, none. tells webpack
   * to use its built-in optimizations accordingly. default is production
   */
  mode,
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  /** "entry"
   * the entry point
   */
  entry: "./src/index.js",
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  devtool: mode === 'development' ? 'eval-source-map' : 'source-map',
  /** "target"
   * setting "node" as target app (server side), and setting it as "web" is
   * for browser (client side). Default is "web"
   */
  target: "web",
  devServer: {
    /** "port"
     * port of dev server
     */
    port: "9500",
    /** "static"
     * This property tells Webpack what static file it should serve
     */
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    compress: true,
    /** "open"
     * opens the browser after server is successfully started
     */
    open: true,
    /** "hot"
     * enabling and disabling HMR. takes "true", "false" and "only".
     * "only" is used if enable Hot Module Replacement without page
     * refresh as a fallback in case of build failures
     */
    hot: true ,
    /** "liveReload"
     * disable live reload on the browser. "hot" must be set to false for this to work
     */
    liveReload: true,
    historyApiFallback: true,
  },
  resolve: {
    /** "extensions"
     * If multiple files share the same name but have different extensions, webpack will
     * resolve the one with the extension listed first in the array and skip the rest.
     * This is what enables users to leave off the extension when importing
     */
    extensions: ['.js','.jsx','.json']
  },
  module:{
    /** "rules"
     * This says - "Hey webpack compiler, when you come across a path that resolves to a '.js or .jsx'
     * file inside of a require()/import statement, use the babel-loader to transform it before you
     * add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from
     * being searched"
     */
    rules: [
      {
        test: /\.(js|jsx)$/,    //kind of file extension this rule should look for and apply in test
        exclude: /node_modules/, //folder to be excluded
        use:  'babel-loader' //loader which we are going to use
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      },
      { test: /\.css$/,
        use: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(woff2?|ttf|otf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]', // output dans /dist/fonts
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin(envKeys),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
          globOptions: {
            ignore: ['**/index.html']
          },
        },
      ],
    }),
    ...(mode === 'production'
      ? [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })]
      : []),
  ],
}
