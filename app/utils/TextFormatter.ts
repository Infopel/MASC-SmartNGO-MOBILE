export class TextFormatter {
  public static clearAllFormatting(text: string | undefined): string {
    return text ? text.replace(/ /g, "") : ""
  }
  public static formatToMoney(oldText: string, newKey: string): string {
    switch (oldText.length) {
      case 3:
        return oldText + " " + newKey

      default:
        return oldText + newKey
    }
  }
  public static formatToNumeric(oldText: string, newKey: string): string {
    const text = oldText + newKey
    if (text.length <= 3) return text
    const arrText = text.split(".")
    const dotText = arrText[1] ? "." + arrText[1] : newKey === "." ? newKey : ""

    const nums = [...arrText[0]]

    return (
      nums.reduce((acc, value, index, array) => {
        if (acc.length === 0) return value
        const cursor = array.length - index

        if (cursor % 3 === 0) return acc + " " + value
        return acc + value
      }, "") + dotText
    )
  }

  public static formatToPhoneNumber(oldText: string, newKey: string): string {
    const text = oldText + newKey
    const nums = [...text]
    return nums.reduce((acc, value, index, array) => {
      if (acc.length === 0) return value
      
      if (index === 2) return acc + " " + value
      if (index === 5) return acc + " " + value
      return acc + value
    }, "")
  }
}
