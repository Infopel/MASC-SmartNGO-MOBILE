import Adapter from "@nozbe/watermelondb/adapters/sqlite"
import migrations from "./migrations"
import { schema } from "./schema"


// First, create the adapter to the underlying database:
const adapter = new Adapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  // migrations,
  // (optional database name or file system path)
  dbName: 'smartngo',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  // jsi: true /* Platform.OS === 'ios' */,
  // (optional, but you should implement this method)
  onSetUpError: (error) => {
    //TODO Database failed to load -- offer the user to reload the app or log out
    console.warn("Database failed to load", error)
  },
})
export default adapter