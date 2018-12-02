const path              = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
                            template: path.resolve(__dirname, 'templates', 'index.html')
                        });
const webpackMerge      = require('webpack-merge');
const globalConfig      = require('./webpack.config.global');
const webpack           = require('webpack');

require('dotenv').config();

process.env.NODE_ENV = 'development';
const config = webpackMerge(globalConfig, {
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    devtool: "source-map",
    plugins: [
        htmlWebpackPlugin,
        new webpack.DefinePlugin({
            'SERVICE_INVOICE': JSON.stringify(process.env.SERVICE_INVOICE),
            'SERVICE_USER': JSON.stringify(process.env.SERVICE_USER),
            'SERVICE_PRODUCTS': JSON.stringify(process.env.SERVICE_PRODUCTS)
        })
    ],
    devServer: {
        contentBase: [
            path.join(__dirname, 'dist'), 
            path.join(__dirname, 'node_modules/react/umd/'),
            path.join(__dirname, 'node_modules/react-dom/umd/')
        ],
        port: process.env.PORT,
        historyApiFallback: true,
    }
});

module.exports = config;