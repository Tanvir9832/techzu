"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = __importDefault(require("./user.route"));
const comment_route_1 = __importDefault(require("./comment.route"));
const reaction_route_1 = __importDefault(require("./reaction.route"));
const reply_route_1 = __importDefault(require("./reply.route"));
const routes = {
    '/auth': user_route_1.default,
    '/comments': comment_route_1.default,
    '/reactions': reaction_route_1.default,
    '/replies': reply_route_1.default
};
exports.default = routes;
