const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const PRODUCTION = false;

module.exports = {
    entry: './scripts/pong.js',
    output: {
        path: path.resolve(__dirname, '../../server/public'),
        filename: 'scripts/bundle.js'
    },
    mode: (PRODUCTION ? 'production' : 'development'),
    devtool: (PRODUCTION ? undefined : 'eval-source-map'),

    devServer: {
        static: {
            publicPath: path.resolve(__dirname, 'dist'),
            watch: true
        },
        host: 'localhost',
        port: 9000,
        open: true
    },

    externals: {
        react: 'React',
        reactdom: 'ReactDom',
    },

    module: {
        rules: [

            {
                test: /\.(m?js*)/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },


            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif)/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images'
                    }
                }
            }
        ]
    },





    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "./index.html"
        }),
        new CopyPlugin({
            patterns: [{
                    from: './*.html',
                    to: 'html/[name].html'
                },
                {
                    from: 'images/*',
                    to: 'images/[name][ext]'
                },
                {
                    from: './style/*',
                    to: 'style/[name][ext]'
                },
            ]
        })
    ]


};