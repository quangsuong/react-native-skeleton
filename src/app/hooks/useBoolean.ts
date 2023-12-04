import { useCallback, useState } from 'react';

const useBoolean = (defaultValue = false): [boolean, () => void, () => void] => {
  const [visible, setVisible] = useState<boolean>(defaultValue);

  const open = useCallback(() => {
    setVisible(true);
  }, []);
  const close = useCallback(() => {
    setVisible(false);
  }, []);

  return [visible, open, close];
};

export default useBoolean;
