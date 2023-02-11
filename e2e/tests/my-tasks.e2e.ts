import { element, expect } from "detox"

describe.only("My Tasks", function () {
  beforeEach(async () => {
    await device.launchApp({newInstance: true})
    await expect(element(by.id("login-screen"))).toExist()
    await element(by.id("loginBtn")).tap()
    await expect(element(by.id("home-screen"))).toExist()
    await element(by.text("My Tasks")).tap()
  })

  it("should have a My tasks screen", async function () {
    await expect(element(by.id("my-tasks-screen"))).toExist()
  })
  it("should show pending tasks", async function () {
    await expect(element(by.text("Pending"))).toExist()
  })
  it("should show finished tasks", async function () {
    await expect(element(by.text("Finished"))).toExist()
  })
  it("should show filtered pending tasks", async function () {
    await expect(element(by.text("Pending"))).toExist()
    await element(by.id("filter-tasks")).typeText("some task")
  })
  it("should show filtered finished tasks", async function () {
    await expect(element(by.text("Finished"))).toExist()
    await element(by.id("filter-tasks")).typeText("some task")
  })
})
