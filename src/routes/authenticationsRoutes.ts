import { Router } from 'express'
import * as AuthenticationsController from '../controllers/authentication'

const authenticationsRoutes = Router()

authenticationsRoutes.get('/', AuthenticationsController.getAuthenticatedUser)

authenticationsRoutes.post('/register', AuthenticationsController.register)
authenticationsRoutes.post('/login', AuthenticationsController.login)
authenticationsRoutes.post('/logout', AuthenticationsController.logout)

export default authenticationsRoutes