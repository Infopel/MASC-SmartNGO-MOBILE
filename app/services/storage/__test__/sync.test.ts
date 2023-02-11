import { database } from "storage/database"
import { Location } from "storage/models/location"
import { User } from "storage/models/user"
import { Initiative } from "storage/models/initiative"
import { sync } from "./../sync"

describe("Sync", () => {
  it("should sync", async () => {
    await sync()
    const countLocation = await database.collections.get(Location.table).query().fetchCount()
    const countUsers = await database.collections.get(User.table).query().fetchCount()
    const countInitiatives = await database.collections.get(Initiative.table).query().fetchCount()
    expect(countLocation).toBe(12)
    expect(countUsers).toBe(0)
    expect(countInitiatives).toBe(0)
  })
})
