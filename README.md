# react-responsive-masonry

[![npm package][npm-badge]][npm] [![Travis][build-badge]][build]
[![Codecov][codecov-badge]][codecov] ![Module formats][module-formats]

A lightweight React responsive masonry component built with css flexbox.

## Getting started

[![react-responsive-masonry](https://nodei.co/npm/react-responsive-masonry.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-responsive-masonry/)

You can download `react-responsive-masonry` from the NPM registry via the `npm` or
`yarn` commands

```shell
yarn add react-responsive-masonry
npm install react-responsive-masonry --save
```

If you don't use package manager and you want to include `react-responsive-masonry`
directly in your html, you could get it from the UNPKG CDN

```html
https://unpkg.com/react-responsive-masonry/umd/react-responsive-masonry.js
```

## Demo

See [Demo page][github-page]

## Example

![React-responsive-masonry gif](/demo/src/example.gif)

## Usage

If you want the number of columns change by resizing the window, you need to wrap the `Masonry` component by the `ResponsiveMasonry` component.
Otherwise, you only need to use the `Masonry` component.

```js
import React from "react"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

// The number of columns change by resizing the window
class MyWrapper extends React.Component {
    render() {
        return (
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                <Masonry>
                    <ChildA />
                    <ChildB />
                    {/* Children */}
                    <ChildY />
                    <ChildZ />
                </Masonry>
            </ResponsiveMasonry>
        )
    }
}

// The number of columns don't change by resizing the window
class MyWrapper extends Component {
    render() {
        return (
            <Masonry columnsCount={3}>
                <ChildA />
                <ChildB />
                {/* Children */}
                <ChildY />
                <ChildZ />
            </Masonry>
        )
    }
}
```

## Props

### Mansonry component

| Name         | PropType | Description                                            | Default |
| ------------ | -------- | ------------------------------------------------------ | ------- |
| columnsCount | Number   | Injected by ResponsiveMasonry                          | 3       |
| gutter       | String   | Margin surrounding each item e.g. "10px" or "1.5rem"   | "0"     |
| containerTag | String   | Tag name of the container element                      | "div"   |
| itemTag      | String   | Tag name of the item element                           | "div"   |
| itemStyle    | Object   | Style object applied to each item                      | {}      |
| sequential   | Boolean  | If true, items are placed in the order they are passed | false   |

### ResponsiveMasonry component

| Name                    | PropType | Description                                               | Default                  |
| ----------------------- | -------- | --------------------------------------------------------- | ------------------------ |
| columnsCountBreakPoints | Object   | Keys are breakpoints in px, values are the columns number | {350: 1, 750: 2, 900: 3} |

## Contributing

-   ⇄ Pull/Merge requests and ★ Stars are always welcome.
-   For bugs and feature requests, please [create an issue][github-issue].
-   Pull requests must be accompanied by passing automated tests (`npm test`).

See [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines

## Changelog

See [changelog](./CHANGELOG.md)

## License

This project is licensed under the MIT License - see the
[LICENCE.md](./LICENCE.md) file for details

[npm-badge]: https://img.shields.io/npm/v/react-responsive-masonry.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-responsive-masonry
[build-badge]: https://img.shields.io/travis/cedricdelpoux/react-responsive-masonry/master.svg?style=flat-square
[build]: https://travis-ci.org/cedricdelpoux/react-responsive-masonry
[codecov-badge]: https://img.shields.io/codecov/c/github/cedricdelpoux/react-responsive-masonry.svg?style=flat-square
[codecov]: https://codecov.io/gh/cedricdelpoux/react-responsive-masonry
[module-formats]: https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20esm-green.svg?style=flat-square
[github-page]: https://cedricdelpoux.github.io/react-responsive-masonry
[github-issue]: https://github.com/cedricdelpoux/react-responsive-masonry/issues/new
