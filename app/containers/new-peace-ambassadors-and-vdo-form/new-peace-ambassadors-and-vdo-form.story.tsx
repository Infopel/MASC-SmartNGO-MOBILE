import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { NewPeaceAmbassadorsAndVdoForm } from "./new-peace-ambassadors-and-vdo-form.component"

storiesOf("NewPeaceAmbassadorsAndVdoForm", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <NewPeaceAmbassadorsAndVdoForm style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
