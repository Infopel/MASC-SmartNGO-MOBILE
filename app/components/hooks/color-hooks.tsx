import { useColorModeValue, useContrastText } from "native-base"
import { IColors } from "native-base/lib/typescript/theme/base/colors"


export function useBackgroundColor(): IColors {

  const color = useColorModeValue('light.100', 'dark.100')
  return color
}

export function useToolbarColor() {
  const bg = useColorModeValue("light.50", "dark.100")
  const border = useColorModeValue("muted.50", "muted.800")
  const text = useContrastText(bg,)
  return { bg, border, text }
}