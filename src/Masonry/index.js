import PropTypes from "prop-types"
import React from "react"

class Masonry extends React.Component {
  getColumns() {
    const {children, columnsCount} = this.props
    const columns = Array.from({length: columnsCount}, () => [])
    let validIndex = 0
    React.Children.forEach(children, (child) => {
      if (child && React.isValidElement(child)) {
        columns[validIndex % columnsCount].push(child)
        validIndex++
      }
    })
    return columns
  }

  renderColumns() {
    const {gutter} = this.props
    return this.getColumns().map((column, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignContent: "stretch",
          flex: 1,
          width: 0,
          gap: gutter,
        }}
      >
        {column.map((item) => item)}
      </div>
    ))
  }

  render() {
    const {gutter, className, style} = this.props
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "stretch",
          boxSizing: "border-box",
          width: "100%",
          gap: gutter,
          ...style,
        }}
        className={className}
      >
        {this.renderColumns()}
      </div>
    )
  }
}

Masonry.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  columnsCount: PropTypes.number,
  gutter: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

Masonry.defaultProps = {
  columnsCount: 3,
  gutter: "0",
  className: null,
  style: {},
}

export default Masonry
