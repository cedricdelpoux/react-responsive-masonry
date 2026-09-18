import {default as DefaultMasonry, Masonry, ResponsiveMasonry} from "./"

describe("package entry point", () => {
  it("exposes Masonry both as the default export and as a named export", () => {
    expect(Masonry).toBe(DefaultMasonry)
    expect(typeof Masonry).toBe("function")
  })

  it("exposes ResponsiveMasonry as a named export", () => {
    expect(typeof ResponsiveMasonry).toBe("function")
  })
})
