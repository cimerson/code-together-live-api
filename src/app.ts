import express, { Express, Request, Response, NextFunction } from 'express'
import createHttpError, { isHttpError } from 'http-errors'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes/routes'
import genFunc from 'connect-pg-simple'
import { pool } from './db/db'
import session from 'express-session'
import 'dotenv/config'


const app: Express = express()

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);


app.use(morgan('dev'))

app.use(express.json())

const PostgresqlStore = genFunc(session)
const sessionStore = new PostgresqlStore({
  pool: pool
})

const secret = process.env.SESSION_SECRET as unknown as string

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    // secure: true,
    httpOnly: true,
    // sameSite: 'none',
    sameSite: 'strict',
    secure: false,
  },
  // rolling: true,
  store: sessionStore
}))


app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.use('/', routes)


app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(req.path, req.method)
  next(createHttpError(404, 'Endpoint not found'))
})

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error)
  let errorMessage = 'An unknown error occurred'
  let statusCode = 500
  if (isHttpError(error)) {
    statusCode = error.status
    errorMessage = error.message
  }
  res.status(statusCode).json({ error: errorMessage })
})

export default app
