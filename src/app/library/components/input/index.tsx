import React, { memo, ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { KeyboardTypeOptions, StyleProp, TextStyle, ViewStyle } from 'react-native';

import isEqual from 'react-fast-compare';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { isIos, K_SIZE_SCALE_16, K_SIZE_SCALE_20, sizeScale } from '@common';
import { Block, Button, Text, TextField } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { InputBaseProps } from '@components/text-field/type';
import { useTheme } from '@theme';
import { I18nKeys } from '@utils/i18n/locales';
import { TextInput } from 'react-native-gesture-handler';
import MaskInput, { Masks } from 'react-native-mask-input';
import { TextInputMask } from 'react-native-masked-text';
import { CustomCurrencyInput } from './customCurrencyInput';
import { useStyles } from './styles';

type Props = {
  value: string;
  fieldName?: I18nKeys;
  placeHolder?: string;
  control: Control<any, any>;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  errorsMsg?: string;
  security?: boolean;
  clearAllText?: boolean;
  errorsMsgProp?: string;
  onSetFieldValue?: (value: string) => void;
  hideErrorMsg?: boolean;
  optional?: boolean;
  obfuscation?: boolean;
  maskType?: typeof Masks;
  obfuscationCharacter?: string;
  inputStyle?: StyleProp<InputBaseProps>;
  inputContainerStyle?: StyleProp<InputBaseProps>;
  rightComponent?: ReactNode;
  isCurrency?: boolean;
  refs?: any;
  clearBtnStyle?: ViewStyle;
  disallowEdit?: boolean;
  currencyUseTextMask?: boolean;
  errorMsgStyle?: TextStyle;
  containerStyle?: ViewStyle;
  colorIcon?: string;
  isInputBottomSheet?: boolean;
};

const Component = (props: InputBaseProps & Props) => {
  const { colors } = useTheme();
  const styles = useStyles();
  const {
    control,
    value,
    fieldName,
    placeHolder,
    maxLength,
    keyboardType,
    errorsMsg,
    security,
    clearAllText,
    onSetFieldValue,
    errorsMsgProp,
    hideErrorMsg,
    optional,
    obfuscation,
    maskType,
    obfuscationCharacter,
    rightComponent,
    inputStyle,
    inputContainerStyle,
    isCurrency,
    refs,
    clearBtnStyle,
    disallowEdit,
    currencyUseTextMask,
    errorMsgStyle,
    containerStyle,
    colorIcon,
    isInputBottomSheet,
    ...rest
  }: InputBaseProps & Props = props;
  const { t } = useTranslation();
  const [isHidePassWord, setIsHidePassWord] = useState(security);
  const [focus, setFocus] = useState(false);
  const currentRef = useRef<TextInput>();

  const _onFocus = useCallback(
    (...arg) => {
      setFocus(true);
      props?.onFocus?.(...arg);
    },
    [props.onFocus]
  );

  const _onBlur = useCallback(
    (...arg) => {
      props?.onBlur?.(...arg);
      setFocus(false);
    },
    [props.onBlur]
  );

  const rightEyeColor = useMemo(() => {
    return colorIcon ?? (focus ? colors.color_800 : colors.color_400);
  }, [focus, colorIcon]);

  return (
    <Block style={[{ marginBottom: sizeScale(16) }, containerStyle]}>
      {fieldName != undefined && (
        <Text preset="subtitle4" color={colors.color_900} style={styles.title}>
          {t(fieldName)}
          {optional && (
            <Text preset="body1" color={colors.color_600}>
              {optional && ' (' + t('text:optional') + ')'}
            </Text>
          )}
        </Text>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) =>
          obfuscation || maskType ? (
            <MaskInput
              value={value}
              placeholderFillCharacter={''}
              placeholderTextColor={colors.color_600}
              mask={maskType ?? Masks.CREDIT_CARD}
              showObfuscatedValue
              maxLength={maxLength ?? undefined}
              keyboardType={keyboardType ?? 'default'}
              obfuscationCharacter={obfuscationCharacter ?? '#'}
              style={[inputStyle ?? styles.inputMask, focus && styles.focus]}
              onChangeText={onChange}
              returnKeyType="done"
              {...rest}
              onBlur={() => setFocus(false)}
              onFocus={() => setFocus(true)}
              placeholder={placeHolder}
            />
          ) : currencyUseTextMask ? (
            <TextInputMask
              type="money"
              style={[inputStyle ?? styles.inputMask]}
              options={{
                precision: 0,
                separator: '.',
                delimiter: ',',
                unit: '',
                suffixUnit: '',
              }}
              placeholder={placeHolder ?? ''}
              onBlur={_onBlur}
              onFocus={_onFocus}
              keyboardType="numeric"
              onChangeText={onChange}
              value={value}
              returnKeyType="done"
              selectionColor={colors.color_primary_500}
              maxLength={maxLength}
              ref={refs ?? null}
              {...rest}
            />
          ) : isCurrency ? (
            <CustomCurrencyInput
              value={value}
              delimiter=","
              separator=","
              placeholderTextColor={colors.color_600}
              maxLength={maxLength ?? undefined}
              style={[inputStyle, focus && styles.focus]}
              minValue={0}
              placeHolder={placeHolder}
              keyboardType={'number-pad'}
              precision={0}
              onBlur={_onBlur}
              onFocus={_onFocus}
              onChangeValue={onChange}
              rightComponent={rightComponent}
              {...rest}
            />
          ) : (
            <TextField
              isInputBottomSheet={isInputBottomSheet}
              typeInput="outline"
              error={errorsMsg ? true : false}
              errorBorderColor={colors.color_error_500}
              onBlur={(e) => {
                onBlur();
                _onBlur(e);
              }}
              onChangeText={onChange}
              value={value}
              editable={disallowEdit ? false : true}
              containerStyle={[
                inputContainerStyle ?? styles.containerInput,
                disallowEdit ? styles.disallowEdit : {},
              ]}
              style={inputStyle ?? styles.input}
              placeholder={placeHolder}
              maxLength={maxLength ?? undefined}
              keyboardType={keyboardType ?? 'default'}
              secureTextEntry={isHidePassWord}
              ref={refs ?? currentRef}
              returnKeyType="done"
              onFocus={_onFocus}
              {...rest}
              rightChildren={
                security ? (
                  <Button
                    onlyOpacity={true}
                    name="hidePassword"
                    onPress={() => {
                      setIsHidePassWord(!isHidePassWord);
                      if (isIos) {
                        setTimeout(() => {
                          currentRef?.current?.focus();
                        }, 100);
                      }
                    }}
                    style={styles.defaultRight}
                  >
                    {isHidePassWord ? (
                      <IconSvgLocal
                        name="IC_EYE"
                        width={K_SIZE_SCALE_20}
                        height={K_SIZE_SCALE_20}
                        color={rightEyeColor}
                      />
                    ) : (
                      <IconSvgLocal
                        name={'ICON_EYE_SPLASH_FILL'}
                        width={K_SIZE_SCALE_20}
                        height={K_SIZE_SCALE_20}
                        color={rightEyeColor}
                      />
                    )}
                  </Button>
                ) : clearAllText && value ? (
                  <Button
                    name="setValue"
                    onlyOpacity={true}
                    onPress={() => onSetFieldValue && onSetFieldValue('')}
                    style={clearBtnStyle ?? styles.defaultClearStyle}
                  >
                    <IconSvgLocal
                      name={'IC_REMOVE'}
                      width={K_SIZE_SCALE_16}
                      height={K_SIZE_SCALE_16}
                      color={colors.color_600}
                    />
                  </Button>
                ) : (
                  rightComponent ?? null
                )
              }
            />
          )
        }
        name={value}
      />
      {errorsMsg && !errorsMsgProp && !hideErrorMsg ? (
        <Text
          style={{ ...styles.defaultLblErr, ...errorMsgStyle }}
          color={colors.color_error_500}
          preset="caption1"
        >
          {t(errorsMsg)}
        </Text>
      ) : null}
      {errorsMsgProp && !hideErrorMsg && (
        <Text style={styles.defaultLblErr} color={colors.color_error_500} preset="caption1">
          {errorsMsgProp}
        </Text>
      )}
    </Block>
  );
};
const Input = memo(Component, isEqual);
export default Input;
