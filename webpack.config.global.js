const webpack = require('webpack');
require('dotenv').config();

module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new webpack.DefinePlugin({
            'SERVICE_REMINDER_API': JSON.stringify(process.env.SERVICE_REMINDER_API)
        })
    ]
}
