const { beforeAll, afterEach, afterAll } = require("@jest/globals")
import { cleanup } from "@testing-library/react-native"
import { server } from "../app/services/api/mock/server"

jest.mock("../app/services/storage/adapter")

// required to implement fetch within node tests
global.fetch = require("node-fetch")

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen()
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

afterEach(cleanup)

// Clean up after the tests are finished.
afterAll(() => server.close())


jest.mock('react-native-image-crop-picker', () => ({
  openCamera: () => Promise.resolve([{
    path: "simple-image5",
    size: 45000,
    width: 1080,
    height: 1980,
  }])

}))


const noop = () => {}

console.tron = {
  benchmark: undefined,
  clear: console.clear,
  close: noop,
  //@ts-ignore
  connect: noop,
  display: noop,
  error: console.error,
  debug: console.debug,
  image: noop,
  log: console.log,
  logImportant: noop,
  onCustomCommand: (command) => () => {},
  overlay: noop,
  reportError: noop,
  send: noop,
  startTimer: () => () => 0,
  storybookSwitcher: (root) => () => null,
  //@ts-ignore
  use: noop,
  //@ts-ignore
  useReactNative: noop,
  warn: console.warn,
}
module.exports = {}
