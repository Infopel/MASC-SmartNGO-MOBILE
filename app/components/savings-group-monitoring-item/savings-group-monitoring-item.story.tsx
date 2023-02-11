import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { SavingsGroupMonitoringItem } from "./savings-group-monitoring-item.component"

storiesOf("SavingsGroupMonitoringItem", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <SavingsGroupMonitoringItem style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
