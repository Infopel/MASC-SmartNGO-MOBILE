import { SyncError } from "components/sync-error/sync-error"
import { isNil } from "lodash"
import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { useSyncDatabase } from "services/sync/sync.hook"

export interface SyncErrorProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export function SyncErrorContainer(props: SyncErrorProps) {
  const { error, isSyncing } = useSyncDatabase()
  return (
    isNil(error) ? < NoErrorSyncView /> : <SyncError message={error}/>
  )
}


export function NoErrorSyncView() {
  return (
    <View />
  )
}