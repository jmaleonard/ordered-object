import { updateObject, OrderedObject, getKey } from "../src"

describe("some initial tests", () => {
  let orderedObject: OrderedObject;
  beforeEach(() => {
    orderedObject = {
      a: 's',
      indexedKeys: [],
      maxPropertyCount: 2
    };
  })

  it("updates the object", () => {
    updateObject(orderedObject, "x", { b: "b" });
    expect(orderedObject).toMatchObject({
      a: 's',
      indexedKeys: ["x", "a"],
      maxPropertyCount: 2,
      x: { b: "b" }
    })
  })
  it("updates the index of the object when the same key is updated", () => {
    updateObject(orderedObject, "x", { b: "b" });
    expect(orderedObject).toMatchObject({
      a: 's',
      indexedKeys: ["x", "a"],
      maxPropertyCount: 2,
      x: { b: "b" }
    })
    updateObject(orderedObject, "a", 1);
    expect(orderedObject).toMatchObject({
      a: 1,
      indexedKeys: ["a", "x"],
      maxPropertyCount: 2,
      x: { b: "b" }
    })
  })

  it("gets a key", () => {
    updateObject(orderedObject, "x", { b: "b" });
    expect(orderedObject).toMatchObject({
      a: 's',
      indexedKeys: ["x", "a"],
      maxPropertyCount: 2,
      x: { b: "b" }
    })
    updateObject(orderedObject, "a", 1);
    console.log(orderedObject);
    expect(getKey(orderedObject, "a")).toEqual(1)
  })

  it("it trims last inserted objects", () => {
    updateObject(orderedObject, "x", { b: "b" });
    expect(orderedObject).toMatchObject({
      a: 's',
      indexedKeys: ["x", "a"],
      maxPropertyCount: 2,
      x: { b: "b" }
    })
    updateObject(orderedObject, "a", 1);
    updateObject(orderedObject, "b", 1);
    expect(orderedObject).toMatchObject({
      a: 1,
      indexedKeys: ["b", "a"],
      maxPropertyCount: 2,
      b: 1
    })
  })
})
