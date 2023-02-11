import { TextFormatter } from "../TextFormatter"

describe("clearAllFormatting", () => {
  it("should take a 1 000 and return 1000", () => {
    expect(TextFormatter.clearAllFormatting("1 000")).toBe("1000")
  })
  it("should take a 1 000 000 and return 1000000", () => {
    expect(TextFormatter.clearAllFormatting("1 000 000")).toBe("1000000")
  })
  it("should take a 1 000 000.02 and return 1000000.02", () => {
    expect(TextFormatter.clearAllFormatting("1 000 000.02")).toBe("1000000.02")
  })
  it("should take a 1 000.82 and return 1000000.02", () => {
    expect(TextFormatter.clearAllFormatting("1 000.82")).toBe("1000.82")
  })
})
describe("formatToMoney", () => {})
describe("formatToNumeric", () => {
  it("should take a 1000 and output '1 000'", () => {
    expect(TextFormatter.formatToNumeric("100", "0")).toBe("1 000")
  })
  it("should take a 1000000 and output '1 000 000'", () => {
    expect(TextFormatter.formatToNumeric("100000", "0")).toBe("1 000 000")
  })
  it("should take a 1000000 and output '1 000 000 000'", () => {
    expect(TextFormatter.formatToNumeric("100000000", "0")).toBe("1 000 000 000")
  })
  it("should take a 1000000.5 and output '1 000 000 000.5'", () => {
    expect(TextFormatter.formatToNumeric("1000000000.", "5")).toBe("1 000 000 000.5")
  })
  it("should take a 1000000.532 and output '1 000 000 000.532'", () => {
    expect(TextFormatter.formatToNumeric("1000000000.53", "2")).toBe("1 000 000 000.532")
  })
  it("should take a 1000000. and output '1 000 000 000.'", () => {
    expect(TextFormatter.formatToNumeric("1000000000", ".")).toBe("1 000 000 000.")
  })
})
describe("formatToPhoneNumber", () => {
  it("should take takes a 841234567 and return 84 123 4567", () => {
    expect(TextFormatter.formatToPhoneNumber("84123456", "7")).toBe("84 123 4567")
  })
  it("should take takes a 841234567 and return 84 123 456", () => {
    expect(TextFormatter.formatToPhoneNumber("84123456", "")).toBe("84 123 456")
  })
  it("should take takes a 841234567 and return 84 123", () => {
    expect(TextFormatter.formatToPhoneNumber("84123", "")).toBe("84 123")
  })
})
