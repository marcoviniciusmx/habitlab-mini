import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { pool } from './config/database.js'
import habitsRoutes from './routes/habits.routes.js'

const app = express()

const PORT = process.env.PORT || 3006

app.use(cors())
app.use(express.json())

app.use('/habits', habitsRoutes)

app.get('/', (req, res) => {
    return res.send('API HabitLab Mini rodando')
})

app.get('/health', (req, res) => {
    return res.send({
        status: 'ok',
        message: 'API HabitLab Mini funcionando'
    })
})

app.get('/db-test', async (req, res) => {

    const result = await pool.query('SELECT NOW()')

    res.json({
        status: 'ok',
        message: 'Banco conectado com sucesso',
        databaseTime: result.rows[0].now
    })
})


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})