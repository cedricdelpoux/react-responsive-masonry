import {mount, shallow} from "enzyme"
import React from "react"
import {renderToString} from "react-dom/server"

import Masonry from "../"
import ResponsiveMasonry from "./"

const columnsCountBreakPoints = {350: 1, 750: 2, 900: 3}
const content = "Content"
const ResponsiveFixture = (
  <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
    <Masonry>
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
    window.dispatchEvent(resizeEvent)
  })
})
