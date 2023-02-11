import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { PeaceAmbassadorsAndVdoActionsList } from "./peace-ambassadors-and-vdo-actions-list.component"

storiesOf("PeaceAmbassadorsAndVdoActionsList", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <PeaceAmbassadorsAndVdoActionsList style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
