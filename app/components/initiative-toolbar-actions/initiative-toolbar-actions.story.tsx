import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { InitiativeToolbarActions } from "./initiative-toolbar-actions"

storiesOf("InitiativeToolbarActions", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <InitiativeToolbarActions m='2' />
      </UseCase>
    </Story>
  ))
