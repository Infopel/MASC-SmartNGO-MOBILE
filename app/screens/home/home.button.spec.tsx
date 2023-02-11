import React from "react";
import { render } from 'utils/test-utils/test-utils';
import { HomeButton } from "./home.button";

describe("<HomeButton>", () => {
  it("should render the home button", () => {
    render(<HomeButton icon='home' tx='common.back'/>)
  })
})
