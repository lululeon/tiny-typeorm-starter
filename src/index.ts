import 'reflect-metadata'
import env from '@utils/immutableEnv'
import { Account } from '@entity/Account'
import { connectToDB } from '@utils/database'
import express, { Request, Response, NextFunction, Express } from 'express'
import cors from 'cors'
import Routes from './routes'
import { fakeAccount } from '@utils/mockData'

connectToDB()
  .then(async connection => {
    console.log('Inserting new account into database...')
    const account = fakeAccount()
    await connection.manager.save(account)
    console.log('Saved a new user with account id: ' + account.id)

    console.log('Loading user accounts from the database...')
    const accounts = await connection.manager.find(Account)
    console.log('Loaded users: ', accounts)
  })
  .catch(error => console.log(error))

// create express app
const app: Express = express()
app.use(cors({ origin: env.CORS_ORIGIN, credentials: env.CORS_CREDENTIALS }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// register express routes from defined application routes
Routes.forEach(route => {
  app[route.method](route.route, (req: Request, res: Response, next: NextFunction) => {
    const appController = route.controller
    const result = new appController()[route.action](req, res, next)
    if (result instanceof Promise) {
      result.then(result => (result !== null && result !== undefined ? res.send(result) : undefined))
    } else if (result !== null && result !== undefined) {
      res.json(result)
    }
  })
})

// start express server
app.listen(env.PORT, () => {
  console.log(`Listening on port ${env.PORT} !`)
})
