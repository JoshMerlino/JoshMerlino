"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_merge_1 = __importDefault(require("webpack-merge"));
const webpack_1 = require("webpack");
const terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
const optimize_css_assets_webpack_plugin_1 = __importDefault(require("optimize-css-assets-webpack-plugin"));
const webpack_conf_1 = __importDefault(require("./webpack.conf"));
module.exports = webpack_merge_1.default(webpack_conf_1.default, {
    mode: "production",
    optimization: {
        namedModules: false,
        namedChunks: false,
        nodeEnv: "production",
        flagIncludedChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        usedExports: true,
        concatenateModules: true,
        splitChunks: {
            chunks: "all",
            maxSize: 0,
            minChunks: 1,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "lib",
                    enforce: true,
                    chunks: "all"
                }
            }
        },
        noEmitOnErrors: true,
        checkWasmTypes: true,
        minimize: true,
        minimizer: [
            new terser_webpack_plugin_1.default({}),
            new optimize_css_assets_webpack_plugin_1.default({})
        ],
        runtimeChunk: {
            name: "runtime"
        }
    },
    plugins: [
        new webpack_1.DefinePlugin({ PRODUCTION: JSON.stringify(true) })
    ]
});
//# sourceMappingURL=webpack.prod.js.map