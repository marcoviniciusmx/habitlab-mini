import { pool } from '../config/database.js'

export async function getHabits(req, res) {
    const result = await pool.query('SELECT * FROM habits ORDER BY created_at DESC')

    res.json(result.rows)
}

export async function postHabits(req, res) {
    const {
        title,
        description,
        category,
        frequency,
        status,
        streak
    } = req.body

    if (!title) {
        return res.status(400).json({
            message: 'O título do hábito é obrigatório'
        })
    }

    const finalFrequency = frequency || 'Diário'
    const finalStatus = status || 'Ativo'
    const finalStreak = streak || 0

    const result = await pool.query(
        `
        INSERT INTO habits(
            title,
            description,
            category,
            frequency,
            status,
            streak
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        [
            title,
            description,
            category,
            finalFrequency,
            finalStatus,
            finalStreak
        ]
    )

    return res.status(201).json(result.rows[0])
}