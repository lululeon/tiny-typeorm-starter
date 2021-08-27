import tsJestUtils from 'ts-jest/utils'
import tsConf from './tsconfig.json'

const rootDir = __dirname
const { pathsToModuleNameMapper } = tsJestUtils
const {
  compilerOptions: { paths },
} = tsConf

const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [`${rootDir}/src`],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // allows jest to determine correct paths to @/-prefixed imports, to feed in turn to ts-jest (which does zero path resolution):
  moduleNameMapper: pathsToModuleNameMapper(paths, {
    prefix: `${rootDir}/src`,
  }),
}

export default config
