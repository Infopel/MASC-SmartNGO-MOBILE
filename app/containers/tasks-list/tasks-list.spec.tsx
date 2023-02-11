import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { TasksListContainer } from "./tasks-list"

test("<TasksList> exists", async function () {
  render(<TasksListContainer {...{ itemsLabel: 'w' }}/>)
})

