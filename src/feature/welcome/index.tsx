import {Button, Text, View} from 'react-native';
import React from 'react';
import {
  decrement,
  increment,
  selectApp,
  useAppDispatch,
  useAppSelector,
} from '~redux';

const Welcome = () => {
  const {count} = useAppSelector(selectApp);
  const dispatch = useAppDispatch();
  return (
    <View>
      <Text>Hello React Native</Text>
      <Text>{count}</Text>
      <Button title="+" onPress={() => dispatch(increment())} />
      <Button title="-" onPress={() => dispatch(decrement())} />
    </View>
  );
};
export default Welcome;
