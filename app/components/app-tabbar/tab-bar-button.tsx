import { Button } from "components/button/button";
import { useIsPressed } from "components/hooks";
import { TxKeyPath } from "i18n/i18n";
import { IBoxProps } from "native-base";
import React from "react";

interface TabBarButtonProps extends IBoxProps {
    onPress: () => void;
    tx: TxKeyPath
    selected: boolean

}
export function TabBarButton({ selected, tx, ...rest }: TabBarButtonProps) {
    const { pressableProps, isPressed } = useIsPressed()


    return <Button tx={`${tx}.title`} _text={{
        fontWeight: 'medium'
    }}  {...rest} p='2' borderRadius='full' variant={selected ? 'solid' : 'ghost'} isPressed={isPressed} {...pressableProps} accessibilityState={{ selected: selected }} />
}