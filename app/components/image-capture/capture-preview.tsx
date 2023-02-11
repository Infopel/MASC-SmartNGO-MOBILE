import { Center, FlatList, Image, Modal, View } from 'native-base'
import React from 'react'
import { EmptyThumbnail } from './empty-thumbnail'
import { Thumbnail } from './thumbnail'
interface CapturePreviewProps {
    images: string[]
    title: string
    isVisible: boolean
    onChangeImages: (images: string[]) => void
    onClose: () => void
}
export function CapturePreview({ isVisible, images, onChangeImages, onClose, title }: CapturePreviewProps) {
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const handleOnRemove = (index: number) => {
        const items = [...images]
        items.splice(index, 1)
        onChangeImages(items)
    }


    const selectedImage = images[selectedIndex]

    return (<Modal accessibilityState={{ expanded: isVisible }} _backdrop={{}} isOpen={isVisible}>
        <Modal.Content>

            <Modal.CloseButton testID='close-previewer' onPress={onClose} />
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>
                <Center size='64' mb='1' borderRadius={8} borderColor='primary.100' borderWidth={1}>
                    {selectedImage ?
                        <Image defaultSource={require('assets/images/logo.png')} accessibilityRole='image' source={{ uri: selectedImage }} size='64' /> : <EmptyThumbnail size='lg' />}
                </Center>
                <FlatList horizontal data={images} ListEmptyComponent={() => <EmptyThumbnail size='sm'/>} ItemSeparatorComponent={() => <View w='1' />} renderItem={(({ item, index }) => <Thumbnail size='sm' src={item} selected={selectedIndex === index} onRemovePressed={handleOnRemove.bind(this, index)} onPress={setSelectedIndex.bind(this, index)} />)} />
            </Modal.Body>
        </Modal.Content>
    </Modal >)
}