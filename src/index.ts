import app from './app'
import { Client } from 'pg'
import { dbConfig } from './db/db'
import { createServer } from 'http'
import { socketioService } from './services/socketIo'
import 'dotenv/config'


const PORT = process.env.PORT as unknown as number || 5000

export const httpServer = createServer(app)
export type ServerType = typeof httpServer
socketioService(httpServer)

export const client = new Client(dbConfig)

const connectToDB = async () => {
  try {
    await client.connect(err => {
      if (err)
        throw err;
      client.query("SELECT VERSION()", [], (err, result) => {
        if (err)
          throw err

        console.log('DB conected:', result.rows[0].version)

        httpServer.listen(PORT, () => {
          console.log(`Server listening on port ${PORT}`)
        })

        client.end(err => {
          if (err) {
            throw err
          }
        })
      })
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

connectToDB()
