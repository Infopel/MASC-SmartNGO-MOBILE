import { FormBody } from "components/form-body/form-body"
import { Screen } from "components/screen/screen"
import { ScreenNavigationProps } from "navigators"
import React from "react"
import { useFormStore } from "store/form/form.store"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `TaskDiary: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="TaskDiary" component={TaskDiaryScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type

interface FormScreenProps extends ScreenNavigationProps<"form"> { }
export function FormScreen(props: FormScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const { fields, requestForm, isFirstPage, nextPage, isLastPage, prevPage, clear, submitForm, isMultiPage } = useFormStore(({ isMultiPage, fields, requestForm, page, nextPage, isLastPage, isFirstPage, prevPage, clear, submitForm }) => ({ submitForm, fields, clear, isMultiPage, nextPage, isFirstPage: isFirstPage(), isLastPage: isLastPage(), prevPage, pageInfo: page(), requestForm }))

  React.useEffect(() => {
    requestForm(props.route.params.formId, props.route.params.contextId, props.route.params.parentContextId)
    return () => clear()
  }, [])


  return (
    <Screen testID="form-screen">
      <FormBody fields={fields()} {...{isMultiPage: isMultiPage(), nextPage, prevPage, isLastPage, isFirstPage, submitForm }} />
    </Screen>
  )
}
