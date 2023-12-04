import React, { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';

import { Button, Header, Modal, Spacer, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { PinCodeComponent } from '@components/pin-code/pinCodeComponent';
import { useTheme } from '@theme';
import { useTranslation } from 'react-i18next';
import { Platform, StatusBar, View } from 'react-native';
import { useStyle } from './styles';

interface PinModalProps {
  setTextErrPin: (errText: string) => void;
  setPinCode: (pin: string) => void;
  onHide: () => void;
  isVisibleModalPIN: boolean;
  onFullFill: (pin: string) => void;
  pinCode?: string;
  textErrPin: string;
}

const Component = (props: PinModalProps) => {
  const { setTextErrPin, setPinCode, onHide, isVisibleModalPIN, onFullFill, pinCode, textErrPin } =
    props;

  const [t] = useTranslation();
  const styles = useStyle();
  const { colors } = useTheme();

  const onChangePin = useCallback((pin) => {
    setPinCode(pin);
    setTextErrPin('');
  }, []);

  return (
    <Modal
      animatedOut="slideOutDown"
      animatedIn="slideInUp"
      backdropInDuration={200}
      isVisible={isVisibleModalPIN}
      hasGesture={false}
    >
      <View style={styles.containerPinCode}>
        <Spacer height={Platform.OS == 'android' ? StatusBar.currentHeight : 0} />
        <Header onPressBack={onHide} />
        <View style={styles.boxPinCode}>
          <Text
            textAlign="center"
            style={styles.title}
            preset="title1"
            t18n={t('text:login_with_pincode')}
          />
          <View>
            <PinCodeComponent
              textErr={textErrPin}
              onChange={onChangePin}
              value={pinCode}
              onFillDone={onFullFill}
            />
            <Button name="pressHide" onPress={onHide} style={styles.boxButtonPin}>
              <IconSvgLocal
                name={'IC_LOCK_PIN_BLUE_FILL'}
                color={colors.color_link_500}
                width={20}
                height={20}
              />
              <Text
                preset="body1"
                t18n="text:login_by_password"
                color={colors.color_link_500}
                style={styles.txtLoginPass}
              />
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export const PinModal = memo(Component, isEqual);
