import { Button } from "components/button/button"
import { AlertDialog, Avatar, Heading, IBoxProps, VStack } from "native-base"
import * as React from "react"
import { TextUtils } from "utils/TextUtils"

export interface UserProfileAndExitDialogProps extends IBoxProps {
  isOpen: boolean
  onClose: () => void
  onSignOut: () => void
  name: string
  email: string
}

/**
 * Describe your component here
 */
export function UserProfileAndExitDialog({ name, isOpen, onClose, email, onSignOut, ...rest }: UserProfileAndExitDialogProps) {

  const cancelRef = React.useRef<typeof Button>(null)

  function handleOnSignOut() {
    onSignOut();
    onClose();

  }


  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton onPress={onClose} />
        <VStack space='2' py='4' w='full' alignItems={'center'}>
          <Avatar>{TextUtils.getInitials(name)}</Avatar>
          <Heading fontWeight={'light'} fontSize='lg'>{email}</Heading>
          <Heading fontWeight={'light'}>{name}</Heading>
        </VStack>
        <AlertDialog.Footer w='full' justifyContent={'center'} >
          <Button colorScheme='danger' variant={'ghost'} tx='common.exit' onPress={handleOnSignOut} />
          <Button ref={cancelRef} colorScheme='primary' tx='common.cancel' onPress={onClose} />
        </AlertDialog.Footer>
      </AlertDialog.Content>

    </AlertDialog>
  )
}
