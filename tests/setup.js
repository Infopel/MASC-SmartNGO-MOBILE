// import {afterEach} from '@jest/globals'
import "react-native-gesture-handler/jestSetup"
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock"
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)
// jest.mock("react-native-reanimated", () => {
//   const Reanimated = require("react-native-reanimated/mock")

//   // The mock for `call` immediately calls the callback which is incorrect
//   // So we override it with a no-op
//   Reanimated.default.call = () => {}

//   return Reanimated
// })

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper")
jest.mock("../app/services/storage/adapter.ts")
jest.mock("react-native-safe-area-context", () => mockSafeAreaContext)

jest.mock("react-native-geolocation-service", () => ({
  requestAuthorization: jest.fn(),
  getCurrentPosition: jest.fn(),
}))

jest.mock("react-native-image-crop-picker", () => ({
  openCamera: jest.fn().mockReturnValue(Promise.resolve({ path: "newImage" })),
}))

jest.mock("react-native-keychain", () => ({
  SECURITY_LEVEL_ANY: "MOCK_SECURITY_LEVEL_ANY",
  SECURITY_LEVEL_SECURE_SOFTWARE: "MOCK_SECURITY_LEVEL_SECURE_SOFTWARE",
  SECURITY_LEVEL_SECURE_HARDWARE: "MOCK_SECURITY_LEVEL_SECURE_HARDWARE",
  setGenericPassword: jest.fn().mockResolvedValue,
  getGenericPassword: jest.fn().mockResolvedValue,
  resetGenericPassword: jest.fn().mockResolvedValue,
  getInternetCredentials: jest.fn().mockResolvedValue(true),
  getSupportedBiometryType: jest.fn().mockResolvedValue(true),
  setInternetCredentials: jest.fn().mockResolvedValue(true),
  ACCESS_CONTROL: { BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE: "mockedpwd" },
  ACCESSIBLE: { WHEN_PASSCODE_SET_THIS_DEVICE_ONLY: true },
}))

console.tron = {
  log: console.log,
  debug: console.debug,
  error: console.error,
  warn: console.warn
}