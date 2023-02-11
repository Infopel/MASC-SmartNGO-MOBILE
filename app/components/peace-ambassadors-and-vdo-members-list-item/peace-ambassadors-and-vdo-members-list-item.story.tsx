import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { PeaceAmbassadorsAndVdoMembersListItem } from "./peace-ambassadors-and-vdo-members-list-item.component"

storiesOf("PeaceAmbassadorsAndVdoMembersListItem", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <PeaceAmbassadorsAndVdoMembersListItem style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
