const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
    entry: {
        "home": "./static/index.js",
        "hello": "./static/hello.js"
    },
    output: {
        path: path.join(__dirname, "./wwwroot/static/dist"),
        filename: "[name]-bundle.js"
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['./wwwroot/static/dist']),
        new HtmlWebpackPlugin({
            template: "./static/index.html",
            filename: "../../../Views/Home/home.cshtml",
            chunks: ['commons', 'home']
        }),
        new HtmlWebpackPlugin({
            template: "./static/hello.html",
            filename: "hello.cshtml",
            chunks: ['commons', "hello"]
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 创建一个 commons 块，用于包含所有入口模块共用的代码
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
}