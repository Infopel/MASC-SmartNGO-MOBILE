import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { SavingsGroupMembersList } from "./savings-group-members-list.component"

storiesOf("SavingsGroupMembersList", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <SavingsGroupMembersList style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
