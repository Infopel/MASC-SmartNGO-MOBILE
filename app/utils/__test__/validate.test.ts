import { validate } from "utils/validate"
describe("Text", () => {
  it("should set required text as valid if string is not empty", () => {
    expect(validate({ type: "text" }, "simple text", true)).toBeUndefined()
  })
  it("should set error message is string is empty", () => {
    expect(validate({ type: "text" }, "", true)).toBeTruthy()
  })
  it("should set error message is string is 'undefined'", () => {
    expect(validate({ type: "text" }, undefined, true)).toBeTruthy()
  })
  it("should set text as valid if string is not empty", () => {
    expect(validate({ type: "text" }, "simple text", false)).toBeUndefined()
  })
  it("should set text as valid if string is empty", () => {
    expect(validate({ type: "text" }, " ", false)).toBeUndefined()
  })
  it("should set text as valid if string is 'undefined'", () => {
    expect(validate({ type: "text" }, undefined, false)).toBeUndefined()
  })
  it("should set error message is less than 5 chars ", () => {
    expect(validate({ type: "text", min: 5 }, "1234", false)).toBeTruthy()
  })
  it("should set error message is more than 3 chars ", () => {
    expect(validate({ type: "text", max: 5 }, "qwer", false)).toBeUndefined()
  })
  it("should set text as valid if between 3-5 chars ", () => {
    expect(validate({ type: "text", max: 5, min: 3 }, "qwer", false)).toBeUndefined()
  })
})

describe("Number", () => {
  it("should set as valid is number is less than 10", () => {
    expect(validate({ type: "number", max: 10 }, 9, false)).toBeUndefined()
  })

  it("shoud set error if no number is inputed and required is true", () => {
    expect(validate({ type: "number", max: 10 }, undefined, true)).toBeTruthy()
  })

  it("shoud set as valid if no number is inputed and required is false", () => {
    expect(validate({ type: "number", max: 10 }, undefined, false)).toBeUndefined()
  })

  it("shoud set is valid if number less or equal than 12", () => {
    expect(validate({ type: "number", max: 12 }, 11, false)).toBeUndefined()
  })

  it("shoud set isValid if number greater or equal  12", () => {
    expect(validate({ type: "number", min: 12 }, 13, false)).toBeUndefined()
  })
})
describe("POSITiVE - Number", () => {
  it("should set as valid is number is less than 10", () => {
    expect(validate({ type: "positive-number", max: 10 }, 9, false)).toBeUndefined()
  })

  it("shoud set error if no number is inputed and required is true", () => {
    expect(validate({ type: "positive-number", max: 10 }, undefined, true)).toBeTruthy()
  })
  it("shoud set error if number is negative", () => {
    expect(validate({ type: "positive-number" }, -10, true)).toBeTruthy()
  })

  it("shoud set as valid if no number is inputed and required is false", () => {
    expect(validate({ type: "positive-number", max: 10 }, undefined, false)).toBeUndefined()
  })

  it("shoud set is valid if number less or equal than 12", () => {
    expect(validate({ type: "positive-number", max: 12 }, 11, false)).toBeUndefined()
  })

  it("shoud set isValid if number greater or equal  12", () => {
    expect(validate({ type: "positive-number", min: 12 }, 13, false)).toBeUndefined()
  })
})

describe("Date", () => {
  it("shoud set as valid if date is is required and is not empty", () => {
    const date = Date.parse("12/12/2020")
    expect(validate({ type: "date" }, date, true)).toBeUndefined()
  })

  it("shoud set as valid if date is is not required and is empty", () => {
    expect(validate({ type: "date" }, undefined, false)).toBeUndefined()
  })

  it("shoud set as error if date is is required and is empty", () => {
    expect(validate({ type: "date" }, undefined, true)).toBeTruthy()
  })

  it("shoud set as error if date is before 02/05/2011", () => {
    const date = Date.parse("01/05/2011")
    const beforeDate = Date.parse("02/05/2011")
    expect(validate({ type: "date", min: beforeDate }, date, false)).toBeTruthy()
  })

  it("shoud set as error if date is after 04/06/2013", () => {
    const date = Date.parse("05/06/2013")
    const afterDate = Date.parse("04/06/2013")
    expect(validate({ type: "date", max: afterDate }, date, false)).toBeTruthy()
  })
})

describe("List", () => {
  it("shoud set as valid if list is required and is not empty", () => {
    expect(validate({ type: "list" }, ["item"], true)).toBeUndefined()
  })

  it("shoud set as valid if list is not required and is empty", () => {
    expect(validate({ type: "list" }, undefined, false)).toBeUndefined()
  })

  it("shoud set as error if list is required and is empty", () => {
    expect(validate({ type: "list" }, undefined, true)).toBeTruthy()
  })

  it("shoud set as error if list is less than 2 items", () => {
    expect(validate({ type: "list", min: 2 }, ["item"], false)).toBeTruthy()
  })

  it("shoud set as error if list is more than 3 items", () => {
    expect(validate({ type: "list", max: 3 }, ["item", "item", "item", "item"], false)).toBeTruthy()
  })
})

describe("Telephone", () => {
  it("should set as valid if telephone is required and is not empty", () => {
    expect(validate({ type: "tel" }, "+258841234567", true)).toBeUndefined()
  })

  it("should set as valid if telephone is not required and is empty", () => {
    expect(validate({ type: "tel" }, "", false)).toBeUndefined()
  })

  it("should set as error if telephone is required and is empty", () => {
    expect(validate({ type: "tel" }, "", true)).toBeTruthy()
  })
  it("should set as error if telephone is required and is undefined", () => {
    expect(validate({ type: "tel" }, undefined, true)).toBeTruthy()
  })
  it("should set as valid if telephone is not required and is undefined", () => {
    expect(validate({ type: "tel" }, undefined, false)).toBeUndefined()
  })

  it("should set as error if telephone is not valid", () => {
    expect(validate({ type: "tel" }, "+2588412", false)).toBeTruthy()
  })

  it("should set as valid if tmcel phone number line1  is valid", () => {
    expect(validate({ type: "tel" }, "+258821234567", false)).toBeUndefined()
  })
  it("should set as valid if tmcel phone number line2 is valid", () => {
    expect(validate({ type: "tel" }, "+258831234567", false)).toBeUndefined()
  })

  it("should set as valid if Vodacom phone number line1 is valid", () => {
    expect(validate({ type: "tel" }, "+258841234567", false)).toBeUndefined()
  })
  it("should set as valid if Vodacom phone number line2 is valid", () => {
    expect(validate({ type: "tel" }, "+258851234567", false)).toBeUndefined()
  })
  it("should set as valid if Movitel phone number line1 is valid", () => {
    expect(validate({ type: "tel" }, "+258861234567", false)).toBeUndefined()
  })
  it("should set as valid if Movitel phone number line2 is valid", () => {
    expect(validate({ type: "tel" }, "+258871234567", false)).toBeUndefined()
  })
})
