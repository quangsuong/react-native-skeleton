import * as yup from 'yup';
import { REGEX } from './constant';

export const forgotPasswordValidation = yup.object().shape({
  // username: yup.string().required('validate:required_username'),
  identifyNumber: yup
    .string()
    .required('validate:required_identify_number')
    .min(8, 'validate:wrong_format_identify_numbed')
    .matches(REGEX.ONLY_NUMBER, 'validate:wrong_format_identify_numbed'),
  phoneNumber: yup
    .string()
    .required('validate:required_phone_number')
    .min(10, 'validate:wrong_format_phone')
    .matches(REGEX.PHONE, 'validate:wrong_format_phone'),
  cardId: yup
    .string()
    .required('validate:required_credit_card')
    .min(19, 'validate:wrong_format_credit_card'),
  pinNumber: yup.string().required('validate:required_pin_number'),
});
