import { Router } from 'express'
import { getHabits, postHabits } from '../controllers/habits.controller.js'

const router = Router()

router.get('/', getHabits)
router.post('/', postHabits)



export default router