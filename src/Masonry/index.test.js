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
})
