import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { FormControlSeletor } from "./form-control-seletor.component"

storiesOf("FormControlSeletor", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <FormControlSeletor style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
