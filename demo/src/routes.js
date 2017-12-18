import React from "react"

import readmeHtml from "../../README.md"
import {ExampleMasonry, ExampleResponsiveMasonry} from "./Examples"

const routes = [
  {
    path: "/",
    exact: true,
    component: (
      <div>
        <ExampleMasonry />
        <ExampleResponsiveMasonry />
      </div>
    ),
    label: "Demo",
  },
  {
    path: "/readme",
    html: readmeHtml,
    label: "Read me",
  },
]

export default routes
