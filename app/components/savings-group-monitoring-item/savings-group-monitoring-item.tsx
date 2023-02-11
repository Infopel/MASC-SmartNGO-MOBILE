import { Card } from "components/card/card"
import { Text } from "components/text/text"
import { HStack, VStack } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { ISavingsGroupMonitoringItem } from "storage/queries/savings-group"
import { DateUtils } from "utils/DateUitls"
import { SavingsGroupMonitoringItemStyles as styles } from "./savings-group-monitoring-item.styles"

export interface SavingsGroupMonitoringItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item: ISavingsGroupMonitoringItem
}

/**
 * Describe your component here
 */
export const SavingsGroupMonitoringItem = function SavingsGroupMonitoringItem(props: SavingsGroupMonitoringItemProps) {
  const { style, item } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  return (
    <Card borderLeftColor={'primary.500'} borderLeftWidth='6' p={2}>
      <HStack space={2}>
        <VStack flex={1} space={2}>
          <Text fontWeight={'bold'}>{item.name}</Text>
          <Text>{DateUtils.prettyDate(item.date)}</Text>
          <Text >Poupança: {item.savings}</Text>
        </VStack>
        </HStack>
    </Card>
  )
}
