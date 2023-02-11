import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { PeaceAmbassadorsAndVdoMembers } from "./peace-ambassadors-and-vdo-members.component"

storiesOf("PeaceAmbassadorsAndVdoMembers", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <PeaceAmbassadorsAndVdoMembers style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
