const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEV_MODE = process.env.NODE_ENV === 'dev';

module.exports = {
    devtool: DEV_MODE ? 'eval' : 'source-map',
    entry: {
        vendor: ["react"],
        index: './src/index.ts'
    },
    context: path.resolve(__dirname),
    optimization: {
        namedModules: true,
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            DEV_MODE
                ? {
                    test: /\.scss/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
                : {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
                },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'src/index.html'
        }),
        new ExtractTextPlugin('styles.css')
    ]
};
