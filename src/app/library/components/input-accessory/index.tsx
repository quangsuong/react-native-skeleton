import { isIos, K_SIZE_4, K_SIZE_8 } from '@common';
import { IconSvgLocal } from '@components/icon-vec-local';
import { Spacer } from '@components/spacer';
import { useTheme } from '@theme';
import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Block } from '../block';
import { KeyboardAccessoryView } from '../keyboard-accessory';
import { Text } from '../text';
import { useStyle } from './style';
import { InputAccessoryProps } from './type';

import { Button } from '@components/button';
import { InputAccessoryView, Keyboard } from 'react-native';
/**Example:
 *    <InputAccessoryComponent
            keyboardType="default"
            nextKeyboard="numeric"
            onChangeType={e => {
              setKeyboardInput(e);
            }}
            nativeID="1"
     />
     <TextField inputAccesoryID="1"/>
     IOS must be added nativeID and inputAccessoryID in TextField to work
 *
 */
const Component: FC<InputAccessoryProps> = (props) => {
  const styles = useStyle();
  const { colors } = useTheme();

  const {
    keyboardType = undefined,
    nextKeyboard = 'numeric',
    inputRef,
    onChangeType,
    title,
    nativeID,
    keyboardHeight,
  } = props;
  const [type, setType] = useState('');
  const handleInput = useCallback(() => {
    if (keyboardType === nextKeyboard && !onChangeType) {
      return;
    }
    onChangeType(type === keyboardType ? nextKeyboard : keyboardType);
    inputRef.current.autoFocus = true;
    setType(type === keyboardType ? nextKeyboard : keyboardType);
  }, [inputRef, keyboardType, nextKeyboard, onChangeType, type]);

  const closeKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const renderButton = useMemo(
    () => (
      <Button style={styles.button} name="changeType" onPress={handleInput}>
        <Block direction="row" alignItems="center">
          <IconSvgLocal color={colors.color_900} name="IC_KEYBOARD" />
          <Spacer width={K_SIZE_4} />
          <Text preset="body2" color={colors.color_900}>
            {title}
          </Text>
        </Block>
      </Button>
    ),
    [colors.color_900, handleInput, styles.button, title]
  );

  if (inputRef) {
    return isIos ? (
      <InputAccessoryView nativeID={nativeID}>
        <Block
          direction="row"
          color={colors.color_300}
          alignItems="center"
          justifyContent="space-between"
          padding={K_SIZE_8}
        >
          {renderButton}
          <Text onPress={closeKeyboard} preset="body3" t18n="text:done_1" />
        </Block>
      </InputAccessoryView>
    ) : (
      <KeyboardAccessoryView
        androidAdjustResize
        style={styles.root}
        keyboardHeight={keyboardHeight}
        heightProperty="minHeight"
      >
        <Block
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          padding={K_SIZE_8}
        >
          {renderButton}
          <Text onPress={closeKeyboard} preset="body3" t18n="text:done_1" />
        </Block>
      </KeyboardAccessoryView>
    );
  }
  return null;
};
export const InputAccessoryComponent = memo(Component, isEqual);
