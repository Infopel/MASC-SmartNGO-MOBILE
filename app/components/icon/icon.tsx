import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { Icon as NativeIcon, IIconProps } from "native-base"
import React from "react"
import logger from "utils/logger"

type IconPropsWithoutName = Omit<IIconProps, "name" | "as">

export type TMaterialIcons = keyof typeof MaterialIcons.glyphMap
export type TMaterialCommunityIcons = keyof typeof MaterialCommunityIcons.glyphMap
interface MaterialProps {
  name: TMaterialIcons
  type?: "material"
}
interface MaterialCommunityProps {
  name: TMaterialCommunityIcons
  type: "material-community"
}
export type IconProps = (MaterialProps | MaterialCommunityProps) & IconPropsWithoutName

function isMaterialProps(arg: any): arg is MaterialProps {
  return arg.type === "material"
}
function isMaterialCommunityProps(arg: any): arg is MaterialCommunityProps {
  return arg.type === "material-community"
}

/**
 * Describe your component here
 */
export function Icon(props: IconProps) {
  const { name = 'plus-me-onli', type = "material", ...rest } = props

  if (isMaterialProps({ ...props, type })) {
    return <NativeIcon as={MaterialIcons} name={name} {...rest} />
  }
  if (isMaterialCommunityProps(props)) {
    return <NativeIcon as={MaterialCommunityIcons} name={name} {...rest} />
  }

  logger.warn("you must select type prop")

  return <NativeIcon {...rest} as={MaterialIcons} name={name} />
}
