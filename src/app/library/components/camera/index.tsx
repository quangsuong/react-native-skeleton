import React, { memo, useRef } from 'react';
import isEqual from 'react-fast-compare';
import { RNCamera } from 'react-native-camera';
import { Props } from './type';
// import { find, first } from 'lodash';

const Component = (props: Props) => {
  const refCamera = useRef(null);
  const { style, onGoogleVisionBarcodesDetected, flashMode } = props;
  // const [typeOfCamera, setTypeOfCamera] = useState();

  // useEffect(() => {
  //   if (refCamera.current) {
  //     const prepareTypeOfCam = async () => {
  //       const res = await refCamera?.current?.getCameraIdsAsync()
  //       if (!res || res?.length === 0) {
  //         return
  //       }
  //       console.log("🚀 ~ file: index.tsx:14 ~ prepareTypeOfCam ~ res:", res)
  //       const cameraltraWide = find(res, { 'deviceType': 'AVCaptureDeviceTypeBuiltInUltraWideCamera' });
  //       console.log("🚀 ~ file: index.tsx:21 ~ prepareTypeOfCam ~ cameraltraWide:", cameraltraWide)
  //       if (cameraltraWide) {
  //         setTypeOfCamera(cameraltraWide);
  //       } else {
  //         setTypeOfCamera(first(res));
  //       }
  //     }
  //     prepareTypeOfCam()
  //   }
  //   console.log("🚀 ~ file: index.tsx:12 ~ useEffect ~ RNCamera.Constants.DeviceType.AVCaptureDeviceTypeBuiltInUltraWideCamera:", typeOfCamera)
  // }, [])

  // render
  return (
    <RNCamera
      ref={refCamera}
      style={style}
      type={RNCamera.Constants.Type.back}
      barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      onGoogleVisionBarcodesDetected={onGoogleVisionBarcodesDetected}
      autoFocus={RNCamera.Constants.AutoFocus.on}
      captureAudio={false}
      flashMode={flashMode || 0}
    />
  );
};
export const CameraScanQR = memo(Component, isEqual);
