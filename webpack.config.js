'use strict';

const webpack = require('webpack')
const BabiliPlugin = require('babel-preset-minify')

const production = process.env.NODE_ENV === 'production'

const config = {
    plugins: [],
    resolve: {}
}

if(production) {
    config.plugins = [
        new BabiliPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('"production"')
            }
        })
    ]
    config.resolve = {
        alias: {
            vue: 'vue/dist/vue.min.js'
        }
    }
}

module.exports = {
    entry: './source/js/dungeons_and_dragons_character_sheet.js',
    output: {
        filename: 'd_and_d__bundle.js',
        path: __dirname + '/public/build/js',
        publicPath: 'build/js'
    },
    devServer: {
        contentBase: './public'
    },
    devtool: production ? 'source-map' : 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'vue-loader' }
                ]
            },
            {
                test: /\.(svg|jpg|png)$/,
                loader: 'url'
            },
            {
                test: /\.scss/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ]
                            }
                        }
                    },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.css/,
                loaders: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: config.plugins,
    resolve: config.resolve
}
