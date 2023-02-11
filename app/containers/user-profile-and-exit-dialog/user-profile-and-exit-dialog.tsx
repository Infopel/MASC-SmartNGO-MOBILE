import { UserProfileAndExitDialog } from "components/user-profile-and-exit-dialog/user-profile-and-exit-dialog"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { useUserStore } from "store/user/user.store"

export interface UserProfileAndExitDialogProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isOpen: boolean
  onClose: () => void
}

/**
 * Describe your component here
 */
export function UserProfileAndExitDialogContainer({ isOpen, onClose }: UserProfileAndExitDialogProps) {
  const { signOut, user } = useUserStore()

  return (
    <UserProfileAndExitDialog {...{ isOpen, onClose, onSignOut: signOut, name: user?.name, email: user?.email }} />
  )
}
