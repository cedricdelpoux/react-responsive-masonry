import {configure, mount} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import React from "react"
import {renderToString} from "react-dom/server"
import {act} from "react-dom/test-utils"

import Masonry from "../"
import ResponsiveMasonry from "./"

configure({adapter: new Adapter()})

const columnsCountBreakPoints = {350: 1, 750: 2, 900: 3}
const content = "Content"
const ResponsiveFixture = (
  <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
    <Masonry>
      <div>{content}</div>
    </Masonry>
  </ResponsiveMasonry>
)
const ResponsiveCustomTagsFixture = (
  <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
    <Masonry containerTag="ul" itemTag="li">
      <div>{content}</div>
      <div>{content}</div>
    </Masonry>
  </ResponsiveMasonry>
)

describe("ResponsiveMasonry", () => {
  it("renders", () => {
    mount(ResponsiveFixture)
  })

  it("should render on server", () => {
    const result = renderToString(ResponsiveFixture)
    expect(result.match(RegExp(content))).not.toBeNull()
  })

  it("call resize event", () => {
    var resizeEvent = new Event("resize")

    act(() => {
      window.dispatchEvent(resizeEvent)
    })
  })
})

describe("ResponsiveMasonry with custom tags", () => {
  it("renders", () => {
    mount(ResponsiveCustomTagsFixture)
  })

  it("should render on server", () => {
    const result = renderToString(ResponsiveCustomTagsFixture)

    expect(result.match(RegExp(content))).not.toBeNull()
    expect(result.match(RegExp("<ul"))).not.toBeNull()
    expect(result.match(RegExp("<li"))).not.toBeNull()
  })

  it("call resize event", () => {
    var resizeEvent = new Event("resize")

    act(() => {
      window.dispatchEvent(resizeEvent)
    })
  })
})
