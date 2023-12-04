import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useTheme } from '@theme';
import { useState } from 'react';

interface Props {
  initUsername?: string;
  from?: string;
}
const useSotpGuild = (props: Props) => {
  const { colors } = useTheme();
  const [guildContent, setGuildContent] = useState({ html: '' });

  const onSubmit = () => {
    navigate(APP_SCREEN.LOGIN);
  };

  return {
    colors,
    guildContent,
    onSubmit,
  };
};
export default useSotpGuild;
