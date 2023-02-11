import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { NewCivicIncubatorForm } from "./new-civic-incubator-form.component"

storiesOf("NewCivicIncubatorForm", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <NewCivicIncubatorForm style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
