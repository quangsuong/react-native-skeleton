import { FontDefault } from '@theme/typography';
import { format } from 'date-fns';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { Linking } from 'react-native';
import 'react-native-get-random-values';
import { Frame } from 'react-native-vision-camera';
import { v4 as uuidv4 } from 'uuid';
import { Barcode } from 'vision-camera-code-scanner';
import {
  K_HOT_LINE,
  K_SCREEN_HEIGHT,
  K_SCREEN_WIDTH,
  STORAGE_KEY_UUID,
} from '../../common/constant';
import { loadString, saveString } from './storage';

export class Utils {
  /**
   * Generates UUID v4
   * @returns {string} UUID v4
   */
  public static uuid(): string {
    // Call the uuidv4 function from the uuid package to generate a UUID v4
    return uuidv4();
  }

  /**
   * Returns a string representation of the given date with the specified format.
   * If no format is provided, the default format 'dd-MM-yyyy' is used.
   * @param date - The date to format
   * @param _format - The format to use (optional)
   * @returns A string representation of the date
   */
  public static dateToString(date?: Date, _format?: string): string {
    if (!date) return '';
    return format(date, _format || 'dd-MM-yyyy');
  }

  /**
   * dateToString return string of date with format
   */
  public static stringToDate(dateString: string, _format?: string) {
    return moment(dateString, _format || 'dd-MM-yyyy').toDate();
  }

  /**
   * Returns UUID v4 from cache or generates a new one
   * @returns {string} UUID v4
   */
  public static uuidFromCache() {
    // Attempt to load UUID from cache
    let uuid = loadString(STORAGE_KEY_UUID);

    // If UUID not found in cache, generate a new one and save it to cache
    if (!uuid) {
      uuid = uuidv4();
      saveString(STORAGE_KEY_UUID, uuid);
    }

    // Return UUID
    return uuid;
  }

  /**
   * Calls the hotline number.
   * @returns {void}
   */
  public static callHotline() {
    // Construct the telephone URL with the hotline number
    const telephoneUrl = `tel:${K_HOT_LINE}`;

    // Open the telephone URL
    Linking.openURL(telephoneUrl);
  }

  /**
   * Checks if an object is empty or null
   *
   * @param obj The object to check
   * @returns True if the object is empty or null, false otherwise
   */
  public static isObjectEmpty(obj: any): boolean {
    // Use the `isEmpty` function to check if the object is empty or not
    return isEmpty(obj);
  }

  /**
   * Converts a barcode frame to pixel values
   * @param barcode The barcode object
   * @param frame The frame object
   * @returns An object containing pixel values for the frame's left, right, bottom, and top corners
   */
  public static convertFrameToPx(barcode: Barcode, frame: Frame) {
    const cornerPoints = barcode.cornerPoints;

    // Determine frame width and height based on which is smaller
    const frameWidth = frame.width < frame.height ? frame.width : frame.height;
    const frameHeight = frame.width < frame.height ? frame.height : frame.width;

    // Calculate ratios between frame dimensions and screen dimensions
    const xRatio = frameWidth / K_SCREEN_WIDTH;
    const yRatio = frameHeight / K_SCREEN_HEIGHT;

    // Map corner points to x and y arrays
    const xArray = cornerPoints.map((corner) => parseFloat(corner.x));
    const yArray = cornerPoints.map((corner) => parseFloat(corner.y));

    // Return an object containing pixel values for the frame's corners
    return {
      left: Math.min(...xArray) / xRatio,
      right: Math.max(...xArray) / xRatio,
      bottom: Math.max(...yArray) / yRatio,
      top: Math.min(...yArray) / yRatio,
    };
  }

  /**
   * Returns the font family name based on the given font weight.
   *
   * @param {string} fontWeight - The font weight of the font family.
   * @returns {string} The font family name.
   */
  public static getFontFamily(fontWeight: string) {
    const fontWeights = {
      '400': 'Regular',
      '500': 'Medium',
      '600': 'Semibold',
      '700': 'Bold',
      '800': 'Black',
    };
    //@ts-ignore
    const weight = fontWeight ? fontWeights[fontWeight] : 'Regular';
    return `${FontDefault.primary}-${weight}`;
  }

  /**
   * Given a color Hex value and a percentage, returns a new Hex string that is
   * the result of increasing the brightness of the original color by the given
   * percentage.
   *
   * @param {String} colorHex - Hex string representing the original color
   * @param {number} p - Percentage to increase brightness by
   * @return {String} Hex string representing the new, brighter color
   */
  public static percentToHex(colorHex: String, p: number) {
    return `${colorHex}0${Math.round((255 / 100) * p).toString(16)}`.slice(-2).toUpperCase();
  }

  public static maskString(str: string, mask = '*', n = 1) {
    return ('' + str).slice(0, -n).replace(/./g, mask) + ('' + str).slice(-n);
  }
}
