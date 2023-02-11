import { format, formatDistance, isToday, isTomorrow, isValid, isYesterday, parse } from "date-fns"
import { pt } from "date-fns/locale"
export class DateUtils {
  static parse(text: string): Date {
    const isValidText = this.isValidText(text)
    if (!isValidText) return new Date("NaN")
    let date = parse(text, "dd/MM/yyyy", new Date())
    if (isValid(date)) {
      return date
    }
    return (date = parse(text, "MM/dd/yyyy", new Date()))

    // if (isValid(date)) {
    //   return date
    // }
  }
  static formatToShortDate(date: number | Date): string {
    return format(date, "dd/MM/yyyy")
  }

  static isValidText(text: string): boolean {
    return new RegExp(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/).exec(text) !== null
  }

  static getDateOfWeek(date: number | Date): string {
    return format(date, "EEEE", { locale: pt })
  }

  static isValid(date: number | Date): boolean {
    return isValid(date)
  }

  public static prettyDate(date: Date | number): string {
    if (!this.isValid(date)) return ""

    if (isTomorrow(date)) return "Amanha"
    if (isToday(date)) return formatDistance(date, new Date(), { addSuffix: true })
    if (isYesterday(date)) return "Ontem"
    return this.formatToShortDate(date)
  }

  static parseDateToTicks(date: Date) {
    const reference = BigInt(621355968000000000) //ticks corresponding to 1/1/1970
    const offset = BigInt(date.getTimezoneOffset() * 600000000)
    const time = BigInt(date.getTime() * 10000)
    const ticks = time + reference - offset
    return ticks
  }
}
