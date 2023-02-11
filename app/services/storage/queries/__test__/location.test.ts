import { TestScheduler } from "rxjs/testing"
import { resetDatabase, database } from "storage/database"
import { findAllDistricts, findAllProvinces } from "../location"
import { getAllDistricts, getAllProvinces, populateFindAllLocations } from "../__mock__/location"
describe("Query Distrits", () => {
  let testScheduler: TestScheduler

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })
  })

  afterEach(async () => await resetDatabase())
  it("should return an empty list", () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable, cold } = helpers
      const source$ = findAllDistricts(database)
      expectObservable(source$).toEqual(cold("a", { a: [] }))
    })
  })
  it("should list districts", async () => {
    await populateFindAllLocations()
    testScheduler.run((helpers) => {
      const { hot, expectObservable } = helpers
      const source$ = findAllDistricts(database)
      expectObservable(source$).toEqual(hot("z", { z: getAllDistricts() }))
    })
  })
})
describe("Query Provinces", () => {
  let testScheduler: TestScheduler

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })
  })

  afterEach(async () => await resetDatabase())
  it("should return an empty list", () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable, cold } = helpers
      const source$ = findAllProvinces(database)
      expectObservable(source$).toEqual(cold("a", { a: [] }))
    })
  })
  it("should list provinces", async () => {
    await populateFindAllLocations()
    testScheduler.run((helpers) => {
      const { hot, expectObservable } = helpers
      const source$ = findAllProvinces(database)
      expectObservable(source$).toEqual(hot("z", { z: getAllProvinces() }))
    })
  })
})
