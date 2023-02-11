import { Heading } from "components/heading/heading"
import { useToolbarColor } from "components/hooks"
import { Icon } from "components/icon/icon"
import { InitiativeToolbarActions } from "components/initiative-toolbar-actions/initiative-toolbar-actions"
import { HStack, IBoxProps, IconButton, VStack } from "native-base"
import { goBack } from "navigators/navigation-utilities"
import * as React from "react"
import { Platform } from "react-native"
import { IInitiative } from "storage/queries/initiative"
import { DateUtils } from "utils/DateUitls"
import { TextUtils } from "utils/TextUtils"

export interface CivicIncubatorToolbarProps extends IBoxProps {
  incubator: IInitiative
}

/**
 * Describe your component here
 */
export function CivicIncubatorToolbar({ incubator, ...rest }: CivicIncubatorToolbarProps) {


  const isIOS = Platform.OS === "ios"
  const { bg, border } = useToolbarColor()
  return (
    <HStack {...rest} bg={bg} py='3' px='1' alignItems={'flex-start'} borderColor={border}>
      <IconButton p={1} onPress={goBack} testID="back" colorScheme={'text'} icon={<Icon size={'xl'} name='arrow-back' type='material' />} />
      <VStack space='3' flex={1}>

        <Heading fontSize={'xl'} fontWeight='medium' textAlign={isIOS ? "center" : undefined} noOfLines={1}
        //@ts-ignore
        >{incubator.name}</Heading>
        <HStack alignItems={'center'} space='1'>
          <Icon name='place' type='material' size='sm' />
          <Heading fontSize={'sm'} fontWeight='light' noOfLines={1}
          //@ts-ignore
          >{TextUtils.getIncubatorLocation(incubator.province, incubator.district)}</Heading>
        </HStack>
        <HStack alignItems={'center'} space='1'>
          <Icon name='calendar-today' type='material' size='sm' />
          <Heading fontSize={'sm'} fontWeight='light' noOfLines={1}
          //@ts-ignore
          >{DateUtils.formatToShortDate(incubator.date)}</Heading>
        </HStack>
      </VStack>
      <InitiativeToolbarActions initiativeId={incubator.id}/>
    </HStack>
  )
}
