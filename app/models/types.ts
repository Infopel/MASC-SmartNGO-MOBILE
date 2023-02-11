import { types } from "mobx-state-tree"

export const NumberStringified = types.custom({
  name: "NumberStringified",
  fromSnapshot: (value: number) => {
    return value + ""
  },
  toSnapshot: (value: string) => {
    return parseInt(value)
  },
  isTargetType: (value) => typeof value === "string",
  getValidationMessage: (value: number | string) => {
    return isNaN(typeof value === "string" ? parseInt(value) : value) ? "Invalid number" : ""
  },
})
