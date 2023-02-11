import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { CivicIncubatorToolbar } from "./civic-incubator-toolbar"

storiesOf("CivicIncubatorToolbar", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CivicIncubatorToolbar m='2' />
      </UseCase>
    </Story>
  ))
