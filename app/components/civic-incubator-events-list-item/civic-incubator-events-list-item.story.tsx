import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { CivicIncubatorEventsListItem } from "./civic-incubator-events-list-item"

storiesOf("CivicIncubatorEventsListItem", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CivicIncubatorEventsListItem m='2' />
      </UseCase>
    </Story>
  ))
