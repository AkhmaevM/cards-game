const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    mode: isProduction ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    module: {
        rules: [
            { test: /\.css$/, use: [MiniCssExtractPlugin, 'css-loader'] },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'assets/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'assets/resource',
            },
        ],
    },
    optimization: {
        minimizer: ['...', new CssMinimizerPlugin()],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './index.html',
        }),
        new CopyPlugin({
            patterns: [{ from: 'static', to: 'static' }],
        }),
        new MiniCssExtractPlugin(),
    ],
    devtool: isProduction ? 'hidden-source-map' : 'source-map',
}
