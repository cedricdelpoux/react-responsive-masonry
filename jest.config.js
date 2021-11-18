module.exports = {
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/node_modules/jest-css-modules",
  },
  testEnvironment: "jsdom",
  transform: {
    "\\.js$": ["babel-jest", {configFile: "./babel-jest.config.js"}],
  },
}
