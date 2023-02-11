import { element, expect, waitFor } from "detox"

describe.only("Civic Incubators", function () {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true })
    await expect(element(by.id("login-screen"))).toBeVisible()
    await element(by.id("loginBtn")).tap()
    await expect(element(by.id("home-screen"))).toBeVisible()
    await element(by.text("Civic Incubators")).tap()
    await expect(element(by.id("civic-incubators-screen"))).toBeVisible()
  })
  
  it("should create new civic incubator", async () => {
    await element(by.id("new-incubator")).tap()
    waitFor(element(by.id("new-civic-incubator-screen"))).toBeVisible()
    await element(by.id("name")).typeText("Incubadora")
    await element(by.id("province")).tap()
    await element(by.label("Maputo")).tap()
    await element(by.id("district")).tap()
    await element(by.label("KaMavota")).tap()
    await element(by.id("admin-post")).tap()
    await element(by.label("Algum1")).tap()
    await element(by.id("laltitude")).typeText("31,7896542")
    await element(by.id("longitude")).typeText("32,7596542")
    await element(by.id("save")).tap()
    waitFor(element(by.id("new-civic-incubator-screen"))).not.toBeVisible()
  })
  it("should return home", async () => {
    await element(by.id('back')).tap()
    await expect(element(by.id("civic-incubators-screen"))).not.toBeVisible()
  })
  it("should remove civic incubator from list", async () => {
    await element(by.label("Delete civic incubator item")).atIndex(2).tap()
    await expect(element(by.label("Delete civic incubator item")).atIndex(2)).not.toBeVisible()
  })

  it("should filter civic incubator from list", async () => {
    await element(by.id("filter-incubators")).typeText("incuba")
    await expect(element(by.label("Delete civic incubator item")).atIndex(1)).not.toBeVisible()
    //TODO expectation with jest
    // const items = await element(by.label("Civic incubator item")).getAttributes()
    // console.log({items})
    // // const jestExpect = require("expect")
    // jestExpect(items).to
  })
  
})
