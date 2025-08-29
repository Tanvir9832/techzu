"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const users_model_1 = require("../models/users.model");
exports.UserRepository = {
    findByEmail: (email) => users_model_1.User.findOne({ email: email.toLowerCase() }),
    findById: (id) => users_model_1.User.findById(id),
    create: (data) => users_model_1.User.create(data),
    save: (user) => user.save(),
};
