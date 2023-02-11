import { useIsPressed } from "components/hooks/button-hooks"
import { IPressableProps, Pressable, usePropsResolution, useToken } from "native-base"
import React from "react"
interface BaseListItemButtonProps extends Omit<IPressableProps, "onPressOut" | "onPressIn"> {


}
export function BaseListItemButton({ children,...rest }: BaseListItemButtonProps) {

    const { isPressed, pressableProps } = useIsPressed()
    const { ...btnProps } = usePropsResolution('button', { variant: 'ghost', ...rest }, { isPressed })

    const color = useToken('colors', 'primary.500')

    return (
        <Pressable android_ripple={{ color }} {...btnProps}  {...pressableProps} p='2'>
            {children}
        </Pressable>
    )
}