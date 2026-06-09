import { Router } from 'express'
import { getHabits } from '../controllers/habits.controller.js'

const router = Router()

router.get('/', getHabits)



export default router