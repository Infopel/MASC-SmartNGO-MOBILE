import * as React from 'react'
import { extendTheme, NativeBaseProviderProps, NativeBaseProvider as Provider } from "native-base"
import { primary, secondary, tertiary } from "./palette"

const _theme = extendTheme({
  config: {
    useSystemColorMode: true,
    // initialColorMode: 'dark',
  },

  colors: { secondary, primary, tertiary },
})

export function NativeBaseProvider({ theme, ...rest }: NativeBaseProviderProps) {
  return <Provider theme={_theme}  {...rest} />
}
