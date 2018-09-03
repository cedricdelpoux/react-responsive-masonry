import React from "react"
import PropTypes from "prop-types"

const DEFAULT_COLUMNS_COUNT = 1

class MasonryResponsive extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCalculated: false,
      columnsCount: DEFAULT_COLUMNS_COUNT,
    }

    this.handleResize = this.handleResize.bind(this)
    this.handleRef = this.handleRef.bind(this)
  }

  componentDidMount() {
    this.updateColumnsCount()
    window.addEventListener("resize", this.handleResize) // eslint-disable-line
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize) // eslint-disable-line
  }

  getSortedBreakPoints() {
    const breakPoints = Object.keys(this.props.columnsCountBreakPoints)
    return breakPoints.sort((a, b) => a - b)
  }

  updateColumnsCount() {
    const {columnsCountBreakPoints} = this.props
    const containerWidth = this.container.offsetWidth
    const breakPoints = this.getSortedBreakPoints()
    let columnsCount =
      breakPoints.length > 0
        ? columnsCountBreakPoints[breakPoints[0]]
        : DEFAULT_COLUMNS_COUNT

    breakPoints.forEach(breakPoint => {
      if (breakPoint < containerWidth) {
        columnsCount = columnsCountBreakPoints[breakPoint]
      }
    })

    if (columnsCount && columnsCount !== this.state.columnsCount) {
      this.setState({columnsCount, isCalculated: true})
    }
  }

  handleResize() {
    this.updateColumnsCount()
  }

  handleRef(ref) {
    if (!this.container) this.container = ref
  }

  render() {
    const {columnsCount, isCalculated} = this.state
    const {children, className, style} = this.props
    return (
      <div ref={this.handleRef} className={className} style={style}>
        {isCalculated &&
          React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
              key: index,
              columnsCount: columnsCount,
            })
          )}
        {!isCalculated && <div>Content</div>}
      </div>
    )
  }
}

MasonryResponsive.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  columnsCountBreakPoints: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
}

MasonryResponsive.defaultProps = {
  columnsCountBreakPoints: {
    350: 1,
    750: 2,
    900: 3,
  },
  className: null,
  style: null,
}

export default MasonryResponsive
