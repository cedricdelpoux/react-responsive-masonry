// eslint-disable-next-line
module.exports = require("babel-jest").createTransformer({
  presets: ["env", "react"],
  plugins: ["transform-object-rest-spread", "transform-class-properties"],
})
