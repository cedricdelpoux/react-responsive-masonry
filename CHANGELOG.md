# 2.9.0 - 2026-09-18

-   Fixed: height-balanced columns never rendering on the very first mount, only after a later update (#26)
-   Fixed: a child's height changing after it was already placed (e.g. a lazy-loaded image) never triggered a re-layout (#27)
-   Fixed: missing `react` peerDependency (#107)
-   Added: `ref` on `Masonry` now points to its container DOM node instead of the component instance (#119)
-   Added: `columnsCountBreakPoints` and `gutterBreakPoints` now match against the container's own width instead of the window's, so nesting `ResponsiveMasonry` in a narrower container works as expected (#115)

# 2.8.0 - 2026-09-18

-   Fixed: balanced columns and gutter updates not re-rendering (#152)
-   Fixed: `gutter` prop overridden by ResponsiveMasonry when no `gutterBreakPoints` is set (#146)
-   Fixed: `gutterBreakPoints` type using the wrong value type
-   Fixed: `sequential` prop missing from TypeScript definitions
-   Fixed: empty columns reserving space with fewer children than columnsCount (#16)
-   Fixed: broken CommonJS build crashing on require() (#156, #127)
-   Fixed: crash when used inside a Next.js Server Component (#113)
-   Fixed: hydration mismatch in ResponsiveMasonry on SSR
-   Added: `Masonry` is now also available as a named export (#148, #22)

# 2.7.0 - 2025-01-20

-   add responsive gutters by @kriskuiper

# 2.6.0 - 2024-12-07

-   Added: add `sequential` prop to distribute children by height sequentially by @yangchristina

# 2.4.0 - 2024-10-12

-   Added: add typescript types by @zvonimirr

# 2.3.0 - 2024-07-25

-   Added: allow custom masonry and item HTML tags by @zvonimirr

# 2.2.0 - 2024-02-19

-   Added: add inner width as default by @artemijkurganov
-   Fixed: Un even column items when Masonry child is invalid by @sarathjasrin

# 2.0.0 - 2017-12-18

-   Added: ES6 modules build
-   Added: CommonJS build
-   Added: UMD build
-   Added: Demo
-   Added: Tests
-   Added: `style` prop

# 1.5.0 - 2017-12-12

-   Fixed: SSR

# 1.4.0 - 2017-11-14

-   Added: img alt for a11y accessibility
-   Updated: react v16 as a peer dependency

# 1.3.3 - 2017-09-28

-   Added: custom className support
-   Added: single node children support
-   Fixed: do not reset this.container

# 1.2.3 - 2017-06-14

-   Updated: handle default columns count

# 1.2.2 - 2017-06-03

-   Added: `files` to package.json

# 1.2.1 - 2017-06-03

-   Updated: Use `npm` to publish package

# 1.2.0 - 2017-04-14

-   Updated: `react` version to `15.5`
-   Added: `prop-types` package in `peerDependencies`
-   Removed: `browser` field in `package.json`
-   Removed: `dist` task in `package.json`
-   Removed: `watch` task in `package.json`
-   Removed: `webpack` dev dependency

# 1.1.0 - 2017-04-13

-   Added: `gutter` prop on `Mansory` component

# 1.0.0 - 2017-04-05

-   Added: `Masonry` component
-   Added: `ResponsiveMasonry` component
