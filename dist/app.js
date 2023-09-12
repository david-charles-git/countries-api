"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const countries_1 = __importDefault(require("./routes/countries"));
const mongoDB_1 = __importDefault(require("./lib/configurations/mongoDB"));
dotenv_1.default.config({ path: './.env.local' });
(0, mongoDB_1.default)();
const app = (0, express_1.default)();
const port = Number(process.env.PORT);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/countries', countries_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
