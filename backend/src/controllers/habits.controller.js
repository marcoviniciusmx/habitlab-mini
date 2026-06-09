import { pool } from '../config/database.js'

export async function getHabits(req, res) {
    const result = await pool.query('SELECT * FROM habits ORDER BY created_at DESC')

    res.json(result.rows)
}

export async function createHabit(req, res) {
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

export async function updateHabit(req, res){
    const { id } = req.params

    const {
        title,
        description,
        category,
        frequency,
        status,
        streak
    } = req.body
    
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: 'Envie pelo menos um campo para atualizar.'
        })
    }

    const result = await pool.query(
        `
       UPDATE habits
       SET
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            category = COALESCE($3, category),
            frequency = COALESCE($4, frequency),
            status = COALESCE($5, status),
            streak = COALESCE($6::numeric, streak),
            updated_at = CURRENT_TIMESTAMP
        WHERE ID = $7
        RETURNING *
        `,
        [
            title,
            description,
            category,
            frequency,
            status,
            streak,
            id
        ]
    )

    if (result.rows.length === 0) {
        return res.status(400).json({
            message: 'Hábito não encontrado.'
        })
    }

    return res.json(result.rows[0])

}