import { Router } from 'express'
import { getComments, createComment } from './controller'

const router = Router()

router.get('/', getComments)
router.post('/', createComment)

export default router 