/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    $0: 'jest',
    args: {
      config: 'e2e/jest.config.js',
      _: ['e2e'],
    },
  },
  jest: {
    setupTimeout: 120000,
    reportSpecs: false,
    reportWorkerAssign: false,
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 11',
      },
    },
    emulator: {
      type: 'android.attached',
      device: {
        adbName: 'emulator-5554',
      },
    },
    'android.genycloud': {
      type: 'android.attached',
      device: {
        recipeUUID: '11111111-2222-3333-4444-555555555555',
        // or recipeName: "MyRecipeName",
      },
    },
    'android.attached': {
      type: 'android.attached',
      device: {
        adbName: 'R9PRA05C9XX',
      },
    },
  },

  apps: {
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build:
        'cd android && gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build:
        'cd android && gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..',
    },
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug',
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release',
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug',
    },
    'android.att.release': {
      device: 'android.attached',
      app: 'android.release',
    },
    'android.att.debug': {
      device: 'android.attached',
      app: 'android.debug',
    },
    'android.genymotion.release': {
      device: 'android.genycloud',
      app: 'android.release',
    },
  },
  behavior: {
    init: {
      reinstallApp: true,
      exposeGlobals: true,
    },
    launchApp: 'auto',
    cleanup: {
      shutdownDevice: false,
    },
  },
};
