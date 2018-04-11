const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// url for public path
const publicPath = ''

// create 'absolute' paths for dist, src and data files
const pathBuild = (...paths) => path.join(__dirname, 'dist', ...paths)
const pathSrc = (...paths) => path.join(__dirname, 'src', ...paths)
const pathData = (...paths) => path.join(__dirname, 'data', ...paths)

// declare the entry point for jsx
const jsEntry = pathSrc('index.jsx')

// ==========
// INIT CONFIG
// initialise the config object
// ==========
const config = {
  // base directory of the entry
  context: pathSrc(),
  // all modules are loaded on startup, last one is exported
  entry: [require.resolve('babel-polyfill'), jsEntry],
  resolve: {
    // auto resolves these extensions, allows for leaving off ext when importing
    extensions: ['.js', '.jsx'],
    // what directories to be searched when resolving modules
    modules: [pathSrc(), pathData(), 'node_modules']
  },
  module: {rules: []},
  plugins: []
}

// ==========
// OUTPUT
// how to write compiled file to disk
// ==========
config.output = {
  // the absolute path
  path: pathBuild(),
  filename: 'assets/js/[name].js',
  // specifies the public URL address of the output files when referenced in a browser
  publicPath
}

// ==========
// HANDLE JS/JSX
// compliments babel-polyfill
// ==========
config.module.rules.push({
  test: /\.jsx?$/,
  exclude: /(node_modules|bower_components)/,
  use: ['babel-loader']
})

// ==========
// SUPPORT IMAGES
// ==========
config.module.rules.push({
  test: /\.(png|gif|jpe?g|svg)$/,
  loader: 'file-loader',
  options: {
    name: 'assets/imgs/[name].[ext]',
    publicPath: `${publicPath}/`
  }
})

// ==========
// SUPPORT FONT
// ==========
config.module.rules.push({
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: [
    {
      loader: `url-loader?limit=100000&publicPath=${publicPath}/`,
      options: {
        name: '[path][name].[ext]'
      }
    }
  ]
})

// ==========
// SUPPORT CSS
// ==========
config.module.rules.push(
  {
    test: /\.css$/,
    include: /node_modules/,
    use: ['style-loader', 'css-loader']
  }
)

// ==========
// SUPPORT JSON
// ==========
// config.module.rules.push({
//   test: /\.(json)$/,
//   use: [
//     `json-loader?publicPath=${publicPath}/`
//   ]
// })

// create global constants which can be configured at compile time
config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': '"' + process.env.NODE_ENV + '"',
    'PUBLIC_PATH': JSON.stringify(publicPath)
  }
}))

// ==========
// COPY HTML ENTRY FILE
// ==========
config.plugins.push(new HtmlWebpackPlugin({
  filename: pathBuild('index.html'),
  template: pathSrc('index.html'),
  title: 'Bike Usage Dashboard',
  siteName: 'BikeUsageDashboard',
  ogUrl: 'https://www.google.com',
  ogImage: 'http://via.placeholder.com/350x150',
  favicon: 'assets/favicon.ico',
  appMountId: 'app',
  mobile: true,
  inject: false
}))

module.exports = {
  config,
  publicPath,
  jsEntry
}
