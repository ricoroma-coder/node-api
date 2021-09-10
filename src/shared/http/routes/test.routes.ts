import { Router } from 'express'
import UsersController from '@modules/users/controllers/UsersController'

const router = Router()
const usersController = new UsersController()

router.get('/api', usersController.test)

router.get('/', usersController.test2)

export default router
