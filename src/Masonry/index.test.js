import {mount} from "enzyme"
import React from "react"

import Masonry from "./"

const content = "Content"
const MasonryFixture = (
  <Masonry>
    <div>{content}</div>
  </Masonry>
)

describe("Masonry", () => {
  it("renders", () => {
    mount(MasonryFixture)
  })
})
