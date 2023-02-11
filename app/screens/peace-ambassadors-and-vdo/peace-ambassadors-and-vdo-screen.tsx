import { Screen } from "components/screen/screen";
import { PeaceAmbassedorListContainer } from "containers/peace-ambassedor-list/peace-ambassedor-list";
import { translate } from "i18n/translate";
import { Fab } from "native-base";
import { navigate } from "navigators/navigation-utilities";
import { ScreenNavigationProps } from "navigators/navigators";
import React from "react";

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `peaceAmbassadorsAndVdo: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="peaceAmbassadorsAndVdo" component={PeaceAmbassadorsAndVdoScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
interface PeaceAmbassadorsAndVdoScreenProps extends ScreenNavigationProps<"peace-ambassadors-and-vdo"> { }
export function PeaceAmbassadorsAndVdoScreen(props: PeaceAmbassadorsAndVdoScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen testID="peace-ambassadors-and-vdo-screen">
      <PeaceAmbassedorListContainer type={props.route.params.type} />
      <Fab label={translate('peace-ambassadors-and-vdo.new')} renderInPortal={false} onPress={() => navigate('new-peace-ambassadors-and-vdo', props.route.params)} />
    </Screen>
  )
}
