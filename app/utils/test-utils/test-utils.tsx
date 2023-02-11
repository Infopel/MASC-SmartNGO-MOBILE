import { render } from "@testing-library/react-native"
import React from "react"
import { NativeBaseProvider as ThemeProvider } from "theme"
import { AllTheProvidersProps, RenderOptions } from "./render"

function AllTheProviders({ children }: AllTheProvidersProps) {
  return (
    <ThemeProvider>{children}</ThemeProvider>
  )
}

function customRender<T extends any>(ui: React.ReactElement<T>, options?: RenderOptions) {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

// re-export everything
export * from "@testing-library/react-native"
// override render method
export { customRender as render }

