import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { SavingsGroupMembersItem } from "./savings-group-members-item.component"

storiesOf("SavingsGroupMembersItem", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <SavingsGroupMembersItem style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
