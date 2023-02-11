import { element, expect, by } from "detox"

describe("Login", function () {
  beforeEach(async function () {
    await device.launchApp({ newInstance: true })
  })

  it("should have a login screen", async function () {
    await expect(element(by.id("login-screen"))).toExist()
  })

  it("should set email and password and then open dashboard screen", async function () {
    await element(by.id("email")).typeText("paulo@mail.com")
    await element(by.id("password")).typeText("Qwerty123456")
    const errorLabel = await element(by.id("error-message")).getAttributes()
    // console.log({ errorLabel })
    // const jestExpect = require("expect")
    // jestExpect(errorLabel).toBe(false)
    await element(by.id("loginBtn")).tap()
    await expect(element(by.id("login-screen"))).not.toExist()
  })
})
