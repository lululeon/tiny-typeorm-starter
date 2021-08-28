/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

const rootDir = __dirname

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [`${rootDir}/src`],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: `${rootDir}/src`,
  }),
}
