import { Router } from 'express'
import { getHabits, createHabit, updateHabit } from '../controllers/habits.controller.js'

const router = Router()

router.get('/', getHabits)
router.post('/', createHabit)
router.patch('/:id', updateHabit)



export default router