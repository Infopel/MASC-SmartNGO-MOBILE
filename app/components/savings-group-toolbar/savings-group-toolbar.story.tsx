import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { SavingsGroupToolbar } from "./savings-group-toolbar"

storiesOf("SavingsGroupToolbar", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <SavingsGroupToolbar m='2' />
      </UseCase>
    </Story>
  ))
