"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const db = async () => {
    try {
        await mongoose_1.default.connect(config_1.MONGO_URI);
        console.log("database connected! ");
    }
    catch (error) {
        console.log(error);
    }
};
exports.db = db;
