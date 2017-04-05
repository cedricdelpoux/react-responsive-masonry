import React, {Component, PropTypes} from "react"

class MasonryResponsive extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columnsCount: null,
    }

    this.handleResize = this.handleResize.bind(this)
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
    let columnsCount

    breakPoints.forEach(breakPoint => {
      if (breakPoint < containerWidth) {
        columnsCount = columnsCountBreakPoints[breakPoint]
      }
    })

    if (columnsCount && columnsCount !== this.state.columnsCount) {
      this.setState({columnsCount})
    }
  }

  handleResize() {
    this.updateColumnsCount()
  }

  render() {
    return (
      <div ref={ref => this.container = ref}>
        {React.Children.map(this.props.children, (child, index) =>
          React.cloneElement(child, {
            key: index,
            columnsCount: this.state.columnsCount,
          })
        )}
      </div>
    )
  }
}

MasonryResponsive.propTypes = {
  children: PropTypes.any.isRequired,
  columnsCountBreakPoints: PropTypes.object,
}

MasonryResponsive.defaultProps = {
  columnsCountBreakPoints: {
    350: 1,
    750: 2,
    900: 3,
  },
}

export default MasonryResponsive
