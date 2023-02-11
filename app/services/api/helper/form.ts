import { FormResult, RawFormResult } from "../api.types"

export function parseFormResult(formId: string) {
  return function _parseFormResult(input: RawFormResult): FormResult {
    const indexOf = input.form.findIndex((form) => form.id === formId)
    if (indexOf < 0) throw new Error("Could not find main form")
    const mainForm = input.form[indexOf]
    input.form.splice(indexOf, 1)


    return { main: mainForm, others: input.form }
  }
}
