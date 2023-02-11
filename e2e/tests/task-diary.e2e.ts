import { element, expect } from "detox"

describe.only("Task Diary", function () {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true })
    await expect(element(by.id("login-screen"))).toBeVisible()
    await element(by.id("loginBtn")).tap()
    await expect(element(by.id("home-screen"))).toBeVisible()
    await element(by.text("My Tasks")).tap()
    await expect(element(by.id("my-tasks-screen"))).toBeVisible()
  })

  it("should show single pending task", async function () {
    await element(by.id("pending-tasks")).tap()
    await element(by.label("Pending task item")).atIndex(2).tap()
    await expect(element(by.id("task-screen"))).toBeVisible
  })
  it("should show single complete task", async function () {
    await element(by.id("finished-tasks")).tap()
    await element(by.label("Finished task item")).atIndex(2).tap()
    await expect(element(by.id("task-screen"))).toBeVisible()
  })
})
