# ResponsiveMasonry

The column count change dynamically. `ResponsiveMasonry` component inject it in `Masonry` component.

## Code

```js
import React from "react"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const images = [
    "https://picsum.photos/200/300?image=1050",
    //...
    "https://picsum.photos/300/300?image=206",
]

class MyWrapper extends React.Component {
    render() {
        return (
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                <Masonry>
                    {images.map((image, i) => (
                        <img
                            key={i}
                            src={image}
                            style={{width: "100%", display: "block"}}
                            alt=""
                        />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        )
    }
}
```

## Demo
