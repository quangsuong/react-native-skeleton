import { selectNotifcationCount } from '@redux-selector/app';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

interface Props {}

export const NotificationIconTab = () => {
  const notificationCount = useSelector(selectNotifcationCount);
  // render
  return (
    <>
      {notificationCount > 0 ? (
        <View
          style={{
            position: 'absolute',
            right: 20,
            top: 10,
            backgroundColor: 'red',
            borderRadius: 4,
            width: 8,
            height: 8,
          }}
        />
      ) : null}
    </>
  );
};
