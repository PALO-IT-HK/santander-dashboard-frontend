const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const publicPath = '/my-app'
const pathBuild = (...paths) => path.join(__dirname, 'dist', ...paths)
const pathSrc = (...paths) => path.join(__dirname, 'src', ...paths)
const pathData = (...paths) => path.join(__dirname, 'data', ...paths)

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
// const cssModuleScopedName = '[path]_[name]_[local]'
const jsEntry = pathSrc('index.jsx')

const nodeEnv = process.env.NODE_ENV

// init config
const config = {
  context: pathSrc(),
  entry: [require.resolve('babel-polyfill'), jsEntry],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [pathSrc(), pathData(), 'node_modules']
  },
  module: {rules: []},
  plugins: []
}

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'uat') {
  config.entry.splice(1, 0, 'react-hot-loader/patch')
}

// ----------------------------------------------------------
// output
config.output = {
  path: pathBuild(),
  filename: 'assets/js/[name].js',
  publicPath
}

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'uat') {
  config.output.sourceMapFilename = 'assets/js/[name].map'
} else {
  config.output.filename = 'assets/js/[name].[chunkhash].js'
}

// ----------------------------------------------------------
// dev server
config.devServer = {
  port: 3000,
  host: '0.0.0.0',
  compress: true,
  disableHostCheck: true,
  historyApiFallback: {
    index: `${publicPath}/index.html`
  }
}

// Choose a style of source mapping to enhance the debugging process. These values can affect build and rebuild speed dramatically.
if (nodeEnv !== 'production') {
  config.devtool = 'eval'
} else {
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  config.devtool = shouldUseSourceMap ? 'source-map' : false
}

// ----------------------------------------------------------
// rules
// handle js/jsx
config.module.rules.push({
  test: /\.jsx?$/,
  exclude: /(node_modules|bower_components)/,
  use: ['babel-loader']
})

// add rule to support images
config.module.rules.push({
  test: /\.(png|gif|jpe?g|svg)$/,
  loader: 'file-loader',
  options: {
    name: 'assets/imgs/[name].[ext]',
    publicPath: `${publicPath}/`
  }
})

// css extraction
if (nodeEnv === 'production') {
  config.module.rules.push({
    test: /\.css$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
          }
        }
      ]
    })
  })
} else {
  config.module.rules.push({
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  })
}

config.module.rules.push(
  {
    test: /\.css$/,
    include: /node_modules/,
    use: ['style-loader', 'css-loader']
  }
)

// add rule to support font
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

// add rule to support json
config.module.rules.push({
  test: /\.(json)$/,
  use: [
    `json-loader?publicPath=${publicPath}/`
  ]
})

// ----------------------------------------------------------
// plugins
// show named module of hot reload
config.plugins.push(new webpack.NamedModulesPlugin())

config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': '"' + process.env.NODE_ENV + '"',
    'PUBLIC_PATH': JSON.stringify(publicPath)
  }
}))

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new ExtractTextPlugin({ filename: 'app.[chunkhash].css', allChunks: true }))
  config.plugins.push(
    // Minify the code. (From react-script config)
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false
      },
      mangle: {
        safari10: true
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true
      },
      sourceMap: shouldUseSourceMap
    })
  )
}

// copy HTML entry file
config.plugins.push(new HtmlWebpackPlugin({
  filename: pathBuild('index.html'),
  template: pathSrc('index.html'),
  title: 'My React/Redux App',
  siteName: 'My App',
  ogUrl: 'https://www.google.com',
  ogImage: 'http://via.placeholder.com/350x150',
  favicon: 'assets/favicon.ico',
  appMountId: 'app',
  mobile: true,
  inject: false,
}))

// copy data folder
// config.plugins.push(new CopyWebpackPlugin([{
//   from: pathSrc('..', 'data'),
//   to: pathBuild('data')
// }]))

// Standard JS
if (nodeEnv !== 'production') {
  config.module.rules.push({
    test: /\.jsx?$/,
    use: ['standard-loader'],
    exclude: /(node_modules|bower_components|ext_libs)/,
    enforce: 'pre'
  })
}

module.exports = config
