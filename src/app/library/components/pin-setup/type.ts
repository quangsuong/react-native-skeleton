const PinSteps = {
  1: 'STEP_1',
  2: 'STEP_2',
};

export type PIN_STEP = keyof typeof PinSteps;

export interface SetupPinProps {
  otpLength?: number;
  title1?: string;
  content1?: string;
  title2?: string;
  content2?: string;
  titleColor?: string;
  contentColor?: string;
  hideRightButton?: boolean;
  onBack?: () => void;
  onSuccess?: (pin: string) => void;
}
