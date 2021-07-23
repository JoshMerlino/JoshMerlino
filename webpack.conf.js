"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(require("path"));
const webpack_1 = require("webpack");
const offline_plugin_1 = __importDefault(require("offline-plugin"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const webpack_pwa_manifest_1 = __importDefault(require("webpack-pwa-manifest"));
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const clean_webpack_plugin_1 = require("clean-webpack-plugin");
const manifest_1 = __importDefault(require("./web/manifest"));
module.exports = {
    entry: ["@babel/polyfill", "./web/__compile_cache/ts/index.js"],
    output: {
        path: path_1.default.resolve("public_html/"),
        filename: "app/[name].[contenthash].js"
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        compact: true,
                        presets: ["@babel/preset-react", "@babel/preset-env"],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            }, {
                test: /\.css/i,
                use: [{
                        loader: mini_css_extract_plugin_1.default.loader,
                        options: {
                            publicPath: "../"
                        }
                    },
                    "css-loader"
                ]
            }, {
                test: /\.less/i,
                use: [{
                        loader: mini_css_extract_plugin_1.default.loader,
                        options: {
                            publicPath: "../"
                        }
                    },
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                rewriteUrls: "local"
                            }
                        }
                    }]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                        loader: "file-loader",
                        options: {
                            name: "static/[contenthash].[ext]"
                        }
                    }]
            }, {
                include: path_1.default.resolve("web/static"),
                use: [{
                        loader: "file-loader",
                        options: {
                            name: "static/[contenthash].[ext]"
                        }
                    }]
            }, {
                test: /\.(txt|md|pem|raw)$/,
                use: ["raw-loader"]
            }]
    },
    plugins: [
        new clean_webpack_plugin_1.CleanWebpackPlugin,
        new html_webpack_plugin_1.default({
            template: "web/index.html",
            favicon: "web/static/icon.png",
            base: "/",
            templateParameters: {
                title: manifest_1.default.name,
                description: manifest_1.default.description
            }
        }),
        new mini_css_extract_plugin_1.default({
            filename: "app/[name].[contenthash].css"
        }),
        new webpack_pwa_manifest_1.default({
            filename: "manifest.json",
            ...manifest_1.default
        }),
        new copy_webpack_plugin_1.default({
            patterns: [{
                    from: "web/robots.txt", to: "."
                }]
        }),
        new webpack_1.DefinePlugin({
            APP_MANIFEST: JSON.stringify(manifest_1.default)
        }),
        new offline_plugin_1.default
    ],
    resolve: {
        extensions: [".js"],
        roots: [
            path_1.default.resolve("./"),
            path_1.default.resolve("./node_modules"),
            path_1.default.resolve("./web/__compile_cache/ts")
        ],
        alias: {
            "static": path_1.default.resolve("./web/static"),
            "views": path_1.default.resolve("./web/__compile_cache/ts/views"),
            "components": path_1.default.resolve("./web/__compile_cache/ts/components")
        }
    }
};
//# sourceMappingURL=webpack.conf.js.map