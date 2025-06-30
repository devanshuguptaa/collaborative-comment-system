"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const session_1 = __importDefault(require("./session"));
const routes_1 = __importDefault(require("./auth/routes"));
const routes_2 = __importDefault(require("./comments/routes"));
const http_1 = require("http");
const ws_1 = require("./ws");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(session_1.default);
app.use((req, res, next) => {
    console.log('Session:', req.session);
    next();
});
app.use('/auth', routes_1.default);
app.use('/comments', routes_2.default);
(0, ws_1.setupWebSocket)(httpServer);
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
