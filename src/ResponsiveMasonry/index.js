"use client"

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
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

// Breakpoints are matched against the container's own rendered width
// rather than the window's, so nesting ResponsiveMasonry in a sidebar or
// any container narrower than the viewport still picks the right column
// count for the space it actually has.
const useElementWidth = (ref) => {
  const hasMounted = useHasMounted()
  // Always start from 0, matching the server-rendered output, even on the
  // client's first (hydration) render. Measuring the DOM here would desync
  // from the server render and trigger a hydration mismatch; the real
  // width is picked up right after mount by the effect below instead.
  const [width, setWidth] = useState(0)

  useIsomorphicLayoutEffect(() => {
    if (!hasMounted || !ref.current) return

    if (typeof ResizeObserver === "undefined") {
      const handleResize = () =>
        setWidth(ref.current.getBoundingClientRect().width)
      handleResize()
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })
    resizeObserver.observe(ref.current)
    return () => resizeObserver.disconnect()
  }, [hasMounted, ref])

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
  const containerRef = useRef(null)
  const containerWidth = useElementWidth(containerRef)

  const getResponsiveValue = useCallback(
    (breakPoints, defaultValue) => {
      const sortedBreakPoints = Object.keys(breakPoints).sort((a, b) => a - b)
      let value =
        sortedBreakPoints.length > 0
          ? breakPoints[sortedBreakPoints[0]]
          : defaultValue

      sortedBreakPoints.forEach((breakPoint) => {
        if (breakPoint < containerWidth) {
          value = breakPoints[breakPoint]
        }
      })

      return value
    },
    [containerWidth]
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
    <div ref={containerRef} className={className} style={style}>
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
