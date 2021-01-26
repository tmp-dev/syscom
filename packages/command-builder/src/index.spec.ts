import IndexClass from "./index"

/**
 * Dummy test
 */
describe("Index test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("DummyClass is instantiable", () => {
    expect(new IndexClass()).toBeInstanceOf(IndexClass)
  })
})
