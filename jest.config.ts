import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

const TS_CONFIG_PATH = './tsconfig.json';
const SRC_PATH = '<rootDir>/src';
const nextJest = require('next/jest');

// this makes the absolute import "@pages/index" to be recognized by jest
function makeModuleNameMapper(srcPath: string, tsconfigPath: string) {
  // Get paths from tsconfig
  const { paths } = require(tsconfigPath).compilerOptions;

  const aliases: {
    [key: string]: string;
  } = {};

  // Iterate over paths and convert them into moduleNameMapper format
  Object.keys(paths).forEach(item => {
    const key = item.replace('/*', '/(.*)');
    const path = paths[item][0].replace('/*', '/$1');
    aliases[key] = srcPath + '/' + path;
  });
  return aliases;
}

// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({
  dir: '.'
});

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
  },
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules', '.'],
  modulePaths: ['node_modules', '.'],
  roots: [SRC_PATH],
  moduleNameMapper: makeModuleNameMapper(SRC_PATH, TS_CONFIG_PATH),
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json'
    }
  }
};

export default createJestConfig(config);
