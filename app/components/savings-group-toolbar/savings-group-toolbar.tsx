import { Heading } from "components/heading/heading"
import { useToolbarColor } from "components/hooks/color-hooks"
import { Icon } from "components/icon/icon"
import { InitiativeToolbarActions } from "components/initiative-toolbar-actions/initiative-toolbar-actions"
import { HStack, IBoxProps, IconButton, VStack } from "native-base"
import { goBack } from "navigators/navigation-utilities"
import * as React from "react"
import { Platform } from "react-native"
import { ISavingsGroup } from "storage/queries/savings-group"

export interface SavingsGroupToolbarProps extends IBoxProps {
  savingsGroup: ISavingsGroup
}

/**
 * Describe your component here
 */
export function SavingsGroupToolbar({ savingsGroup, ...rest }: SavingsGroupToolbarProps) {


  const isIOS = Platform.OS === "ios"
  const { bg, border } = useToolbarColor()
  return (
    <HStack {...rest} bg={bg} py='3' px='1' alignItems={'flex-start'} borderColor={border}>
      <IconButton p={0} onPress={goBack} testID="back" colorScheme={'text'} icon={<Icon size={'xl'} name='arrow-back' type='material' />} />
      <VStack space='3' flex='1'>

        <Heading fontSize={'xl'} fontWeight='medium' textAlign={isIOS ? "center" : undefined} noOfLines={1}
        >{savingsGroup.name}</Heading>
        <HStack alignItems={'center'} space='1'>
          <Icon name='place' type='material' size='sm' />
          <Heading fontSize={'sm'} fontWeight='light' noOfLines={1}
          >{savingsGroup.location}</Heading>
        </HStack>
        <HStack alignItems={'center'} space='1'>
          <Icon name='people' type='material' size='sm' />
          <Heading fontSize={'sm'} fontWeight='light' noOfLines={1}
          >{savingsGroup.numberOfMembers}</Heading>
        </HStack>
        <HStack alignItems={'center'} space='1'>
          <Icon name='replay' type='material-community' size='sm' />
          <Heading fontSize={'sm'} fontWeight='light' noOfLines={1}
          >{savingsGroup.numberOfCycles}</Heading>
        </HStack>
        <HStack alignItems={'center'} space='1'>
          <Icon name='timelapse' type='material-community' size='sm' />
          <Heading fontSize={'sm'} fontWeight='light' noOfLines={1}
          >{savingsGroup.cycleDuration}</Heading>
        </HStack>
      </VStack>
      <InitiativeToolbarActions initiativeId={savingsGroup.initiativeId}/>
    
    </HStack>)
}
