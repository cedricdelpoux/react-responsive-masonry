import {configure, mount} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import React from "react"

import Masonry from "./"

configure({adapter: new Adapter()})

const content = "Content"
const MasonryFixture = (
  <Masonry>
    <div>{content}</div>
  </Masonry>
)

const CustomTagsFixture = (
  <Masonry containerTag="ul" itemTag="li">
    <div>{content}</div>
  </Masonry>
)

describe("Masonry", () => {
  it("renders", () => {
    mount(MasonryFixture)
  })

  it("renders with custom tags", () => {
    mount(CustomTagsFixture)
  })
})
