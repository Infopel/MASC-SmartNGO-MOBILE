import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { PeaceAmbassedorListItem } from "./peace-ambassedor-list-item.component"

storiesOf("PeaceAmbassedorListItem", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <PeaceAmbassedorListItem style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
