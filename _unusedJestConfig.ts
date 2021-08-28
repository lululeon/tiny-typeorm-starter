import tsJestUtils from 'ts-jest/utils'
import tsConf from './tsconfig.json'
import type { InitialOptionsTsJest } from 'ts-jest/dist/types'

const rootDir = __dirname
const { pathsToModuleNameMapper } = tsJestUtils
const {
  compilerOptions: { paths },
} = tsConf

const config: InitialOptionsTsJest = {
  // see: https://kulshekhar.github.io/ts-jest/docs/getting-started/presets
  preset: 'ts-jest',

  testEnvironment: 'node',
  rootDir: `${rootDir}/src`,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // allows jest to determine correct paths to @/-prefixed imports, to feed in turn to ts-jest (which does zero path resolution):
  moduleNameMapper: pathsToModuleNameMapper(paths, {
    prefix: `${rootDir}/src`,
  }),
}

export default config
