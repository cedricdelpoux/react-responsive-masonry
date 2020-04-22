import React from "react"
import PropTypes from "prop-types"

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "stretch",
    boxSizing: "border-box",
    width: "100%",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "stretch",
    flex: 1,
    width: 0,
  },
}

class Masonry extends React.Component {
  getColumns() {
    const {children, columnsCount} = this.props
    const columns = Array.from({length: columnsCount}, () => [])

    React.Children.forEach(children, (child, index) => {
      columns[index % columnsCount].push(child)
    })

    return columns
  }

  renderColumn(column) {
    const {gutter} = this.props
    return column.map((item, i) => (
      <div key={i} style={{margin: gutter}}>
        {item}
      </div>
    ))
  }

  renderColumns() {
    return this.getColumns().map((column, i) => (
      <div key={i} style={styles.column}>
        {this.renderColumn(column)}
      </div>
    ))
  }

  render() {
    const {className, style} = this.props
    return (
      <div style={{...styles.container, ...style}} className={className}>
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
