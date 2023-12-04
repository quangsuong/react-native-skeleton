/* eslint-disable @typescript-eslint/ban-ts-comment */
import { hideLoading, showLoading } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import forgotPasswordService from '@service/forgot-password-service';
import { forgotPasswordValidation } from '@validate/forgotPasswordValidation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useToast } from './useToast';

export function useForgotPassword() {
  const toast = useToast();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      phoneNumber: '',
      cardId: '',
      identifyNumber: '',
      pinNumber: '',
      accountNumber: '',
      fullname: '',

      // username: '0349729033',
      // phoneNumber: '0349729033',
      // cardId: '5174546110922672',
      // identifyNumber: '031077006383',
      // pinNumber: '0001',
      // accountNumber: '',
      // fullname: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(forgotPasswordValidation),
  });

  const submit = useCallback(async (data) => {
    showLoading();

    try {
      const rs = await forgotPasswordService.validateParams();
    } catch (error) {
    } finally {
      hideLoading();
    }
  }, []);

  const onSubmit = useCallback(handleSubmit(submit), []);

  return { onSubmit, control, handleSubmit, errors, isValid };
}
