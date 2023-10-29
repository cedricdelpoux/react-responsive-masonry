import React from "react"

import readmeHtml from "../../README.md"
import {
  ExampleMasonry,
  ExampleResponsiveMasonry,
  ExampleMasonryAlign,
} from "./Examples"

const routes = [
  {
    path: "/",
    exact: true,
    component: (
      <div>
        <ExampleMasonry />
        <ExampleResponsiveMasonry />
        <ExampleMasonryAlign />
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
