import { RequestHandler } from 'express'
import { assertIsDefined } from '../utils/assertIsDefined'
import { getRoomById, getUserRooms, insertRoom } from '../services/rooms'
import createHttpError from 'http-errors'


export const getRooms: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId
  console.log(authenticatedUserId)

  try {
    assertIsDefined(authenticatedUserId)

    const rooms = await getUserRooms(authenticatedUserId)
    res.status(200).json(rooms)
  } catch (error) {
    next(error)
  }
}

export const getRoom: RequestHandler = async (req, res, next) => {
  const { roomId } = req.params

  try {
    if (!roomId) {
      throw createHttpError(400, 'Parameters missing')
    }
    const room = await getRoomById(roomId)
    if (!room) {
      throw createHttpError(404, 'Not found')
    }
    res.status(200).json(room[0])
  } catch (error) {
    next(error)
  }
}

interface CreateRoomBody {
  name?: string,
  language?: string,
  code?: string,
}

export const createRoom: RequestHandler<unknown, unknown, CreateRoomBody, unknown> = async (req, res, next) => {
  const authenticatedUserId = req.session.userId
  const { name, language, code } = req.body

  try {
    assertIsDefined(authenticatedUserId)
    if (!name || !language || !code) {
      throw createHttpError(422, 'Parameters missing')
    }
    const room = await insertRoom({
      name,
      language,
      code,
      owner: authenticatedUserId
    })
    res.status(201).json(room[0])
  } catch (error) {
    next(error)
  }
}
