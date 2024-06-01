
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  coverageDirectory: "coverage",
  coverageReporters: ['text', 'lcov'],
  roots: ["<rootDir>/test"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts"
  ],
};
