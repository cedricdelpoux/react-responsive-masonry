# react-responsive-masonry ![npm](https://img.shields.io/npm/v/react-responsive-masonry.svg) ![license](https://img.shields.io/npm/l/react-responsive-masonry.svg) ![github-issues](https://img.shields.io/github/issues/xuopled/react-responsive-masonry.svg)

React responsive masonry component built with css flexbox with no dependencies

## Install

```sh
npm install --save react-responsive-masonry
```

## Example

![React-responsive-masonry gif](/screenshots/example.gif)

## Usage

If you want the number of columns change by resizing the window, you need to wrap the `Masonry` component by the `ResponsiveMasonry` component.
Otherwise, you only need to use the `Masonry` component.

```js
import React, {Component} from "react"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const images = [
    "https://unsplash.it/200/300?image=1050",
    "https://unsplash.it/400/400?image=1039",
    "https://unsplash.it/400/300?image=1017",
    "https://unsplash.it/200/200?image=997",
    "https://unsplash.it/500/400?image=287",
    "https://unsplash.it/400/500?image=955",
    "https://unsplash.it/200/300?image=916",
    "https://unsplash.it/300/300?image=110",
    "https://unsplash.it/300/300?image=206",
]

// The number of columns change by resizing the window
class MyWrapper extends Component {
  render() {
    return (
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
        	<Masonry>
        		{images.map((image, i) =>
        			<img key={i} src={image} style={{width: "100%", display: "block"}} />
        		)}
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
    		{images.map((image, i) =>
    			<img key={i} src={image} style={{width: "100%", display: "block"}} />
    		)}
    	</Masonry>
    )
  }
}
```

## Props

### Mansonry component
  * `columnsCount`: Number - injected by ResponsiveMasonry - default 3,

### ResponsiveMasonry component
  * `columnsCountBreakPoints`: Object, keys are breakpoints in px, values are the columns number - default {350: 1, 750: 2, 900: 3},

## Development

### Clean `lib` and `dist` folders

```js
npm run clean
```

### Build `lib` folder

```js
npm run build
```

### Build `dist` folder

```js
npm run dist
```

### Watch `src` folder

```js
npm run watch
```

### Lint `src` folder

```js
npm run lint
```

## Changelog

See [changelog](./CHANGELOG.md)

## License

See [MIT](./LICENCE)
