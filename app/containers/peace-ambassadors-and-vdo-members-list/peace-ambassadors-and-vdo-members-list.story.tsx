import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { PeaceAmbassadorsAndVdoMembersList } from "./peace-ambassadors-and-vdo-members-list.component"

storiesOf("PeaceAmbassadorsAndVdoMembersList", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <PeaceAmbassadorsAndVdoMembersList style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
