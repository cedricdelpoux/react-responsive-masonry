"use client"

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react"

import PropTypes from "prop-types"

const DEFAULT_COLUMNS_COUNT = 1
const DEFAULT_GUTTER = "10px"

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false)
  useIsomorphicLayoutEffect(() => {
    setHasMounted(true)
  }, [])
  return hasMounted
}

const useWindowWidth = () => {
  const hasMounted = useHasMounted()
  // Always start from 0, matching the server-rendered output, even on the
  // client's first (hydration) render. Reading window.innerWidth here would
  // desync from the server render and trigger a hydration mismatch; the
  // real width is picked up right after mount by the effect below instead.
  const [width, setWidth] = useState(0)

  const handleResize = useCallback(() => {
    if (!hasMounted) return
    setWidth(window.innerWidth)
  }, [hasMounted])

  useIsomorphicLayoutEffect(() => {
    if (hasMounted) {
      window.addEventListener("resize", handleResize)
      handleResize()
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [hasMounted, handleResize])

  return width
}

const MasonryResponsive = ({
  columnsCountBreakPoints = {
    350: 1,
    750: 2,
    900: 3,
  },
  gutterBreakPoints = {},
  children,
  className = null,
  style = null,
}) => {
  const windowWidth = useWindowWidth()

  const getResponsiveValue = useCallback(
    (breakPoints, defaultValue) => {
      const sortedBreakPoints = Object.keys(breakPoints).sort((a, b) => a - b)
      let value =
        sortedBreakPoints.length > 0
          ? breakPoints[sortedBreakPoints[0]]
          : defaultValue

      sortedBreakPoints.forEach((breakPoint) => {
        if (breakPoint < windowWidth) {
          value = breakPoints[breakPoint]
        }
      })

      return value
    },
    [windowWidth]
  )

  const columnsCount = useMemo(
    () => getResponsiveValue(columnsCountBreakPoints, DEFAULT_COLUMNS_COUNT),
    [getResponsiveValue, columnsCountBreakPoints]
  )
  const gutter = useMemo(
    () => getResponsiveValue(gutterBreakPoints, DEFAULT_GUTTER),
    [getResponsiveValue, gutterBreakPoints]
  )

  return (
    <div className={className} style={style}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          key: index,
          columnsCount,
          ...(Object.keys(gutterBreakPoints).length > 0 ? {gutter} : {}),
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

export default MasonryResponsive
