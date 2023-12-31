export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: ['/node_modules/'],
  testRegex: ['^.+\\.test\\.ts$'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
  },
  collectCoverageFrom: ['src/**/*.ts'],
};

process.env = Object.assign(process.env, {
  DATABASE_URL:
    'postgresql://admin:admin@localhost:5434/mydatabase?schema=public',
  ELASTICSEARCH_URL: 'http://elastic:admin@localhost:9201',
});
