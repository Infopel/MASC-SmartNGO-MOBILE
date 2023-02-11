import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    status: types.optional(
      types.enumeration("SignIn Status", ["SIGNED_IN", "SIGNED_OUT", "PENDING"]),
      "SIGNED_OUT",
    ),
  })
  .views((self) => ({
    get isSignedIn(): boolean {
      return self.status === "SIGNED_IN"
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type TAuthStore = Instance<typeof AuthStoreModel>
export interface AuthStore extends TAuthStore {}
type TAuthStoreSnapshot = SnapshotOut<typeof AuthStoreModel>
export interface AuthStoreSnapshot extends TAuthStoreSnapshot {}
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
