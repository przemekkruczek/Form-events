module.exports = {
    entry: './src/js/app.jsx',
    output: {
        path: `${__dirname}/dist/js`,
        filename: 'script.min.js'
    },
    devServer: {
        historyApiFallback: true,
    },
    watch: true,
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2015", "stage-2", "react"]
                    }
                }
            },{
            // Preprocess our own .css files
            // This is the place to add your own loaders (e.g. sass/less etc.)
            // for a list of loaders, see https://webpack.js.org/loaders/#styling
            test: /\.css$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader'],
        },
            {
                // Preprocess 3rd party .css files located in node_modules
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },]
    }
}
