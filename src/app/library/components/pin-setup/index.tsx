import { K_MARGIN_16, K_MARGIN_32, K_SIZE_32 } from '@common';
import { Block, Header, SectionTrack, Spacer, Text } from '@components';
import { BackgroundApp } from '@components/background-app';
import { PinCodeComponent } from '@components/pin-code/pinCodeComponent';
import { SetupPinProps } from '@components/pin-setup/type';
import useSetupPinHook from '@customHooks/useSetupPinHook';
import { useTheme } from '@theme';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

/**
 * Pin verify
 *
 * Component thiết lập mã pin
 * @constructor
 */
const Component = ({
  title1,
  title2,
  content1,
  content2,
  otpLength = 6,
  titleColor,
  contentColor,
  hideRightButton,
  onBack,
  onSuccess,
}: SetupPinProps) => {
  const [t] = useTranslation();
  const { colors } = useTheme();
  const { pinStep, pinCode, confirmPinCode, setPinChange, onPinFillDone, confirmPinCodeError } =
    useSetupPinHook({
      onSuccess,
    });

  // render
  return (
    <BackgroundApp turnOnSafe noTouch>
      <Header
        title={
          pinStep === 1 ? title1 || t('text:enter_new_pin') : title2 || t('text:confirm_new_pin')
        }
        onPressBack={onBack}
        rights={hideRightButton ? [] : [{ label: t('text:cancel'), onPress: onBack }]}
      />
      <SectionTrack name="BODY">
        <Block justifyContent={'center'}>
          <Spacer height={K_MARGIN_32} />
          <Block marginLeft={K_MARGIN_16} marginRight={K_MARGIN_16}>
            <Text
              preset={'body3'}
              color={contentColor || colors.color_700}
              text={
                pinStep === 1
                  ? content1 || t('validate:enter_new_pin_require')
                  : content2 || t('validate:enter_new_pin_require')
              }
              center
            />
          </Block>
          <Spacer height={K_SIZE_32} />
          <PinCodeComponent
            lengthOtp={otpLength}
            value={pinStep === 1 ? pinCode : confirmPinCode}
            onChange={setPinChange}
            onFillDone={onPinFillDone}
            textErr={confirmPinCodeError}
          />
        </Block>
      </SectionTrack>
    </BackgroundApp>
  );
};

export const SetupPinComponent = memo(Component, isEqual);
