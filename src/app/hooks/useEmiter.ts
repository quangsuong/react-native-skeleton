import { useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import eventConstant from '../common/constant/eventConstant';

interface Props {
  onListen: (...params: any) => void;
  event: keyof typeof eventConstant;
}

function useEmiter(props: Props) {
  const { onListen, event } = props;
  useEffect(() => {
    return DeviceEventEmitter.addListener(event, onListen).remove;
  }, [onListen]);
}

export default useEmiter;
