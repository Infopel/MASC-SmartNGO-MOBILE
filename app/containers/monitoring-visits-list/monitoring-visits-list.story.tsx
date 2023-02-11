import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { MonitoringVisitsList } from "./monitoring-visits-list.component"

storiesOf("MonitoringVisitsList", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <MonitoringVisitsList style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
