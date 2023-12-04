import { Block, Button, Spacer, Text, TextField } from '@components';
import { useTheme } from '@theme';

import { sizeScale } from '@common';
import { IconSvgLocal } from '@components/icon-vec-local';
import { InputBaseProps } from '@components/text-field/type';
import { I18nKeys } from '@utils/i18n/locales';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { KeyboardTypeOptions, Pressable, StyleProp, ViewStyle } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useDateTimeStyle } from './styles';

import { BottomSheet } from '@components/bottom-sheet';
import { DateTimePickerProps } from '@components/date-time-picker/type';
import useLanguage from '@customHooks/useLanguage';
import { Space } from '@foundation';
import moment from 'moment';

interface DatetimeProps extends DateTimePickerProps {
  fieldName: I18nKeys;
  value: Date;
  placeHolder: string;
  inputStyle?: StyleProp<InputBaseProps>;
  keyboardType?: KeyboardTypeOptions;
  errorMsg?: string;
  isRequire: boolean;
  hideErrorMsg?: boolean;
  disabled: boolean;
  wapperStyle?: StyleProp<ViewStyle>;
  onChangeDate: (e: any) => void;
  maximumDate: Date;
}
const Component = forwardRef((props: DatetimeProps, ref: any) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = useDateTimeStyle();
  const {
    fieldName,
    value,
    inputStyle,
    keyboardType,
    placeHolder,
    disabled,
    wapperStyle,
    isRequire,
    onChangeDate,
    ...rest
  } = props;
  const { language } = useLanguage();
  const refBottomSheet = useRef<BottomSheet>(null);
  const [date, setDate] = useState<any>(new Date());

  const openBottomSheet = () => {
    refBottomSheet.current?.openBottomSheet();
  };

  const closeBottomSheet = () => {
    refBottomSheet.current?.closeBottomSheet();
  };

  const selectDate = () => {
    onChangeDate(date);
    closeBottomSheet();
  };

  useEffect(() => {
    if (value && value != date) {
      setDate(value);
    }
  }, [value]);
  useImperativeHandle(ref, () => ({
    openBottomSheet,
    closeBottomSheet,
  }));
  return (
    <>
      {fieldName ? (
        <Block>
          <Text style={styles.fieldName} preset="subtitle3" color={colors.color_900}>
            {t(fieldName)}
            {!!isRequire && <Text color={colors.error}> *</Text>}
          </Text>
          <Pressable
            style={[
              wapperStyle,
              disabled ? { backgroundColor: colors.color_200, borderRadius: 8 } : {},
            ]}
            disabled={disabled}
            onPress={openBottomSheet}
          >
            <TextField
              value={value ? moment(value).format('DD/MM/YYYY') : ''}
              keyboardType={keyboardType ?? 'default'}
              placeholderTextColor={colors.color_600}
              placeholder={placeHolder || 'dd/mm/yy'}
              style={[inputStyle ?? styles.inputMask]}
              editable={false}
              pointerEvents="none"
              typeInput="outline"
              {...rest}
              rightChildren={
                <Block paddingRight={sizeScale(6)} justifyContent="center" alignItems="center">
                  <IconSvgLocal name="IC_CALENDAR_OUTLINE" color={colors.color_900} />
                </Block>
              }
            />
          </Pressable>
        </Block>
      ) : null}
      <BottomSheet title={fieldName ?? t('text:select_day')} ref={refBottomSheet}>
        <DatePicker
          date={date ? date : new Date()}
          locale={language === 'vi' ? 'vi_VN' : 'en-us'}
          mode="date"
          theme={'light'}
          onDateChange={setDate}
          textColor={colors.color_900}
          fadeToColor={colors.color_50}
          {...props}
        />
        <Spacer height={Space.spacing_m} />
        <Block direction="row" justifyContent={'flex-end'}>
          <Button name={''} onPress={closeBottomSheet} forIcon>
            <Text t18n="text:cancel" color={colors.color_error_500} />
          </Button>
          <Spacer width={Space.spacing_3xl} />
          <Button name={''} onPress={selectDate} forIcon>
            <Text t18n="text:confirm" color={colors.color_link_500} />
          </Button>
        </Block>
      </BottomSheet>
    </>
  );
});
export const DateTimePicker = memo(Component, isEqual);
