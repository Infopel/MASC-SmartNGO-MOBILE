import { Icon } from "components/icon/icon";
import React from "react";

const sizes = {
    sm: '16',
    lg: '48',
}


export interface EmptyThumbnailProps {
    size: keyof typeof sizes

}
export function EmptyThumbnail({ size = 'sm' }: EmptyThumbnailProps) {
    const _size = sizes[size]

    return (
        <Icon name='image-not-supported' type='material' size={_size} />

    )
}