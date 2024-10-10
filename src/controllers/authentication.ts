import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import { createUser, getUserBySessionId, getUserByUsername } from '../services/users'
import createHttpError from 'http-errors'


interface RegisterBody {
  username?: string,
  password?: string,
}

export const register: RequestHandler<unknown, unknown, RegisterBody, unknown>  = async ( req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw createHttpError(400, 'Parameters missing')
    }
    const existingUser = await getUserByUsername(username)
    if (existingUser.length > 0) {
      throw createHttpError(409, 'User already exists. Please log in instead.')
    }
    const passwordHashed = await bcrypt.hash(password, 10)
    const user = await createUser({
      username,
      password: passwordHashed,
    })
    return res.status(201).json(user)
  } catch (e) {
    next(e)
  }
}

interface LoginBody {
  username?: string,
  password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      throw createHttpError(400, 'Parameters missing')
    }
    const existingUser = await getUserByUsername(username)
    if (existingUser.length === 0) {
      throw createHttpError(404, 'User not found, Please sign in!')
    }
    const user = existingUser[0]
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw createHttpError(401, 'Invalid credentials')
    }
    req.session.userId = user.id
    return res.status(200).json(user)
  } catch (e) {
    next(e)
  }
}

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy(error => {
    if (error) {
      next(error)
    } else {
      res.sendStatus(200)
    }
  })
}

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await getUserBySessionId(req.session.userId as string)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}