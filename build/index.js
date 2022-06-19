"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const database_1 = __importDefault(require("./src/database"));
// Router
const index_1 = __importDefault(require("./src/routes/index"));
const app = (0, express_1.default)();
const port = config_1.default.get("port");
const clientUrl = config_1.default.get("client_url");
app.use(index_1.default);
app.use((0, cors_1.default)({ credentials: true, origin: clientUrl }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.default)();
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on port ${port}`);
        });
    });
}
main();
