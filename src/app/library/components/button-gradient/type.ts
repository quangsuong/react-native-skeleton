import { CustomOmit } from '@common';
import { ButtonProps } from '@components/button/type';
import { ViewStyle } from 'react-native';

export interface ButtonGradientProps extends CustomOmit<ButtonProps, 'buttonColor'>, ViewStyle {}
