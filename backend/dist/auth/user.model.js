"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const db_1 = require("../db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserModel {
    static async create(data) {
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `;
        const result = await db_1.pool.query(query, [data.name, data.email, hashedPassword]);
        return result.rows[0];
    }
    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await db_1.pool.query(query, [email]);
        return result.rows[0] || null;
    }
    static async findById(id) {
        const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1';
        const result = await db_1.pool.query(query, [id]);
        return result.rows[0] || null;
    }
    static async comparePassword(password, hashedPassword) {
        return bcryptjs_1.default.compare(password, hashedPassword);
    }
}
exports.UserModel = UserModel;
