import React from "react"
import {render} from "react-dom"

import ReactDemoPage from "react-demo-page"
import routes from "./routes"
import pkg from "../../package.json"

const header = {
  title: pkg.name,
  buttons: [
    {label: "Github", url: pkg.homepage},
    {label: "Npm", url: `https://www.npmjs.com/package/${pkg.name}`},
    {label: "Download", url: `${pkg.homepage}/archive/master.zip`},
  ],
}

const footer = {
  author: pkg.author,
}

const Demo = () => (
  <ReactDemoPage
    basename={pkg.name}
    header={header}
    footer={footer}
    pages={routes}
    color="#44B39D"
  />
)

// eslint-disable-next-line
render(<Demo />, document.querySelector("#demo"))
