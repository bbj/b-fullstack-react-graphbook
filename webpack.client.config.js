//see https://webpack.js.org/concepts/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const buildDirectory = 'dist';
const outputDirectory = buildDirectory + '/client';
module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname,
        buildDirectory)]
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};

/**
- HtmlWebpackPlugin: This automatically generates an HTML file that includes all the webpack bundles. We pass our previously created index.html as a template.
- CleanWebpackPlugin: This empties all of the provided directories to clean the old build files. The cleanOnceBeforeBuildPatterns property specifies an array of folders that are cleaned before the build process is started.
- The entry field tells webpack where the starting point of our application is. This file needs to be created by us.
- The output object specifies how our bundle is called and where it should be saved. For us, this is dist/client/bundle.js.
- Inside module.rules, we match our file extensions with the correct loaders. All the JavaScript files (except those located in node_modules) are transpiled by Babel as specified by babel-loader so that we can use ES6 features inside our code. Our CSS gets processed by style-loader and css-loader. There are many more loaders for JavaScript, CSS, and other file extensions available.
- The devServer feature of webpack enables us to run the React code directly. This includes hot reloading code in the browser without rerunning a build or refreshing the browser tab.
*/