import { pool } from '../config/database.js'

export async function getHabits(req, res){
    const result = await pool.query('SELECT * FROM habits ORDER BY created_at DESC')

    res.json(result.rows)
}