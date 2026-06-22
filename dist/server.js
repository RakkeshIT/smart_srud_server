"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const add_1 = __importDefault(require("./api/add"));
const syllabus_1 = __importDefault(require("./api/syllabus"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const ALLOW_ORIGIN = [
    process.env.CLIENT_URL,
    process.env.CLIENT_URL_PROD,
];
app.use((0, cors_1.default)({
    origin: ALLOW_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json());
// app.options(/.*/, cors());
(0, db_1.connect)();
app.use('/api', add_1.default);
app.use('/api', syllabus_1.default);
app.get('/', (req, res) => {
    res.send('server running');
});
// 404 handler LAST
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});
const isVercel = process.env.VERCEL === "1";
if (!isVercel) {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server running", process.env.PORT);
    });
}
exports.default = app;
