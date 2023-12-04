import  React from 'react';
import {
    Button,
    Text,
    View
} from "react-native";

import { decrement, increment, selectApp } from '@redux/slices';
import { useAppDispatch, useAppSelector } from '@redux/store';

export default function Login () {
    const {count} = useAppSelector(selectApp);
    const dispatch = useAppDispatch();
  return (
    <View>
        <Text>{count}</Text>
        <Button title='+' onPress={()=>dispatch(increment())} />
        <Button title='-' onPress={()=>dispatch(decrement())} />
    </View>
  );
}
