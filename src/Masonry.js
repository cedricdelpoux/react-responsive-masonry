import React, {Component, PropTypes} from "react"

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
    flexGrow: 1,
    flexBasis: 0,
  },
  item: {
    margin: "5px",
  },
}

class Masonry extends Component {
  getColumns() {
    const {children, columnsCount} = this.props
    const columns = []

    React.Children.forEach(children, (child, index) => {
      const columnIndex = index % columnsCount

      if (!Array.isArray(columns[columnIndex])) {
        columns[columnIndex] = []
      }

      columns[columnIndex].push(child)
    })

    return columns
  }

  renderColumn(column) {
    return column.map((item, i) => (
      <div key={i} style={styles.item}>
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
    return (
      <div style={styles.container}>
        {this.renderColumns()}
      </div>
    )
  }
}

Masonry.propTypes = {
  children: PropTypes.array.isRequired,
  columnsCount: PropTypes.number,
}

Masonry.defaultProps = {
  columnsCount: 3,
}

export default Masonry
