"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const validateResources_1 = __importDefault(require("../middleware/validateResources"));
const user_schema_1 = require("../schemas/user.schema");
const router = express_1.default.Router();
router.post("/", (0, validateResources_1.default)(user_schema_1.CreateUserSchema), user_controller_1.CreateUserHandler);
exports.default = router;
