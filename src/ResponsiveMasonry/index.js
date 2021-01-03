import PropTypes from "prop-types"
import React, {useCallback, useEffect, useMemo, useState} from "react"

const DEFAULT_COLUMNS_COUNT = 1

const getWindowWidth = () => {
  if (typeof window === "undefined") return null

  return window.innerWidth
}

const useWindowWidth = () => {
  const [width, setWidth] = useState(getWindowWidth())
  const hasWindow = typeof window !== "undefined"

  const handleResize = useCallback(() => {
    setWidth(getWindowWidth())
  }, [])

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [hasWindow, handleResize])

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
