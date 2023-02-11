import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { FormControlImageCapture } from "./form-control-image-capture.component"

storiesOf("FormControlImageCapture", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <FormControlImageCapture style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
