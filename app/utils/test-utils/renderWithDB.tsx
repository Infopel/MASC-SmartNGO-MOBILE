jest.mock("storage/adapter.ts")
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider"
import { render } from "@testing-library/react-native"
import { default as React } from "react"
import { database } from "storage/database"
import { NativeBaseProvider as ThemeProvider } from "theme"
import { AllTheProvidersProps, RenderOptions } from "./render"

function AllTheProvidersWithDB({ children }: AllTheProvidersProps) {
    return (
        <DatabaseProvider database={database}>
            <ThemeProvider>{children}</ThemeProvider>
        </DatabaseProvider>
    )
}

export function renderWithDB<T extends any>(ui: React.ReactElement<T>, options?: RenderOptions) {
    return render(ui, { wrapper: AllTheProvidersWithDB, ...options })
}


export class DiagnosticError extends Error {
    name: string = "Diagnostic error"
  }
  