import { Icon } from "components/icon/icon";
import { translate } from "i18n/translate";
import { isNil } from "lodash";
import { AspectRatio, IconButton, Image, Pressable, usePropsResolution, ZStack } from "native-base";
import React from "react";

const sizes = {
    sm: '16',
    lg: '48',
}

export interface ThumbnailProps {
    src: string;
    size: keyof typeof sizes
    selected?: boolean;
    onPress?: () => void;
    onRemovePressed?: () => void;
}
export function Thumbnail({ src, selected = false, onPress, onRemovePressed, size = 'sm' }: ThumbnailProps) {
    const _size = sizes[size]

    const props = onPress ? { onPress, accessibilityRole: 'imagebutton' } : {};
    const imageAlt = translate(onPress ? "common.thumbnail" : 'common.preview-image')
    const removeIconImageAlt = (translate('common.remove'))

    const { ...resolvedProps } = usePropsResolution('button', props, { isDisabled: isNil(onPress) })
    return (<Pressable  {...resolvedProps} >
        <ZStack size={_size} >
            <AspectRatio>
                <Image size={_size} alt={translate(imageAlt)} bg='yellow.300' source={{ uri: src }} accessibilityRole='image' accessibilityState={{ selected }} />
            </AspectRatio>
            {onRemovePressed && <IconButton accessibilityLabel={removeIconImageAlt} onPress={onRemovePressed} icon={<Icon name='trash-can' type='material-community' />} />}

        </ZStack>
    </Pressable>)
}