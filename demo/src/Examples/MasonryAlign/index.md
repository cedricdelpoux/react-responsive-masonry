# Masonry Align Columns

it make your columns align

## Code

```js
import React from "react"
import Masonry from "react-responsive-masonry"

const images = [
    "https://picsum.photos/200/300?image=1050",
    //...
    "https://picsum.photos/300/300?image=206",
]

class MyWrapper extends React.Component {
    render() {
        return (
            <Masonry alignColumns={true} columnsCount={3} gutter="10px">
                {images.map((image, i) => (
                    <img
                        key={i}
                        src={image}
                        style={{height: 200, width: "100%", display: "block"}}
                    />
                ))}
            </Masonry>
        )
    }
}
```

## Demo
