import { Box, FlatList, HStack, IBoxProps, useDisclose, VStack } from "native-base"
import * as React from "react"
import { openCamera } from 'react-native-image-crop-picker'
import logger from "utils/logger"
import { CaptureButton } from "./capture-button"
import { CapturePreview } from "./capture-preview"
import { Thumbnail } from "./thumbnail"

export interface ImageCaptureProps extends IBoxProps {
  /**
   * An optional style override useful for padding & margin.
   */
  images: string[]
  title:string
  onChangeImages: (images: string[]) => void
}

/**
 * Describe your component here
 */
export function ImageCapture(props: ImageCaptureProps) {
  const { style, images, onChangeImages,title, ...rest } = props
  const handleOnPressAdd = () => {
    openCamera({
      multiple: true,
      mediaType: 'photo',
    }).then((res) => {
      if (Array.isArray(res)) {

        props.onChangeImages([...images, ...res.map((image) => image.path)])
      } else {
        props.onChangeImages([...images, res.path])

      }
    }).catch((error) => {
      logger.log(error)
    })
  }
  const { isOpen, onOpen, onClose } = useDisclose()

  return (
    <Box {...rest}>
      <VStack p='2' borderWidth='1' borderRadius={6}  borderColor='primary.300'>
        <FlatList horizontal flex={'1'} mb='1' data={images} renderItem={(({ item }) => <Thumbnail src={item} size='sm' />)} />
        <CaptureButton onPressAdd={handleOnPressAdd} onPressPreview={onOpen} />
      </VStack>
      {isOpen && <CapturePreview title={title} onClose={onClose} isVisible={isOpen} images={images} onChangeImages={props.onChangeImages} />}
    </Box>
  )
}
