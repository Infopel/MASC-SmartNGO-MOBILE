import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { MonitoringVisitsListItem } from "./monitoring-visits-list-item"

storiesOf("MonitoringVisitsListItem", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <MonitoringVisitsListItem m='2' />
      </UseCase>
    </Story>
  ))
