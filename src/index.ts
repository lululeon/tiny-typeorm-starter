import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Account } from './entity/Account'
import dbConnection from '@config/ormconfig'

createConnection(dbConnection)
  .then(async connection => {
    console.log('Inserting new account into database...')
    const account = new Account()
    account.firstName = 'Timber'
    account.lastName = 'Saw'
    account.age = 25
    await connection.manager.save(account)
    console.log('Saved a new user with account id: ' + account.id)

    console.log('Loading user accounts from the database...')
    const accounts = await connection.manager.find(Account)
    console.log('Loaded users: ', accounts)
  })
  .catch(error => console.log(error))
