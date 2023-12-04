import { dispatch } from '@common';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { OthersActions } from '../redux/action-slice/others';
import { ActionContext, ScreenContext, SectionContext } from './trackContext';
// import { showAlert } from "@components/alert";

interface Props {
  section?: string;
  control?: string;
  action?: string;
}

const useTracking = (props: Props) => {
  const { control, section, action } = props;
  const screenName = useContext(ScreenContext)?.name || '';
  const sectionName = section || useContext(SectionContext)?.name || '';
  const controlName = control || 'Button';
  const actionName = action || useContext(ActionContext)?.name || '';
  const [t] = useTranslation();

  const onPressTracking = useCallback(() => {
    if (!actionName) return;
    const eventName = `${screenName}_${sectionName}_${controlName}_${actionName}`;
  }, []);

  const showFeatureDeveloping = useCallback(() => {
    dispatch(OthersActions.showAlert());
  }, []);

  return { onPressTracking, showFeatureDeveloping };
};

export default useTracking;
