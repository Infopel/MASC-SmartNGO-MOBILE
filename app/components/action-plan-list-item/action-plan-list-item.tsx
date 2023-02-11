import withObservables from "@nozbe/with-observables"
import { BaseListItem } from "components/base-list-item/base-list-item"
import { Icon } from "components/icon/icon"
import { Text } from "components/text/text"
import { translate } from "i18n/translate"
import { Avatar, HStack, IBoxProps, VStack } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import * as React from "react"
import { ActionPlan } from "storage/models"
import { DateUtils } from "utils/DateUitls"

export interface ActionPlanListItemProps extends IBoxProps {
  item: ActionPlan
  doneRatio: number
}

/**
 * Describe your component here
 */
function ListItem({ item: { endDate, id, name, startDate }, doneRatio = 0, ...rest }: ActionPlanListItemProps) {

  return (
    <BaseListItem p='2' onPress={()=> navigate('form', {formId:'report-action-plan-progress', contextId: id})}>
      <HStack>
        <VStack flex='1' space={2}>
          <Text fontWeight={'bold'} accessibilityLabel={translate('civic-incubators.item-label')}>{name}</Text>

          <HStack alignItems={'center'} space='2'>
            <Icon name='calendar-range' type='material-community' size={'lg'} />
            <Text>{DateUtils.formatToShortDate(startDate)}</Text>
            <Icon name='arrow-right-thin' type='material-community' size={'lg'} />
            <Text>{DateUtils.formatToShortDate(endDate)}</Text>
          </HStack>
        </VStack>
        <Avatar >
          {doneRatio+"%"}
        </Avatar>
      </HStack>
    </BaseListItem>
  )
}

export const ActionPlanListItem = withObservables(['item'], ({item}:{item: ActionPlan})=> ({doneRatio: item.doneRatio}))(ListItem)
