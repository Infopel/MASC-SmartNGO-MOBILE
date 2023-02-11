import Tron from "reactotron-react-native"
//@ts-ignore
import ReactotronFlipper from "reactotron-react-native/dist/flipper"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ArgType } from "reactotron-core-client"
import { RootStore } from "../../models/root-store/root-store"
import { onSnapshot } from "mobx-state-tree"
import { ReactotronConfig, DEFAULT_REACTOTRON_CONFIG } from "./reactotron-config"
import { mst } from "reactotron-mst"
import { clear } from "../../utils/storage"
import { goBack, resetRoot, navigate } from "../../navigators/navigation-utilities"
import { Platform } from "react-native"
import { resetDatabase } from "storage/database"
type ITron = Required<Pick<typeof Tron, "debug" | "log" | "clear" | "error" | "warn">> & typeof Tron

// Teach TypeScript about the bad things we want to do.
declare global {
  interface Console {
    /**
     * Hey, it's Reactotron if we're in dev, and no-ops if we're in prod.
     */
    tron: ITron
  }
}

/** Do Nothing. */
const noop = () => () => undefined

// in dev, we attach Reactotron, in prod we attach a interface-compatible mock.
if (__DEV__) {
  console.tron = Tron as ITron // attach reactotron to `console.tron`
} else {
  // attach a mock so if things sneaky by our __DEV__ guards, we won't crash.
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
}

/**
 * You'll probably never use the service like this since we hang the Reactotron
 * instance off of `console.tron`. This is only to be consistent with the other
 * services.
 */
export class Reactotron {
  config: ReactotronConfig

  rootStore: any

  /**
   * Create the Reactotron service.
   *
   * @param config the configuration
   */
  constructor(config: ReactotronConfig = DEFAULT_REACTOTRON_CONFIG) {
    // merge the passed in config with some defaults
    this.config = {
      host: "localhost",
      useAsyncStorage: true,
      ...config,
      state: {
        initial: false,
        snapshots: false,
        ...(config && config.state),
      },
    }
  }

  /**
   * Hook into the root store for doing awesome state-related things.
   *
   * @param rootStore The root store
   */
  setRootStore(rootStore: any, initialData: any) {
    if (__DEV__) {
      rootStore = rootStore as RootStore // typescript hack
      this.rootStore = rootStore

      if (!this.config.state) return

      const { initial, snapshots } = this.config.state
      const name = "ROOT STORE"

      // logging features
      if (initial) {
        console.tron.display({ name, value: initialData, preview: "Initial State" })
      }
      // log state changes?
      if (snapshots) {
        onSnapshot(rootStore, (snapshot) => {
          console.tron.display({ name, value: snapshot, preview: "New State" })
        })
      }

      console.tron.trackMstNode?.call(this, rootStore)
    }
  }

  /**
   * Configure reactotron based on the the config settings passed in, then connect if we need to.
   */
  async setup() {
    // only run this in dev... metro bundler will ignore this block: 🎉
    if (__DEV__) {
      // configure reactotron
      Tron.configure({
        name: this.config.name || require("../../../package.json").name,
        host: this.config.host,
        createSocket: (path) => new ReactotronFlipper(path),
      })

      // hookup middleware
      if (Platform.OS !== "web") {
        if (this.config.useAsyncStorage) {
          Tron.setAsyncStorageHandler?.call(this, AsyncStorage)
        }
        Tron.useReactNative({
          asyncStorage: this.config.useAsyncStorage ? undefined : false,
        })
      }

      // ignore some chatty `mobx-state-tree` actions
      const RX = /postProcessSnapshot|@APPLY_SNAPSHOT/

      // hookup mobx-state-tree middleware
      Tron.use(
        mst({
          filter: (event) => RX.test(event.name) === false,
        }),
      )

      // connect to the app
      Tron.connect()

      // Register Custom Commands
      Tron.onCustomCommand({
        title: "Reset Root Store",
        description: "Resets the MST store",
        command: "resetStore",
        handler: () => {
          console.tron.log?.call(this, "resetting store")
          clear()
        },
      })

      Tron.onCustomCommand({
        title: "Reset Navigation State",
        description: "Resets the navigation state",
        command: "resetNavigation",
        handler: () => {
          console.tron.log?.call(this, "resetting navigation state")
          resetRoot({ index: 0, routes: [] })
        },
      })
      Tron.onCustomCommand({
        title: "Reset WatermelonDB",
        description: "Resets Watermelon database data",
        command: "reset Database",
        handler: async () => {
          console.tron.log?.call(this, "resetting database data")
          await resetDatabase()
        },
      })

      Tron.onCustomCommand({
        command: "navigateTo",
        handler: (args) => {
          const { route } = args
          if (route) {
            console.log(`Navigating to: ${route}`)
            navigate(route)
          } else {
            console.log("Could not navigate. No route provided.")
          }
        },
        title: "Navigate To Screen",
        description: "Navigates to a screen by name.",
        args: [
          {
            name: "route",
            type: ArgType.String,
          },
        ],
      })

      Tron.onCustomCommand({
        title: "Go Back",
        description: "Goes back",
        command: "goBack",
        handler: () => {
          console.tron.log?.call(this, "Going back")
          goBack()
        },
      })

      // clear if we should
      if (this.config.clearOnLoad) {
        Tron.clear?.call(this)
      }
    }
  }
}
