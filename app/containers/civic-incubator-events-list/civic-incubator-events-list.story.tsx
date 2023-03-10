import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { CivicIncubatorEventsList } from "./civic-incubator-events-list.component"

storiesOf("CivicIncubatorEventsList", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CivicIncubatorEventsList style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
