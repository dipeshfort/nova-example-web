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
    entry: ['./src/main.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    plugins: [
        htmlWebpackPlugin,
        new webpack.DefinePlugin({
            'SERVICE_REMINDER_API': JSON.stringify(process.env.SERVICE_REMINDER_API)
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3001,
        historyApiFallback: true
    }
});

module.exports = config;