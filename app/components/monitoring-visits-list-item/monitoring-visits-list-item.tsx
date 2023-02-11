import * as React from "react"
import { IBoxProps, Box, HStack } from "native-base"
import { Text } from "components/text/text"
import { MonitoringVisit } from "storage/models/monitoring-visit"
import { DateUtils } from "utils/DateUitls"
import { Icon } from "components/icon/icon"

export interface MonitoringVisitsListItemProps extends IBoxProps {
  item: MonitoringVisit
}

/**
 * Describe your component here
 */
export function MonitoringVisitsListItem({ item: { date, motive, type }, ...rest }: MonitoringVisitsListItemProps) {

  return (
    <Box {...rest} m='4'>
      <Text >{type}</Text>
      <Text >{motive}</Text>
      <HStack alignItems={'center'} space='2' py='2'>
        <Icon name='calendar' size='md'  type="material-community" />
        <Text>{DateUtils.prettyDate(date)}</Text>
      </HStack>
    </Box>
  )
}
