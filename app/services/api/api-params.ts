import { SyncPullQueryParams } from "./api.types"

export const paths = {
  user: {
    login: "/login",
    logOut: "/loginout",
    register: "/register",
    get_user: "/user",
  },
  sync: {
    pull: "/pull",
    push: "/push",
  },
}

export function userSignInUrl() {
  return paths.user.login
}
export function getUserUrl() {
  return paths.user.get_user
}
export function userRegisterUrl() {
  return paths.user.register
}
export function userSignOutUrl() {
  return paths.user.logOut
}

export function syncPullUrl({ migration, lastPulledAt, schemaVersion }: SyncPullQueryParams) {
  return `${
    paths.sync.pull
  }?last_pulled_at=${lastPulledAt}&schema_version=${schemaVersion}&migration=${encodeURIComponent(
    JSON.stringify(migration),
  )}`
}
export function syncPushUrl() {
  return paths.sync.push
}
