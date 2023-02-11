import { translate } from "i18n"
import { Input } from "components/input/input"
import { Button } from "components/button/button"
import { Screen } from "components/screen/screen"
import { TasksListContainer } from "containers/tasks-list/tasks-list"
import { ScreenNavigationProps } from "navigators"
import React from "react"
import { HStack, Button as NBbtn, VStack } from "native-base"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `myTasks: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="my-tasks" component={myTasks} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
interface MyTasksScreenProps extends ScreenNavigationProps<"my-tasks"> { }
export function MyTasksScreen(props: MyTasksScreenProps) {
  const [isPendingListVisible, setIsPendingListVisible] = React.useState(true)
  const [queryText, setQueryText] = React.useState<string>()
  return (
    <Screen testID="my-tasks-screen">
      <VStack mb={2} space={2}>
        <NBbtn.Group>
          <Button flex={1} variant={isPendingListVisible ? "solid" : "outline"} testID='pending-tasks' tx='my-tasks.pending' onPress={setIsPendingListVisible.bind(this, true)}>Pending</Button>
          <Button flex={1} variant={!isPendingListVisible ? "solid" : "outline"} testID='finished-tasks' tx='my-tasks.finished' onPress={setIsPendingListVisible.bind(this, false)}>Finished</Button>
        </NBbtn.Group>
        <Input testID="filter-tasks" onChangeText={setQueryText} txPlaceholder="my-tasks.search-tasks" />
      </VStack>
      {isPendingListVisible ? <TasksListContainer queryText={queryText} itemsLabel={translate('my-tasks.pending-task-item')} />
        : <TasksListContainer queryText={queryText} itemsLabel={translate('my-tasks.finished-task-item')} />}
    </Screen>
  )
}
