"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const packageJSON = require(path_1.default.resolve("package.json"));
exports.default = {
    name: packageJSON["display-name"] || packageJSON.name,
    short_name: packageJSON["display-name"] || packageJSON.name,
    version: packageJSON.version,
    description: packageJSON.description,
    developerName: packageJSON.author,
    developerURL: "https://joshmerlino.github.io",
    background_color: "#ffffff",
    theme_color: "#18191c",
    orientation: "portrait",
    crossorigin: "use-credentials",
    icons: [{
            src: "web/static/icon.png",
            sizes: [96, 128, 192, 256, 384, 512],
            purpose: "maskable",
            destination: "static/"
        }, {
            src: "web/static/icon.png",
            sizes: [96, 128, 192, 256, 384, 512],
            destination: "static/"
        }]
};
//# sourceMappingURL=manifest.js.map