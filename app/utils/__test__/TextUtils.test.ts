import { TextUtils } from "../TextUtils"
describe("Get Text initials", () => {
  it("should return an empty text if no text is given", () => {
    expect(TextUtils.getInitials("")).toBe("")
  })
  it("should return first letter of each word from a string of one", () => {
    expect(TextUtils.getInitials("John")).toBe("J")
  })
  it("should return first letter of each word from a string of two words", () => {
    expect(TextUtils.getInitials("John Doe")).toBe("JD")
  })
  it("should return first letter of each word from a string of three words", () => {
    expect(TextUtils.getInitials("John Marcos Doe")).toBe("JD")
  })

  it("should return first letter of each word from a string of four words", () => {
    expect(TextUtils.getInitials("John Marcos Antonio Doe")).toBe("JD")
  })
})

describe("isNumber", () => {
  it("should take a number and return true", () => {
    const num = 5
    const res = TextUtils.isNumber(num)
    expect(res).toBe(true)
  })
  it("should take a string-number and return true", () => {
    const num = "5"
    const res = TextUtils.isNumber(num)
    expect(res).toBe(true)
  })
  it("should take a string-text and return false", () => {
    const num = "ola"
    const res = TextUtils.isNumber(num)
    expect(res).toBe(false)
  })
  it("should take a string-text containing a number and return false", () => {
    const num = "5la"
    const res = TextUtils.isNumber(num)
    expect(res).toBe(false)
  })
  it("should take a boolean and return false", () => {
    const num = false
    const res = TextUtils.isNumber(num)
    expect(res).toBe(false)
  })
  it("should take a obj and return false", () => {
    const num = {}
    const res = TextUtils.isNumber(num)
    expect(res).toBe(false)
  })
})

describe("Parse Money", () => {
  it("should return 0 MT if 0 is given", () => {
    expect(TextUtils.parseMoney(0)).toBe("0 MT")
  })
  it("should return 1 MT if 1 is given", () => {
    expect(TextUtils.parseMoney(1)).toBe("1 MT")
  })
  it("should return Mil if 1000 is given", () => {
    expect(TextUtils.parseMoney(1000)).toBe("Mil MT")
  })
  it("should return 500 Mil if 500000 is given", () => {
    expect(TextUtils.parseMoney(500000)).toBe("500 Mil MT")
  })
  it("should return 0,75 Milhões MT if 750000 is given", () => {
    expect(TextUtils.parseMoney(750000)).toBe("0,75 Milhões MT")
  })
  it("should return 1 Milhão if 1000 is given", () => {
    expect(TextUtils.parseMoney(1000000)).toBe("1 Milhão MT")
  })
  it("should return 2 Milhões if 1000 is given", () => {
    expect(TextUtils.parseMoney(2000000)).toBe("2 Milhões MT")
  })
  it("should return 500 Milhões if 1000 is given", () => {
    expect(TextUtils.parseMoney(500000000)).toBe("500 Milhões MT")
  })
  it("should return 1 Mil Milhão if 1000 is given", () => {
    expect(TextUtils.parseMoney(1000000000)).toBe("1 Mil Milhão MT")
  })
  it("should return 2 Mil Milhões if 1000 is given", () => {
    expect(TextUtils.parseMoney(2000000000)).toBe("2 Mil Milhões MT")
  })
  it("should return 500 Mil Milhões if 1000 is given", () => {
    expect(TextUtils.parseMoney(500000000000)).toBe("500 Mil Milhões MT")
  })
  it("should return 1 Bilhão if 1000 is given", () => {
    expect(TextUtils.parseMoney(1000000000000)).toBe("1 Bilhão MT")
  })
  it("should return 2 Bilhões if 1000 is given", () => {
    expect(TextUtils.parseMoney(2000000000000)).toBe("2 Bilhões MT")
  })
  it("should return 500 Bilhões if 1000 is given", () => {
    expect(TextUtils.parseMoney(500000000000000)).toBe("500 Bilhões MT")
  })
})
describe("Parse Weight", () => {
  it("should return 0,5 g if 0.5 is inserted", () => {
    expect(TextUtils.parseWeight(0.5)).toBe("0,5 g")
  })
  it("should return 0 g if 0 is inserted", () => {
    expect(TextUtils.parseWeight(0)).toBe("0 g")
  })
  it("should return 1 g if 1 is inserted", () => {
    expect(TextUtils.parseWeight(1)).toBe("1 g")
  })
  it("should return 1,5 g if 1.5 is inserted", () => {
    expect(TextUtils.parseWeight(1.5)).toBe("1,5 g")
  })
  it("should return 10 g if 10 is inserted", () => {
    expect(TextUtils.parseWeight(10)).toBe("10 g")
  })
  it("should return 100 g if 100 is inserted", () => {
    expect(TextUtils.parseWeight(100)).toBe("100 g")
  })
  it("should return 1,2 kg if 1000 is inserted", () => {
    expect(TextUtils.parseWeight(1200)).toBe("1,2 kg")
  })
  it("should return 0.75 kg if 750 is inserted", () => {
    expect(TextUtils.parseWeight(750)).toBe("0,75 kg")
  })
  it("should return 1 kg if 1000 is inserted", () => {
    expect(TextUtils.parseWeight(1000)).toBe("1 kg")
  })
  it("should return 10 kg if 10000 is inserted", () => {
    expect(TextUtils.parseWeight(10000)).toBe("10 kg")
  })
  it("should return 0.75 t if 750000  is inserted", () => {
    expect(TextUtils.parseWeight(750000)).toBe("0,75 t")
  })
  it("should return 1 t if 1000000  is inserted", () => {
    expect(TextUtils.parseWeight(1000000)).toBe("1 t")
  })
  it("should return 1,5 t if 1500000 is inserted", () => {
    expect(TextUtils.parseWeight(1500000)).toBe("1,5 t")
  })
  it("should return 10 t if 10000000 is inserted", () => {
    expect(TextUtils.parseWeight(10000000)).toBe("10 t")
  })
})

describe("replace number separator", () => {
  it("should take a number and add 2 decimal places", () => {
    expect(TextUtils.replaceNumberSeparator(5, 2)).toBe("5,00")
  })
  it("should take a decimal number and return a comma instead of a dot", () => {
    expect(TextUtils.replaceNumberSeparator(0.5)).toBe("0,5")
  })
  it("should take a a number with four decimal and return a 1 decimal", () => {
    expect(TextUtils.replaceNumberSeparator(5.5555, 1)).toBe("5,6")
  })
  it("should take a decimal number and return rounded number", () => {
    expect(TextUtils.replaceNumberSeparator(5.5, 0)).toBe("6")
  })
})

describe("Stringify Number", () => {
  it("should take a number and add 2 decimal places and return with a comma", () => {
    expect(TextUtils.stringifyNumber(5.75)).toBe("5,75")
  })
  it("should take a number without a decimal places and return the same", () => {
    expect(TextUtils.stringifyNumber(5)).toBe("5")
  })
  it("should take a a number with four decimal and return with two", () => {
    expect(TextUtils.stringifyNumber(5.5555)).toBe("5,56")
  })
  it("should take a a number with one decimal and return the same", () => {
    expect(TextUtils.stringifyNumber(5.6)).toBe("5,6")
  })
})
