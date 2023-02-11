import { Icon } from "components/icon/icon"
import { translate } from "i18n/translate"
import { Box, IBoxProps, IconButton, Menu } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import * as React from "react"

export interface InitiativeToolbarActionsProps extends IBoxProps {
  initiativeId: string
}

/**
 * Describe your component here
 */
export function InitiativeToolbarActions({ initiativeId, ...rest }: InitiativeToolbarActionsProps) {


  return (
    <Box alignItems="center">
      <Menu trigger={triggerProps => {
        return <IconButton
          p={1} {...triggerProps} testID="back" colorScheme={'text'} icon={<Icon size={'xl'} name='dots-vertical' type='material-community' />}
        />
      }}>
        <Menu.Item onPress={()=> navigate('action-plan', {initiativeId})}>{translate('context-menu.view-action-plan')}</Menu.Item>
        <Menu.Item onPress={()=> navigate('monitoring-visits', {initiativeId})}>{translate('context-menu.view-monitoring-visit')}</Menu.Item>
      </Menu>
    </Box>
  )
}
