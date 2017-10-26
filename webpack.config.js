/**
 * Created by chenlin on 2017/10/19.
 */
const path = require('path');
const webpack = require('webpack');
module.exports = {
    devtool:false,
    entry:{
        index:path.join(__dirname,"src/index.js")
    },
	output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'[name].js',
		library:"cross-jsonp",
        libraryTarget:'umd'
    },
    module: {
        rules: [
        	{
            test: /\.js$/,
            exclude: path.resolve(__dirname, "node_modules"),
            use: {
                loader: 'babel-loader'
            },
        },
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true,
                drop_debugger : true,
                drop_console: true,
            },
            output: {
                comments: false,
            },
        }),
    ]
}
