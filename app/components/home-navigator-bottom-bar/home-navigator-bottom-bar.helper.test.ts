import { findIconName } from "./home-navigator-bottom-bar.helper"

describe("findIconName", () => {
  it('should take "home" and a valid icon', () => {
    expect(findIconName("home")).toBeTruthy()
  })
  it('should take "search" and a valid icon', () => {
    expect(findIconName("search")).toBeTruthy()
  })
  it('should take "stats" and a valid icon', () => {
    expect(findIconName("stats")).toBeTruthy()
  })
  it('should take "settings" and a valid icon', () => {
    expect(findIconName("settings")).toBeTruthy()
  })
  it('should take "sync" and a valid icon', () => {
    expect(findIconName("sync")).toBeTruthy()
  })
})
