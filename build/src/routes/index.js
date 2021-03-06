"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//routes
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const router = express_1.default.Router();
//health check
router.get("/health", (_req, res) => {
    res.sendStatus(200);
});
router.use(user_routes_1.default);
router.use(auth_routes_1.default);
exports.default = router;
