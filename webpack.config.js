import path from 'path';
import htmlWebpackPlugin from 'html-webpack-plugin';
import uglifyJsPlugin from 'uglifyjs-webpack-plugin';
import cleanWebpackPlugin from 'clean-webpack-plugin';

module.exports = {
    entry: {
        app: path.join(__dirname, 'src', 'index.js'),
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    mode: 'development',
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true
    },
    optimization: {
        minimize: true,
        minimizer: [new uglifyJsPlugin({
            sourceMap: true,
            cache: true,
            parallel: true,
            uglifyOptions: {
                ecma: 6,
                mangle: true,
                compress: {
                    inline: false
                }
            }
        })],
        runtimeChunk: false,
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gid|mp3|svg)$/,
                loaders: ['file-loader']
            }
        ]
    },
    plugins: [
        new cleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        })
    ]
};