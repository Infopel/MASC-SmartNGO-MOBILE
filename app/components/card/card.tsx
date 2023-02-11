import { IStackProps, Stack, useColorModeValue } from "native-base"
import * as React from "react"

export interface CardProps extends IStackProps {

}

/**
 * Describe your component here
 */
export const Card = function Card(props: CardProps) {
  const bg = useColorModeValue("light.50", "dark.100")
  const border = useColorModeValue("muted.50", "muted.800")

  return (
    <Stack
      shadow="1"
      bg={bg}
      // flex={1}
      borderWidth="1"
      borderRadius={"md"}
      borderLeftColor={border}
      borderBottomColor={border}
      borderRightColor={border}
      borderTopColor={border}
      
      {...props} />
  )
}
