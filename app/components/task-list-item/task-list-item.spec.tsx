import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { TaskListItem } from "./task-list-item"

test("<TaskListItem> exists", async function () {
  const label = "Task List Item"
  const component = <TaskListItem label={label} task={
    {
      date: 12321321, isPending: false, location: "Matola", name: "Antonio",
    }
  }></TaskListItem>

  const { getByLabelText } = render(component)

  expect(getByLabelText(label)).toBeTruthy()
})

