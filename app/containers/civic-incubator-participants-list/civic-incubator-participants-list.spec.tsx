import { translate } from "i18n/translate"
import * as React from "react"
import { render } from "utils/test-utils/test-utils"
import { CivicIncubatorParticipantsListContainer } from "./civic-incubator-participants-list"

describe("<CivicIncubatorParticipantsListContainer>", () => {
  const label = translate('civic-incubator-details-participants-tab.participant-item')
  it("render", async function () {
    const { toJSON } = render(<CivicIncubatorParticipantsListContainer></CivicIncubatorParticipantsListContainer>)

    expect(toJSON()).toMatchSnapshot()
  })

  it("should render empty placeholder", () => {
    const { queryByText } = render(<CivicIncubatorParticipantsListContainer></CivicIncubatorParticipantsListContainer>)

    expect(queryByText(translate('common.empty_list_message'))).toBeTruthy()
  })

  it("should render 4 items", () => {
    const { getAllByLabelText } = render(<CivicIncubatorParticipantsListContainer></CivicIncubatorParticipantsListContainer>)

    expect(getAllByLabelText(label).length).toBe(4)
  })
  it("should render 2 items after filter", () => {
    const { queryByText, queryAllByLabelText } = render(<CivicIncubatorParticipantsListContainer searchText='pap'></CivicIncubatorParticipantsListContainer>)

    expect(queryAllByLabelText(label).length).toBe(4)
  })
  it("should render NO items after filter", () => {
    const { queryByText, queryAllByLabelText } = render(<CivicIncubatorParticipantsListContainer searchText='papaia'></CivicIncubatorParticipantsListContainer>)

    expect(queryByText(translate('common.empty_list_message'))).toBeTruthy()
    expect(queryAllByLabelText('button').length).toBe(0)
  })
})
