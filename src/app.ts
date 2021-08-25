import 'reflect-metadata'
import env from '@utils/immutableEnv'
import { Server as HTTPServer } from 'http'
import { Connection } from 'typeorm'
import express, { Request, Response, NextFunction, Application } from 'express'
import cors from 'cors'
import Routes from './routes'
import { connectToDB } from '@utils/database'

class App {
  public app: Application
  private httpServer: HTTPServer
  private dbConnection: Connection

  constructor() {
    // create express app
    this.app = express()
    this.app.use(
      cors({ origin: env.CORS_ORIGIN, credentials: env.CORS_CREDENTIALS }),
    )
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    // register express routes from defined application routes, e.g. app.post('/api/foo', (req,res,next) => {}))
    Routes.forEach(route => {
      this.app[route.method](
        route.route,
        (req: Request, res: Response, next: NextFunction) => {
          const appController = route.controller
          const result = new appController()[route.action](req, res, next)
          if (result instanceof Promise) {
            result.then(result =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined,
            )
          } else if (result !== null && result !== undefined) {
            res.json(result)
          }
        },
      )
    })
  }

  public async start(): Promise<void> {
    // establish db connection first. If it fails, let app crash
    this.dbConnection = await connectToDB()
    this.httpServer = this.app.listen(env.PORT, () => {
      console.log(`Listening on port ${env.PORT} !`)
    })
  }

  public async stop(): Promise<void> {
    return new Promise((resolve, _reject) => {
      this.httpServer.close(async () => {
        console.log('Server stopped. Closing db connection...')
        await this.dbConnection.close()
        resolve()
      })
    })
  }

  public getServer(): Application {
    return this.app
  }
}

export default App
