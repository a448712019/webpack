const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_[chunkhash:8].js'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    "css-loader",
                    "less-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')({
                                        overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                                    })
                                ]
                            }
                            
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/src/index.html'),
            filename: 'index.html',
            inject: true,
        }),
        // new FriendlyErrorsWebpackPlugin(),
        // function() {
        //     this.hooks.done.tap('done', (stats) => {
        //         if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1)
        //         {
        //             console.log('build error');
        //             process.exit(1);
        //         }
        //     })
        // } 
    ],
    // stats: 'errors-only',
    // target: 'web',
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     hot: true
    // },
}