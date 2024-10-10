
import { Router } from 'express'
import authenticationsRoutes from './authenticationsRoutes'
import usersRoutes from './usersRoutes'
import roomsRoutes from './roomsRoutes'

const routes = Router()

routes.use('/api/v1/authentications', authenticationsRoutes)
routes.use('/api/v1/users', usersRoutes)
routes.use('/api/v1/rooms', roomsRoutes)

export default routes