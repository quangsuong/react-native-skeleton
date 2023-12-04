/* eslint-disable @typescript-eslint/no-explicit-any */
import { I18nKeys } from '@utils/i18n/locales';

export interface OptionData {
  /**
   * (Required) Text to display
   */
  text: string;

  /**
   * Param pass to the call back function
   */
  itemCallback?: any;
}

export interface DateTimePickerProps {
  /**
   * Title of date picker
   */
  title?: string;

  /**
   * Title of date picker
   */
  t18n?: I18nKeys;

  /**
   * Title of date picker
   */
  value?: Date;

  /**
   * Function of cancel button
   * @default undefined
   */
  onPressCancel?: () => void;

  /**
   * Function of confirm button
   * @default undefined
   */
  onPressConfirm?: (date?: Date) => void;
}
