import { Environment } from "models/environment";
import { SyncApi } from "./sync-api";

describe("Sync Api", () => {
  // beforeAll(() => {
  //   // timers.setTimeout(() => jest.runOnlyPendingTimers(), 1)
  // })
  // afterAll(() => jest.useRealTimers())
  it("should push", async () => {
    const env = new Environment()
    await env.setup()
    const api = new SyncApi(env.api)
    const response = await api.push({}, 0)
    expect(response.kind).toBe("ok")
  })
  it("should pull", async () => {
    const env = new Environment()
    await env.setup()
    const api = new SyncApi(env.api)
    const response = await api.pull(0, 1, null)

    expect(response.kind).toBe("ok")
  })

})
