import React, { forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { useTheme } from '@theme';
import { styles } from './styles';
import { DateTimePickerProps } from './type';
import { useDatePicker } from './use-date-picker';

export const DateTimePicker = forwardRef((props: DateTimePickerProps, ref) => {
  //props
  const { t18n, value } = props;
  const {
    date,
    onChangeDateTime,
    themeDarkPicker,
    onPressConfirm,
    setActionVisible,
    actionVisible,
    onPressClose,
  } = useDatePicker(props);

  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setActionVisible(true);
      },
      hide: () => {
        setActionVisible(false);
      },
    }),
    []
  );

  // state

  const [t, i18n] = useTranslation();
  const { colors } = useTheme();

  if (!actionVisible) {
    return null;
  }
  // render
  return (
    <View style={styles.modal}>
      {/* <View style={[styles.wrap, {backgroundColor: K_IS_IOS ? colors.bg_picker: Colors.color_50}]}>
        <View style={styles.wrapTitle}>
          <View style={styles.close_wrap}>
            <Button onPress={onPressClose}>
              <View style={styles.close}>
                <ICON_CLOSE width={K_SIZE_SCALE_12} height={K_SIZE_SCALE_12} color={K_IS_IOS?colors.text:Colors.black} />
              </View>
            </Button>
          </View>
          <Text t18n={t18n} preset={'title1'} style={[styles.title,{color:K_IS_IOS?colors.text:Colors.black}]}/>
        </View>
        <Divider/>
        <DatePicker
          theme={themeDarkPicker? 'dark' : 'light'}
          style={{ width: K_SCREEN_WIDTH, height: 268 }}
          locale={i18n.language}
          androidVariant={'iosClone'}
          mode={'date'}
          textColor={K_IS_IOS? colors.text: Colors.black}
          date={date || new Date()}
          onDateChange={onChangeDateTime} />
        <Spacer height={K_SIZE_16} />
        <ButtonGradient
          preset={'default:bold_14'}
          style={{
            width: K_SCREEN_WIDTH - K_PADDING_32,
            height: K_BUTTON_HEIGHT,
            borderRadius: K_BORDER_RADIUS_4
          }}
          center
          t18n={'text:confirm'}
          textColor={colors.label_button_color}
          onPress={onPressConfirm}
        />
        <Spacer height={K_SIZE_36} />
        </View> */}
    </View>
  );
});

export interface DateTimePicker {
  show(): void;
  hide(): void;
}
