import PropTypes from "prop-types"
import React, {useCallback, useLayoutEffect, useMemo, useState} from "react"

const DEFAULT_COLUMNS_COUNT = 1

const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false)
  useLayoutEffect(() => {
    setHasMounted(true)
  }, [])
  return hasMounted
}

const useWindowWidth = () => {
  const hasMounted = useHasMounted()
  const [width, setWidth] = useState(0)

  const handleResize = useCallback(() => {
    if (!hasMounted) return
    setWidth(window.innerWidth)
  }, [hasMounted])

  useLayoutEffect(() => {
    if (hasMounted) {
      window.addEventListener("resize", handleResize)
      handleResize()
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [hasMounted, handleResize])

  return width
}

const MasonryResponsive = ({
  columnsCountBreakPoints,
  children,
  className,
  style,
}) => {
  const windowWidth = useWindowWidth()
  const columnsCount = useMemo(() => {
    const breakPoints = Object.keys(columnsCountBreakPoints).sort(
      (a, b) => a - b
    )
    let count =
      breakPoints.length > 0
        ? columnsCountBreakPoints[breakPoints[0]]
        : DEFAULT_COLUMNS_COUNT

    breakPoints.forEach((breakPoint) => {
      if (breakPoint < windowWidth) {
        count = columnsCountBreakPoints[breakPoint]
      }
    })

    return count
  }, [windowWidth, columnsCountBreakPoints])

  return (
    <div className={className} style={style}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          key: index,
          columnsCount: columnsCount,
        })
      )}
    </div>
  )
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
