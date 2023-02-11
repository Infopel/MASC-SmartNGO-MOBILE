import AsyncStorage from "@react-native-async-storage/async-storage"
import { load, loadString, save, saveString, clear, remove } from "./storage"

// fixtures
const VALUE_OBJECT = { x: 1 }
const VALUE_STRING = JSON.stringify(VALUE_OBJECT)

// jest.mock("@react-native-async-storage/async-storage", function () {
//   return {
//     load: async (...args: Parameters<any>) => VALUE_OBJECT,
//     save: async (...args: Parameters<any>) => VALUE_STRING,
//     saveString: async (...args: Parameters<any>) => args,
//     getItem: async (...args: Parameters<any>) => VALUE_OBJECT,
//     setItem: async (...args: Parameters<any>) => args,
//     removeItem: async (...args: Parameters<any>) => args,
//     remove: async (...args: Parameters<any>) => args,
//     clear: jest.fn(),
//   }
// })
beforeEach(() => () => {})

afterEach(() => jest.clearAllMocks())

test("load", async () => {
  const value = await load("something")
  expect(value).toBeNull();
})

test("loadString", async () => {
  const value = await loadString("something")
  expect(value).toBeNull()
})

test("save", async () => {
  await save("something", VALUE_OBJECT)
  expect(AsyncStorage.setItem).toHaveBeenCalledWith("something", VALUE_STRING)
})

test("saveString", async () => {
  await saveString("something", VALUE_STRING)
  expect(AsyncStorage.setItem).toHaveBeenCalledWith("something", VALUE_STRING)
})

test("remove", async () => {
  await remove("something")
  expect(AsyncStorage.removeItem).toHaveBeenCalledWith("something")
})

test("clear", async () => {
  await clear()
  expect(AsyncStorage.clear).toHaveBeenCalledWith()
})
