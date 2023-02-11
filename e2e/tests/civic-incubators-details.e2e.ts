import { element, expect } from "detox";

describe.only("Civic Incubators Details", function () {
  beforeEach(async () => {
    await(require('storage/queries/__mock__/civic-incubators')).populateFindAllCivicIncubators()
    await device.launchApp({ newInstance: true })
    await expect(element(by.id("login-screen"))).toBeVisible()
    await element(by.id("loginBtn")).tap()
    await expect(element(by.id("home-screen"))).toBeVisible()
    await element(by.text("Civic Incubators")).tap()
    await expect(element(by.id("civic-incubators-screen"))).toBeVisible()
    await element(by.id("civic-incubator-item")).atIndex(2).tap()
    await expect(element(by.id("civic-incubator-details-screen"))).toBeVisible()
  })

  afterEach(async () => await(await import('storage/database')).resetDatabase())
  it("should show civic incubator participants", async () => {
    await element(by.id("paticipants")).tap()
  })
  it("should remove civic incubator participants", async () => {
    await element(by.id("paticipants")).tap()
    await element(by.id("remove-paticipant")).atIndex(2).tap()
  })
  it("should show civic incubator events", async () => {
    await element(by.id("events")).tap()
  })
  it("should show civic incubator realized events", async () => {
    await element(by.id("events")).tap()
    await element(by.id("finished-events")).tap()
  })
  it("should show civic incubator pending events", async () => {
    await element(by.id("events")).tap()
    await element(by.id("pending-events")).tap()
  })
  it("should add civic incubator events", async () => {
    await element(by.id("events")).tap()
    await element(by.id("add-event")).tap()
    await expect(element(by.id("form-screen"))).toBeVisible()

    //TODO - add events form
  })

  it("should add civic incubator participant", async () => {
    await element(by.id("participant")).tap()
    await element(by.id("add-participant")).tap()
    await expect(element(by.id("form-screen"))).toBeVisible()

    //TODO - add participant form
  })
})
