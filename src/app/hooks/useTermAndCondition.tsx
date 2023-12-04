import { navigate } from '@navigation/navigation-service';
import { useTheme } from '@theme';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  initUsername?: string;
  from?: string;
}
const useTermAndCondition = (props: Props) => {
  const [t] = useTranslation();
  const { colors } = useTheme();
  const [isCheck, setIsCheck] = useState(false);
  const [termContent, setTermContent] = useState({ html: '' });

  const onSubmit = () => {
    navigate('ENTER_ACTIVE_SOTP');
  };
  const onToggle = () => {
    setIsCheck(!isCheck);
  };

  return {
    colors,
    isCheck,
    termContent,
    onSubmit,
    onToggle,
  };
};
export default useTermAndCondition;
