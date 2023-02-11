import { useIsPressed } from "components/hooks"
import { useField } from "formik"
import { Box, HStack, IBoxProps, Pressable, Text, usePropsResolution, VStack } from "native-base"
import * as React from "react"

export interface SubformPreviewProps extends IBoxProps {
  fieldName: string
  labelFieldName: string
  selectedIndex: number
  onSelectIndex: (index: number) => void
}

/**
 * Describe your component here
 */
export function SubformPreview({ fieldName, selectedIndex, labelFieldName, onSelectIndex, ...rest }: SubformPreviewProps) {

  const [{ value }] = useField<Record<string, string>[]>(fieldName)
  return (
    <VStack {...rest} borderRadius='md'  >
      <HStack space='1'>{value?.map((v, index) => {
        return <Chip
          key={index}
          children={v[labelFieldName]}
          isSelected={index === selectedIndex}
          onPress={onSelectIndex.bind(this, index)} />
      })}
      </HStack>
    </VStack>
  )
}


function Chip({ children, onPress, isSelected }: IBoxProps & { isSelected: boolean; onPress: () => void }) {
  const { isPressed, pressableProps } = useIsPressed()
  const { ...props } = usePropsResolution('button', { ...pressableProps, onPress }, { isPressed })
  return <Pressable {...props}>
    {({ isPressed }) => <Box py='1' px='2' _light={
      { bg: isSelected ? 'secondary.300' : isPressed ? 'primary.300' : 'light.300' }
    } _dark={
      { bg: isSelected ? 'secondary.300' : isPressed ? 'primary.300' : 'dark.300' }
    } borderRadius={'2xl'} >
      <Text>{children}</Text>
    </Box >}
  </Pressable>
}

