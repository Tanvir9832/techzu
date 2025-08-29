"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRoutes = applicationRoutes;
const routes_1 = __importDefault(require("./routes"));
function applicationRoutes(app) {
    for (const uri in routes_1.default) {
        if (Object.prototype.hasOwnProperty.call(routes_1.default, uri)) {
            app.use(uri, routes_1.default[uri]);
        }
    }
}
