import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { CivicIncubatorsListItem } from "./civic-incubators-list-item.component"

storiesOf("CivicIncubatorsListItem", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CivicIncubatorsListItem style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
