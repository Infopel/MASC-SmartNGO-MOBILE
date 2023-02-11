import { Text } from "components/text/text"
import { Box, IBoxProps } from "native-base"
import * as React from "react"

export interface SyncErrorProps extends IBoxProps {
  message: string
}

/**
 * Describe your component here
 */
export function SyncError({ message, ...rest }: SyncErrorProps) {



  return (
    <Box bg='cyan.100' {...rest} p='2'>
      <Text>{message}</Text>
    </Box>
  )
}
