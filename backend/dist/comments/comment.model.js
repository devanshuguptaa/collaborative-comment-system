"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const db_1 = require("../db");
class CommentModel {
    static async create(data) {
        const characterCount = data.content.length;
        const query = `
      INSERT INTO comments (content, user_id, user_name, character_count, parent_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
        const result = await db_1.pool.query(query, [
            data.content,
            data.userId,
            data.userName,
            characterCount,
            data.parentId || null,
        ]);
        return result.rows[0];
    }
    static async findAll() {
        const query = `
      SELECT * FROM comments 
      ORDER BY created_at ASC
    `;
        const result = await db_1.pool.query(query);
        return result.rows;
    }
    static async findById(id) {
        const query = 'SELECT * FROM comments WHERE id = $1';
        const result = await db_1.pool.query(query, [id]);
        return result.rows[0] || null;
    }
}
exports.CommentModel = CommentModel;
