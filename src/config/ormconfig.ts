import env from '@utils/immutableEnv'
import { ConnectionOptions } from 'typeorm'

const host = env.DB_HOST
const port = env.DB_PORT
const user = env.DB_USER
const password = env.DB_PASS
const database = env.DB_NAME

const fileSet = env.isProduction
  ? {
      // transpiled build
      entities: ['src/entity/**/*.js'],
      migrations: ['src/migration/**/*.js'],
      subscribers: ['src/subscriber/**/*.js'],
    }
  : {
      entities: ['src/entity/**/*.ts'],
      migrations: ['src/migration/**/*.ts'],
      subscribers: ['src/subscriber/**/*.ts'],
    }

// see: https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md
const dbConnOptions: ConnectionOptions = {
  type: 'postgres',
  host: host,
  port: port,
  username: user,
  password: password,
  database: database,
  synchronize: env.isProduction ? false : true,
  logging: env.isProduction || env.isTest ? false : true,
  ...fileSet,
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
}

export default dbConnOptions
