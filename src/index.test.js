import {default as DefaultMasonry, Masonry, ResponsiveMasonry} from "./"

describe("package entry point", () => {
  it("exposes Masonry both as the default export and as a named export", () => {
    expect(Masonry).toBe(DefaultMasonry)
    expect(Masonry.$$typeof).toBe(Symbol.for("react.forward_ref"))
  })

  it("exposes ResponsiveMasonry as a named export", () => {
    expect(typeof ResponsiveMasonry).toBe("function")
  })
})
