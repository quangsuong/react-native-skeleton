import { Block, Button, Screen, Text } from '@components';
import { BackgroundApp } from '@components/background-app';
import { IconSvgLocal } from '@components/icon-vec-local';
import { goBack } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import React from 'react';
import NetworkLogger from 'react-native-network-logger';

export const NetworkLoggerScreen = () => {
  return (
    <Screen name={APP_SCREEN.NETWORK_LOGGER}>
      <BackgroundApp noTouch turnOnSafe backgroundColor={'white'}>
        <Block direction="row" padding={15}>
          <Block paddingHorizontal={15}>
            <Button onPress={goBack}>
              <IconSvgLocal name={'IC_ARROW_LEFT'} color={'black'} />
            </Button>
          </Block>
          <Text>{APP_SCREEN.NETWORK_LOGGER}</Text>
        </Block>
        <NetworkLogger />
      </BackgroundApp>
    </Screen>
  );
};
