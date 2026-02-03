/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  setupFilesAfterEnv: [], // e.g. ['./jest.setup.js']
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  clearMocks: true,
};
