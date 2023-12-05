import  React, {useState} from 'react';
import {
    Text,
    View,
    TextInput,
    Button
} from "react-native";
 
import { login } from '@redux/slices';
import { AppThunkDispatch } from '@redux/store';
import { useDispatch } from 'react-redux';

export default function Login () {
  const dispatch = useDispatch<AppThunkDispatch>();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = ()=>{
    dispatch(login({ username, password }));
  }

  return (
    <View>
        <Text>Login</Text>
        <View>
          <Text>Username:</Text>
          <TextInput
            onChangeText={setUsername}
            value={username}
          />
        </View>
        <View>
          <Text>Password:</Text>
          <TextInput
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <Button title='Login' onPress={handleLogin} />
    </View>
  );
}
