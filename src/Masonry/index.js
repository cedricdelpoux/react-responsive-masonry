"use client"

import PropTypes from "prop-types"
import React from "react"

class MasonryClass extends React.Component {
  constructor() {
    super()
    this.state = {columns: [], childRefs: [], hasDistributed: false}
  }

  componentDidMount() {
    if (!this.state.hasDistributed && !this.props.sequential)
      this.distributeChildren()
    this.observeChildren()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.hasDistributed && !this.props.sequential)
      this.distributeChildren()
    if (prevState.childRefs !== this.state.childRefs) this.observeChildren()
  }

  componentWillUnmount() {
    if (this.resizeObserver) this.resizeObserver.disconnect()
  }

  // Children can change size after they've already been placed into a
  // column, e.g. an image that finishes loading, or a Next.js <Image>
  // swapping in its real source. Re-run the height-based distribution
  // whenever that happens, since nothing else would trigger it.
  observeChildren() {
    if (this.props.sequential || typeof ResizeObserver === "undefined") return

    if (this.resizeObserver) this.resizeObserver.disconnect()
    this.lastHeights = new WeakMap()
    this.resizeObserver = new ResizeObserver((entries) => {
      const hasRealChange = entries.some((entry) => {
        const height = entry.contentRect.height
        const lastHeight = this.lastHeights.get(entry.target)
        this.lastHeights.set(entry.target, height)
        return lastHeight !== undefined && lastHeight !== height
      })
      if (hasRealChange) this.distributeChildren()
    })
    this.state.childRefs.forEach((ref) => {
      if (ref.current) this.resizeObserver.observe(ref.current)
    })
  }

  static getDerivedStateFromProps(props, state) {
    const {children, columnsCount} = props
    const hasColumnsChanged = columnsCount !== state.columns.length
    if (state && children === state.children && !hasColumnsChanged) return null
    return {
      ...MasonryClass.getEqualCountColumns(children, columnsCount),
      children,
      hasDistributed: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.children !== this.state.children ||
      nextProps.columnsCount !== this.props.columnsCount ||
      nextProps.gutter !== this.props.gutter ||
      nextState.columns !== this.state.columns
    )
  }

  distributeChildren() {
    const {children, columnsCount} = this.props
    const columnHeights = Array(columnsCount).fill(0)

    const {childHeights, isReady} = this.state.childRefs.reduce(
      (result, ref) => {
        const height = ref.current.getBoundingClientRect().height

        result.childHeights.push(height)
        result.isReady = result.isReady && Boolean(height)

        return result
      },
      {childHeights: [], isReady: true}
    )

    if (!isReady) return

    const columns = Array.from({length: columnsCount}, () => [])

    let validIndex = 0

    React.Children.forEach(children, (child) => {
      if (child && React.isValidElement(child)) {
        // .current is undefined if ref was passed to a functional component without forwardRef
        // now passing ref into a wrapper div so it should always be defined
        const childHeight = childHeights[validIndex]
        const minHeightColumnIndex = columnHeights.indexOf(
          Math.min(...columnHeights)
        )
        columnHeights[minHeightColumnIndex] += childHeight
        // Keep wrapping the child with its existing ref, the same way
        // getEqualCountColumns does. Pushing the raw child here would drop
        // the ref, leaving childRefs pointing at unmounted nodes for any
        // distribution attempted afterwards (e.g. a later resize).
        columns[minHeightColumnIndex].push(
          <div
            style={{display: "flex", justifyContent: "stretch"}}
            key={validIndex}
            ref={this.state.childRefs[validIndex]}
          >
            {child}
          </div>
        )
        validIndex++
      }
    })

    this.setState((p) => ({...p, columns, hasDistributed: true}))
  }

  static getEqualCountColumns(children, columnsCount) {
    const columns = Array.from({length: columnsCount}, () => [])
    let validIndex = 0
    const childRefs = []
    React.Children.forEach(children, (child) => {
      if (child && React.isValidElement(child)) {
        const ref = React.createRef()
        childRefs.push(ref)
        columns[validIndex % columnsCount].push(
          <div
            style={{display: "flex", justifyContent: "stretch"}}
            key={validIndex}
            ref={ref}
          >
            {child}
          </div>
          // React.cloneElement(child, {ref}) // cannot attach refs to functional components without forwardRef
        )
        validIndex++
      }
    })
    return {columns, childRefs}
  }

  renderColumns() {
    const {gutter, itemTag, itemStyle} = this.props
    return this.state.columns
      .filter((column) => column.length > 0)
      .map((column, i) =>
        React.createElement(
          itemTag,
          {
            key: i,
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignContent: "stretch",
              flex: 1,
              width: 0,
              gap: gutter,
              ...itemStyle,
            },
          },
          column.map((item) => item)
        )
      )
  }

  render() {
    const {gutter, className, style, containerTag, forwardedRef} = this.props

    return React.createElement(
      containerTag,
      {
        ref: forwardedRef,
        style: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "stretch",
          boxSizing: "border-box",
          width: "100%",
          gap: gutter,
          ...style,
        },
        className,
      },
      this.renderColumns()
    )
  }
}

MasonryClass.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  columnsCount: PropTypes.number,
  gutter: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  containerTag: PropTypes.string,
  itemTag: PropTypes.string,
  itemStyle: PropTypes.object,
  sequential: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
}

MasonryClass.defaultProps = {
  columnsCount: 3,
  gutter: "0",
  className: null,
  style: {},
  containerTag: "div",
  itemTag: "div",
  itemStyle: {},
  sequential: false,
  forwardedRef: null,
}

// A ref on Masonry points at the container DOM node, e.g. to wrap it with
// Framer Motion or another library that needs direct access to it, rather
// than at the class instance forwardRef would otherwise expose by default.
const Masonry = React.forwardRef((props, ref) => (
  <MasonryClass {...props} forwardedRef={ref} />
))
Masonry.displayName = "Masonry"

export default Masonry
