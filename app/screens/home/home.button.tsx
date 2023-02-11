import { Icon, IconProps } from "components/icon/icon"
import { Text } from "components/text/text"

import {
  useFocus,
  useHover,
  useIsPressed
} from "components/hooks"
import { translate, TxKeyPath } from "i18n"
import {
  AspectRatio,
  IBoxProps,
  IButtonProps,
  Pressable,
  useColorModeValue,
  usePropsResolution,
  VStack
} from "native-base"
import React from "react"

interface homeProps extends IBoxProps {
  icon: IconProps["name"]
  tx: TxKeyPath
  _button?: IButtonProps
  onPress: () => void
}
export function HomeButton({ _button, icon: propsIcon, tx: propsTx,onPress, ...rest }: homeProps) {
  const { hoverProps, isHovered } = useHover()
  const { pressableProps, isPressed } = useIsPressed()
  const { focusProps, isFocused } = useFocus()
  const { _text, _icon, _stack, size, icon, tx, children, ...resolvedProps } = usePropsResolution(
    "Button",
    { variant: "ghost", icon: propsIcon, tx: propsTx, ...pressableProps, ...hoverProps, ...focusProps, onPress },
    {
      isHovered: isHovered,
      isFocused: isFocused,
      isPressed: isPressed,
    },
  )

  const text = translate(tx) ?? children

  const bg = useColorModeValue("light.50", "dark.100")
  const border = useColorModeValue("muted.50", "muted.800")

  return (
    <AspectRatio
      shadow="1"
      bg={bg}
      {...rest}
      flex={1}
      ratio={1}
      borderWidth="1"
      borderRadius={"md"}
      borderColor={border}
    >
      <Pressable
        flex={1}
        {...resolvedProps}
        accessibilityRole={"button"}
      >
        <VStack {..._stack} {...{ size }} alignItems={"center"} mv={2}>
          <Icon
            {..._icon}
            size={"5xl"}
            strokeWidth={1}
            type="material-community"
            name={icon}
            flex={resolvedProps.flex}
          />
          <Text
            // {..._text}
            {...{ fontSize: "lg", textAlign: "center" }}
            noOfLines={2}
            color='text'
            flex={resolvedProps.flex}
          >
            {text}
          </Text>
        </VStack>
      </Pressable>
    </AspectRatio>
  )
}
