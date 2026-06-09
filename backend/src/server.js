import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()

const PORT = process.env.PORT || 3006

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    return res.send('API HabitLab Mini rodando')
})

app.get('/health', (req, res) => {
    return res.send({
        status: 'ok',
        message: 'API HabitLab Mini funcionando'
    })
})





app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})