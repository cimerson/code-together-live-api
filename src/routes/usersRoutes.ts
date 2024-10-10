import { Router } from 'express'
import * as UsersCotroller from '../controllers/users'
// import { requiresAuth } from '../middlewares/auth'

const usersRoutes = Router()

usersRoutes.get('/', UsersCotroller.getAuthenticatedUser)

export default usersRoutes