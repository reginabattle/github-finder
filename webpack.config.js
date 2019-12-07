const path = require('path')

module.exports = {
    entry: ["babel-polyfill", './js/app.js'],
    output: {
        filename: 'main.js',
        publicPath: "/build/",
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    }
}