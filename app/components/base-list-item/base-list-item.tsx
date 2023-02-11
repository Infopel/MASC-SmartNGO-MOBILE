import { Card } from "components/card/card"
import { Box, IStackProps, Pressable, useToken } from "native-base"
import * as React from "react"
import { BaseListItemButton } from "./base-list-item-button"

export interface BaseListItemProps extends IStackProps {
  onPress?: () => void
  accessibilityLabel?: string
}

/**
 * Describe your component here
 */
export function BaseListItem({ children, onPress, accessibilityLabel, ...rest }: BaseListItemProps) {

  return (
    <Card borderLeftWidth={6} borderLeftColor='primary.500' {...rest}>
      {onPress ? <BaseListItemButton onPress={onPress} accessibilityLabel={accessibilityLabel} children={children} /> : <Box>{children}</Box>}
    </Card>
  )
}
