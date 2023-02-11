import {first, isNil, last} from 'lodash';

export class TextUtils {
  static parseNumber(num: number | undefined) {
    const aux = parseInt(num);
    console.log({aux,num})
    return  isNaN(aux) ? 0 : aux;
  }
  static getIncubatorLocation(province: string, district: string): string {
    return province + ', ' + district;
  }
  static isNumber(num: any): boolean {
    const parsedInt = parseInt(num);
    const isValidNumber = !isNaN(parsedInt);
    if (isValidNumber) {
      if (typeof num === 'string') {
        return parsedInt.toString().length === num.length;
      }
      return true;
    }
    return false;
  }
  static countDecimalPlaces(num: number): number {
    const pos = num.toLocaleString().indexOf('.');

    if (pos < 0) return pos;

    const newNumber = num.toLocaleString().split('.')[1];

    return newNumber.length;
  }
  static isDecimal(num: number): boolean {
    return this.countDecimalPlaces(num) > 0;
  }
  public static replaceNumberSeparator(num: number, digits?: number) {
    if (isNil(digits) || isNaN(digits)) {
      return num.toLocaleString().replace('.', ',');
    }
    return num.toFixed(digits).toLocaleString().replace('.', ',');
  }

  public static numberOrEmpty(num?: number): string {
    return num ? num + '' : '';
  }

  public static stringifyNumber(num: number) {
    const decimalPosition = this.countDecimalPlaces(num);

    if (decimalPosition >= 2) return this.replaceNumberSeparator(num, 2);
    if (decimalPosition === 1) return this.replaceNumberSeparator(num, 1);
    return this.replaceNumberSeparator(num);
  }
  public static parseWeight(weight: number): string {
    if (weight >= 0) {
      // if (weight % 100 === 0) return this.replaceNumberSeparator(weight, 2) + " g"
      // if (weight % 10 === 0) return this.replaceNumberSeparator(weight, 1) + " g"
      if (weight < 749) return this.stringifyNumber(weight) + ' g';
      if (weight >= 750 && weight < 749000)
        return this.stringifyNumber(weight / 1000) + ' kg';
      return this.stringifyNumber(weight / 1000000) + ' t';
    }
    return this.stringifyNumber(weight) + ' g';
  }
  public static parseMoney(price: number): string {
    let sufix: string;
    let parsedValue: string;

    if (price >= 750 && price < 750000) {
      if (price === 1000) {
        parsedValue = '';
      } else {
        parsedValue = this.stringifyNumber(price / 1000) + ' ';
      }
      sufix = 'Mil';
    } else if (price >= 750000 && price < 750000000) {
      if (price === 1000000) {
        parsedValue = '1 ';
        sufix = 'Milhão';
      } else {
        parsedValue = this.stringifyNumber(price / 1000000) + ' ';
        sufix = 'Milhões';
      }
    } else if (price >= 750000000 && price < 750000000000) {
      if (price === 1000000000) {
        parsedValue = '1 ';
        sufix = 'Mil Milhão';
      } else {
        parsedValue = this.stringifyNumber(price / 1000000000) + ' ';
        sufix = 'Mil Milhões';
      }
    } else if (price >= 750000000000 && price < 750000000000000) {
      if (price === 1000000000000) {
        parsedValue = '1 ';
        sufix = 'Bilhão';
      } else {
        parsedValue = this.stringifyNumber(price / 1000000000000) + ' ';
        sufix = 'Bilhões';
      }
    } else {
      parsedValue = this.stringifyNumber(price);
      sufix = '';
    }

    return parsedValue + sufix + ' MT';
  }
  /**
  * getInitials
text: string  */
  public static getInitials(text: string) {
    const names = text.split(' ').filter(s => s !== ' ');
    if (names.length <= 0) return undefined;
    const firstName = first(names) ?? '';
    const lastName = names.length > 1 ? last(names) ?? '' : '';

    const firstChar = firstName?.length > 0 ? firstName[0] : '';
    const lastChar = lastName.length > 0 ? lastName[0] : '';
    return (firstChar + lastChar).toUpperCase();
  }

  public static appendName(firstName: string, lastName: string) {
    return (firstName ? firstName + ' ' : '') + (lastName ?? '');
  }
}
