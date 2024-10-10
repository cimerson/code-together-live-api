import { Router } from 'express'
import * as RoomsController from '../controllers/rooms'

const roomsRoutes = Router()

roomsRoutes.get('/', RoomsController.getRooms)
roomsRoutes.get('/:roomId', RoomsController.getRoom)

roomsRoutes.post('/', RoomsController.createRoom)

export default roomsRoutes
