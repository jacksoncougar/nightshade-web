/* === dont forget to import scss to main.js file === */
/* ===> import './main.scss'; <=== */

var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const PUBLIC_PATH = 'https://nightshade-74ece.firebaseapp.com/';

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    entry: {
        index: "./src/index.js",
        sw: "./src/sw.js",
        worker: "./src/worker.js"
    },
    devtool: 'inline-source-map',
    output: { 
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: "/dist"
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new SWPrecacheWebpackPlugin(
            {
              cacheId: 'my-project-name',
              dontCacheBustUrlsMatching: /\.\w{8}\./,
              filename: 'service-worker.js',
              minify: true,
              navigateFallback: PUBLIC_PATH + 'index.html',
              staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
            })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ["env"] }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    }
}; 