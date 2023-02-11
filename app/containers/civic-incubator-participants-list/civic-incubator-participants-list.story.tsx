import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { CivicIncubatorParticipantsList } from "./civic-incubator-participants-list.component"

storiesOf("CivicIncubatorParticipantsList", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CivicIncubatorParticipantsList style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
