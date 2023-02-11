import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { UserProfileAndExitDialog } from "./user-profile-and-exit-dialog.component"

storiesOf("UserProfileAndExitDialog", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <UserProfileAndExitDialog style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
