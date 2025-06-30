import { pool } from '../db'
import bcrypt from 'bcryptjs'

export interface User {
  id: string
  name: string
  email: string
  password: string
  created_at: Date
}

export interface CreateUserData {
  name: string
  email: string
  password: string
}

export class UserModel {
  static async create(data: CreateUserData): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `
    
    const result = await pool.query(query, [data.name, data.email, hashedPassword])
    return result.rows[0]
  }

  static async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1'
    const result = await pool.query(query, [email])
    return result.rows[0] || null
  }

  static async findById(id: string): Promise<Omit<User, 'password'> | null> {
    const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1'
    const result = await pool.query(query, [id])
    return result.rows[0] || null
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }
} 