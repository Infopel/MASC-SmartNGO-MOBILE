import { format } from "date-fns"
import * as yup from "yup"
import logger from "./logger"

/**
 * Runs the given rules against the data object.
 *
 * @param rules The rules to apply.
 * @param data The object to validate.
 */
function validateObj(rules: ValidationSchema, data?: Validatable | Date): ValidationResult {
  try {
    rules.validateSync(data)
    return undefined
  } catch (e: any) {
    return e.message
  }
}
type ValidationSchema =
  | yup.StringSchema
  | yup.DateSchema
  | yup.NumberSchema
  | yup.ArraySchema<yup.StringSchema>
type TRule = {
  [x in ValidationType]: ValidationSchema
}

const RULES: TRule = {
  "positive-number": yup
    .number()
    .transform((value: number) => (isNaN(value) ? undefined : value))
    .positive(),
  email: yup.string().email(),
  list: yup.array(),
  date: yup.date(),
  number: yup.number().transform((value: number) => (isNaN(value) ? undefined : value)),
  month: yup
    .number()
    .transform((value: number) => (isNaN(value) ? undefined : value))
    .max(12)
    .min(1),
  text: yup.string(),
  tel: yup
    .string()
    .trim()
    .transform((value: string) => (value.length === 0 ? undefined : value))
    .matches(/^(\+258)?(8[2-7]{1}[0-9]{7})$/, "Campo deve ser um número de telefone válido"),
}

type ValidationType =
  | "list"
  | "text"
  | "email"
  | "number"
  | "tel"
  | "date"
  | "month"
  | "positive-number"
type Validatable = string | number | boolean | string[]
export type ValidationRule = { type: ValidationType; max?: number; min?: number }
type ValidationResult = undefined | string

export function validate(
  rule: ValidationRule,
  value?: Validatable,
  required: boolean = false,
): ValidationResult {
  let rules = RULES[rule.type]

  if (required) {
    rules = rules.required()
  }

  if (rule.max) {
    if (rule.type === "date") {
      rules = (rules as yup.DateSchema).max(
        new Date(rule.max),
        ({ max, path }) =>
          `Campo ${path} deve ser mais tarde do que ${format(new Date(max), "dd/MM/yyyy")}`,
      )
    } else if (rule.type === "number") {
      rules = (rules as yup.NumberSchema).lessThan(rule.max + 1)
    } else {
      rules = rules.max(rule.max)
    }
  }

  if (rule.min) {
    if (rule.type === "date") {
      rules = (rules as yup.DateSchema).min(
        new Date(rule.min),
        ({ min, path }) =>
          `Campo ${path} deve ser mais cedo do que ${format(new Date(min), "dd/MM/yyyy")}`,
      )
    } else if (rule.type === "number") {
      rules = (rules as yup.NumberSchema).moreThan(rule.min - 1)
    } else {
      rules = rules.min(rule.min)
    }
  }

  const v =
    rule.type === "date"
      ? validateObj(rules, value && typeof value === "number" ? new Date(value) : undefined)
      : validateObj(rules, value)

  return v
}
