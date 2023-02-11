import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { LoginFormContainer } from "./login-form"

  test("<LoginForm> exists", async function () {
    const component = <LoginFormContainer></LoginFormContainer>

    const { findByTestId } = render(component)

    const container = await findByTestId("loginFormContainer")

    expect(container).toBeTruthy()
  })

