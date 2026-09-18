import {configure, mount} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import React from "react"
import {renderToString} from "react-dom/server"
import {act} from "react-dom/test-utils"

import Masonry from "../"
import ResponsiveMasonry from "./"

configure({adapter: new Adapter()})

const columnsCountBreakPoints = {350: 1, 750: 2, 900: 3}
const gutterBreakPoints = {350: "10px", 750: "20px", 900: "30px"}
const content = "Content"
const ResponsiveFixture = (
  <ResponsiveMasonry
    columnsCountBreakPoints={columnsCountBreakPoints}
    gutterBreakPoints={gutterBreakPoints}
  >
    <Masonry>
      <div>{content}</div>
    </Masonry>
  </ResponsiveMasonry>
)
const ResponsiveCustomTagsFixture = (
  <ResponsiveMasonry
    columnsCountBreakPoints={columnsCountBreakPoints}
    gutterBreakPoints={gutterBreakPoints}
  >
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

describe("ResponsiveMasonry without gutterBreakPoints", () => {
  it("does not override the gutter explicitly set on Masonry", () => {
    const wrapper = mount(
      <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
        <Masonry gutter="32px">
          <div>{content}</div>
        </Masonry>
      </ResponsiveMasonry>
    )

    expect(wrapper.find(Masonry).prop("gutter")).toBe("32px")
  })
})

describe("ResponsiveMasonry reacts to the container width", () => {
  class MockResizeObserver {
    constructor(callback) {
      this.callback = callback
      MockResizeObserver.instances.push(this)
    }
    observe() {}
    disconnect() {}
  }
  MockResizeObserver.instances = []

  beforeEach(() => {
    MockResizeObserver.instances = []
    global.ResizeObserver = MockResizeObserver
  })

  afterEach(() => {
    delete global.ResizeObserver
  })

  it("picks columnsCount from the container's width, not the window's", () => {
    const wrapper = mount(
      <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
        <Masonry>
          <div>{content}</div>
        </Masonry>
      </ResponsiveMasonry>
    )

    act(() => {
      // Masonry sets up its own ResizeObserver (to watch each child's
      // height) too, mounting before ResponsiveMasonry's effect runs, so
      // ResponsiveMasonry's own container-width observer is the last one
      // created.
      const instances = MockResizeObserver.instances
      instances[instances.length - 1].callback([{contentRect: {width: 800}}])
    })
    wrapper.update()

    expect(wrapper.find(Masonry).prop("columnsCount")).toBe(2)
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
