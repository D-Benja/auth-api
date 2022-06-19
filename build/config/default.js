"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
exports.default = {
    port: process.env.PORT || 8080,
    client_url: process.env.CLIENT_URL,
    db_url: process.env.DB_URL,
};
