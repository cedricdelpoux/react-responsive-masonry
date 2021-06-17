import PropTypes from "prop-types"
import React from "react"

class Masonry extends React.Component {
  getColumns() {
    const {children, columnsCount} = this.props
    const columns = Array.from({length: columnsCount}, () => [])

    React.Children.forEach(children, (child, index) => {
      if (child && React.isValidElement(child)) {
        columns[index % columnsCount].push(child)
      }
    })

    return columns
  }

  renderColumn(column) {
    const {gutter} = this.props
    return column.map((item, i) => (
      <div key={i} style={{marginTop: i > 0 ? gutter : undefined}}>
        {item}
      </div>
    ))
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
          marginLeft: i > 0 ? gutter : undefined,
        }}
      >
        {this.renderColumn(column)}
      </div>
    ))
  }

  render() {
    const {className, style} = this.props
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "stretch",
          boxSizing: "border-box",
          width: "100%",
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
