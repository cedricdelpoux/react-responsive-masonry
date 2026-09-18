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

  it("forwards a ref to the container DOM node", () => {
    const ref = React.createRef()
    const wrapper = mount(
      <Masonry ref={ref}>
        <div>{content}</div>
      </Masonry>
    )

    expect(ref.current).toBe(wrapper.getDOMNode())
    wrapper.unmount()
  })

  it("updates the gutter with unchanged children and columnsCount", () => {
    const wrapper = mount(MasonryFixture)

    wrapper.setProps({gutter: "20px"})

    expect(wrapper.getDOMNode().style.gap).toBe("20px")
    Array.from(wrapper.getDOMNode().children).forEach((column) => {
      expect(column.style.gap).toBe("20px")
    })
    wrapper.unmount()
  })

  it("does not render empty columns when there are fewer children than columnsCount", () => {
    const wrapper = mount(
      <Masonry columnsCount={3}>
        <div>{content}</div>
      </Masonry>
    )

    expect(wrapper.getDOMNode().children.length).toBe(1)
    wrapper.unmount()
  })

  describe("height distribution", () => {
    const children = [
      <span key="a" data-height="100">
        A
      </span>,
      <span key="b" data-height="10">
        B
      </span>,
      <span key="c" data-height="10">
        C
      </span>,
      <span key="d" data-height="10">
        D
      </span>,
    ]

    beforeEach(() => {
      jest
        .spyOn(Element.prototype, "getBoundingClientRect")
        .mockImplementation(function () {
          return {
            height: Number(this.firstElementChild.dataset.height),
            width: 100,
            top: 0,
            left: 0,
            right: 100,
            bottom: Number(this.firstElementChild.dataset.height),
            x: 0,
            y: 0,
          }
        })
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it("renders balanced columns on the very first mount, with no later update", () => {
      const wrapper = mount(<Masonry columnsCount={2}>{children}</Masonry>)

      expect(
        Array.from(
          wrapper.getDOMNode().children,
          (column) => column.textContent
        )
      ).toEqual(["A", "BCD"])
      wrapper.unmount()
    })

    it("renders balanced columns after children and column count changes", () => {
      const wrapper = mount(<Masonry columnsCount={2}>{[]}</Masonry>)

      wrapper.setProps({children})

      expect(
        Array.from(
          wrapper.getDOMNode().children,
          (column) => column.textContent
        )
      ).toEqual(["A", "BCD"])
      expect(Element.prototype.getBoundingClientRect).toHaveBeenCalledTimes(4)

      wrapper.setProps({columnsCount: 3})

      expect(
        Array.from(
          wrapper.getDOMNode().children,
          (column) => column.textContent
        )
      ).toEqual(["A", "BD", "C"])
      expect(Element.prototype.getBoundingClientRect).toHaveBeenCalledTimes(8)

      wrapper.setProps({columnsCount: 2})

      expect(
        Array.from(
          wrapper.getDOMNode().children,
          (column) => column.textContent
        )
      ).toEqual(["A", "BCD"])
      expect(Element.prototype.getBoundingClientRect).toHaveBeenCalledTimes(12)
      wrapper.unmount()
    })
  })

  describe("re-balancing when a child's size changes after placement", () => {
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
      jest
        .spyOn(Element.prototype, "getBoundingClientRect")
        .mockImplementation(function () {
          const height = Number(this.firstElementChild.dataset.height)
          return {
            height,
            width: 100,
            top: 0,
            left: 0,
            right: 100,
            bottom: height,
            x: 0,
            y: 0,
          }
        })
    })

    afterEach(() => {
      delete global.ResizeObserver
      jest.restoreAllMocks()
    })

    it("redistributes once a placed child's height actually changes", () => {
      const children = [
        <span key="a" data-height="100">
          A
        </span>,
        <span key="b" data-height="10">
          B
        </span>,
        <span key="c" data-height="10">
          C
        </span>,
        <span key="d" data-height="10">
          D
        </span>,
      ]
      const wrapper = mount(<Masonry columnsCount={2}>{children}</Masonry>)

      expect(
        Array.from(
          wrapper.getDOMNode().children,
          (column) => column.textContent
        )
      ).toEqual(["A", "BCD"])

      const bSpan = Array.from(
        wrapper.getDOMNode().querySelectorAll("[data-height]")
      ).find((element) => element.textContent === "B")
      const bWrapper = bSpan.parentElement
      const observer = MockResizeObserver.instances[0]

      // The observer's first report for an element only seeds its known
      // size, matching how ResizeObserver reports the starting size as
      // soon as observe() is called.
      observer.callback([{target: bWrapper, contentRect: {height: 10}}])
      expect(
        Array.from(
          wrapper.getDOMNode().children,
          (column) => column.textContent
        )
      ).toEqual(["A", "BCD"])

      bSpan.dataset.height = "200"
      observer.callback([{target: bWrapper, contentRect: {height: 200}}])

      expect(
        Array.from(
          wrapper.getDOMNode().children,
          (column) => column.textContent
        )
      ).toEqual(["ACD", "B"])
      wrapper.unmount()
    })
  })
})
