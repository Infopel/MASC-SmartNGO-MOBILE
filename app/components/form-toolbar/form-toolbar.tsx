import { Heading } from "components/heading/heading"
import { Icon } from "components/icon/icon"
import { HStack, IconButton, useColorModeValue, useToken, VStack } from "native-base"
import { goBack } from "navigators/navigation-utilities"
import { PrimaryStackHeaderProps } from "navigators/navigators"
import * as React from "react"
import { Platform } from "react-native"
import { Circle } from 'react-native-progress'

export interface FormToolbarProps extends PrimaryStackHeaderProps<'form'> {
  pageInfo?: { stepCount: number; currentStep: number; subTitle: string }
}

/**
 * Describe your component here
 */
export const FormToolbar = function FormToolbar({ pageInfo, route }: FormToolbarProps) {

  const isIOS = Platform.OS === "ios"
  const bg = useColorModeValue("light.50", "dark.100")
  const unfilledProgressColor = useToken('colors', 'success.200')
  const filledProgressColor = useToken('colors', 'success.500')
  const border = useColorModeValue("muted.50", "muted.800")
  return (
    <HStack bg={bg} py={3} px='1' space='1' shadow="1" alignItems={'flex-start'} borderColor={border} borderWidth="1">
      <IconButton p={0} onPress={goBack} testID="back" colorScheme={'text'} icon={<Icon size={'xl'} name='arrow-back' type='material' />} />
      <VStack space='1' flex='1'>

        <Heading fontSize={'xl'} fontWeight={'medium'} noOfLines={1} textAlign={isIOS ? "center" : undefined}
          //@ts-ignore
          tx={`form.${route.params.formId}.title`} />
        {pageInfo && <Heading noOfLines={1} textAlign={isIOS ? "center" : undefined}
          //@ts-ignore
          tx={`form.${route.params.formId}.step-${pageInfo.currentStep}`} fontWeight='light' size='sm' />}
      </VStack>
      {pageInfo && <Circle progress={pageInfo.currentStep / pageInfo.stepCount} showsText formatText={() => pageInfo.currentStep} textStyle={{
        fontSize: 18
      }} color={filledProgressColor} borderWidth={0} unfilledColor={unfilledProgressColor} />}
    </HStack>
  )
}
