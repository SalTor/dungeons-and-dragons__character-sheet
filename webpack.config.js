module.exports = {
    entry: './development/js/dungeons_and_dragons_character_sheet.js',
    output: {
        path: __dirname + '/public/build/js',
        publicPath: '/public/build/js',
        filename: 'd_and_d__bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(svg|jpg|png)$/,
                loader: 'url'
            },
            {
                test: /\.scss/,
                loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.css/,
                loaders: [ 'style-loader', 'css-loader' ]
            }
        ]
    }
}