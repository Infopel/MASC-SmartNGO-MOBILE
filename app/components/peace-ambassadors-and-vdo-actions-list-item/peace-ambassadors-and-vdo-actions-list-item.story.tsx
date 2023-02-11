import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { PeaceAmbassadorsAndVdoActionsListItem } from "./peace-ambassadors-and-vdo-actions-list-item.component"

storiesOf("PeaceAmbassadorsAndVdoActionsListItem", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <PeaceAmbassadorsAndVdoActionsListItem style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
