import  React from 'react';
import {
    Button,
    Text,
    View
} from "react-native";

import { decrement, increment, logout, selectApp } from '@redux/slices';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { useTranslation } from 'react-i18next';
import useLanguage from '@customHooks/useLanguage';
import { LANGUAGE_TYPE } from '@config/type';

export default function Login () {
    const {count} = useAppSelector(selectApp);
    const {language, onPressEn, onPressVn} = useLanguage();
    const [t] = useTranslation();
    const dispatch = useAppDispatch();
  return (
    <View>
        <Text>{count}</Text>
        <Text>{language}</Text>
        <Button title='+' onPress={()=>dispatch(increment())} />
        <Button title='-' onPress={()=>dispatch(decrement())} />
        <Button title={t('text:logout')} onPress={()=> dispatch(logout())} />
        <Button title={t('text:changeLanguage')} onPress={language===LANGUAGE_TYPE.vi ? onPressEn : onPressVn} />
    </View>
  );
}
