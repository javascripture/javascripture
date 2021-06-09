/**
 * External dependencies
 */
var webpack = require( 'webpack' ),
	autoprefixer = require( 'autoprefixer' ),
	NODE_ENV = process.env.NODE_ENV || 'development',
	path = require( 'path' );

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
	mode: NODE_ENV,
	entry: {
		'bundle' : [
			'./src'
		]
	},

	output: {
		path: path.join( __dirname, 'build' ),
		publicPath: '/build/',
		filename: '[name].js',
		devtoolModuleFilenameTemplate: 'app:///[resource-path]'
	},

	module: {
		rules: [
			{
				test:   /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				include: path.join( __dirname, '/src' )
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							modules: {
								exportLocalsConvention: "camelCase",
								localIdentName: '[path][local]',
							},
							importLoaders: 1,
							sourceMap: true
						}
					},
					'postcss-loader',
					{
						loader: 'sass-loader?sourceMap',
						options: {
							sourceMap: true,
						}
					}
				]
			}
		],
	},
	resolve: {
		extensions: [ '.json', '.js', '.jsx' ]
	},
	node: {
		global: true,
		__filename: 'mock',
		__dirname: 'mock',
	},
	plugins: [
		new webpack.DefinePlugin( {
			'process.env': {
				NODE_ENV: JSON.stringify( NODE_ENV ),
				BROWSER: JSON.stringify( true )
			}
		} ),
	]
};

if ( process.env.NODE_ENV !== 'production' ) {
	// Switches loaders to debug mode. This is required to make CSS hot reloading works correctly (see
	// http://bit.ly/1VTOHrK for more information).
	//config.debug = true;

	// Enables source maps
	config.devtool = 'source-map';

	config.devServer = {
		hot: true,
		port: 7777,
		historyApiFallback: true
	};

	/*config.module.rules.unshift( {
		test:   /\.jsx?$/,
		loader: 'react-hot-loader/webpack',
		include: path.join( __dirname, '/src' ),
		exclude: /node_modules/,
	} );*/
}

module.exports = config;
