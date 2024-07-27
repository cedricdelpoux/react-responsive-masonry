declare module "react-responsive-masonry" {
  import React from "react"

  /**
   * List of props for the Masonry component.
   *
   * @typedef {Object} MasonryProps
   * @property {React.ReactNode} children
   * @property {number} columnsCount
   * @property {string} gutter
   * @property {string | null} className
   * @property {React.CSSProperties} style
   * @property {string} containerTag
   * @property {string} itemTag
   * @property {React.CSSProperties} itemStyle
   */
  export interface MasonryProps {
    /**
     * Children to be rendered in the Masonry component as items.
     *
     * @type {React.ReactNode}
     */
    children: React.ReactNode
    /**
     * Number of columns to be rendered in the Masonry component.
     * Default is 3.
     *
     * @type {number}
     */
    columnsCount?: number
    /**
     * Gutter size between the columns.
     * Default is "0".
     *
     * @type {string}
     */
    gutter?: string
    /**
     * Class name for the Masonry component container.
     * Default is null.
     *
     * @type {string | null}
     */
    className?: string | null
    /**
     * Style object for the Masonry component container.
     * Default is {}.
     *
     * @type {React.CSSProperties}
     */
    style?: React.CSSProperties
    /**
     * Tag name for the Masonry component container.
     * Default is "div".
     *
     * @type {string}
     */
    containerTag?: string
    /**
     * Tag name for the Masonry component item.
     * Default is "div".
     *
     * @type {string}
     */
    itemTag?: string
    /**
     * Style object for the Masonry component item.
     * Default is {}.
     *
     * @type {React.CSSProperties}
     */
    itemStyle?: React.CSSProperties
  }

  /**
   * List of props for the ResponsiveMasonry component.
   *
   * @typedef {Object} ResponsiveMasonryProps
   * @property {React.ReactNode} children
   * @property {{[key: number]: number}} columnsCountBreakPoints
   * @property {string | null} className
   * @property {React.CSSProperties | null} style
   */
  export interface ResponsiveMasonryProps {
    /**
     * Children to be rendered in the ResponsiveMasonry component as items.
     *
     * @type {React.ReactNode}
     */
    children: React.ReactNode
    /**
     * Breakpoints for the number of columns to be rendered in the ResponsiveMasonry component.
     * Default is { 350: 1, 750: 2, 900: 3 }
     *
     * @type {{[breakpoint: number]: number}}
     */
    columnsCountBreakPoints?: {[breakpoint: number]: number}
    /**
     * Class name for the ResponsiveMasonry component container.
     * Default is null.
     *
     * @type {string | null}
     */
    className?: string | null
    /**
     * Style object for the ResponsiveMasonry component container.
     * Default is null.
     *
     * @type {React.CSSProperties | null}
     */
    style?: React.CSSProperties | null
  }

  const Masonry: React.FC<MasonryProps>
  const ResponsiveMasonry: React.FC<ResponsiveMasonryProps>

  export default Masonry
  export {ResponsiveMasonry}
}
