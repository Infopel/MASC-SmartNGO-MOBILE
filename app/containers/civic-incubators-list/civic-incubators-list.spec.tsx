import { translate } from "i18n/translate"
import * as React from "react"
import { resetDatabase } from "storage/database"
import { populateFindAllCivicIncubators } from "storage/queries/__mock__/civic-incubators"
import { renderWithDB } from "utils/test-utils/renderWithDB"
import { screen } from "utils/test-utils/test-utils"
import { CivicIncubatorsListContainer } from "./civic-incubators-list"

describe("<CivicIncubatorsListContainer>", () => {
  it("render", function () {
    (renderWithDB(<CivicIncubatorsListContainer></CivicIncubatorsListContainer>))
  })

  it('should show empty list message', () => {
    (renderWithDB(<CivicIncubatorsListContainer></CivicIncubatorsListContainer>))

    expect(screen.getByText(translate('common.empty_list_message'))).toBeTruthy();
  })
  it("should list 4 civic incubators", async function () {
    // jest.mock('storage/queries/initiative')
    await populateFindAllCivicIncubators()
    renderWithDB(<CivicIncubatorsListContainer></CivicIncubatorsListContainer>)
    expect(screen.getAllByRole('button').length).toBe(4)
  })

  afterEach(async () => await resetDatabase())
})

