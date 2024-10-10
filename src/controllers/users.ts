import { RequestHandler } from 'express'
import { getUserBySessionId } from '../services/users'

// Get Authenticated User
export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
      const user = await getUserBySessionId(req.session.userId as string)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }