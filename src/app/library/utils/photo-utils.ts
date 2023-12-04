import { BugsnagUtil, isIos, K_IS_IOS, OptionCallBack, requestPermission } from '@common';
import { showAlert } from '@components/alert';
import ImageCropPicker, { Options as _ } from 'react-native-image-crop-picker';
import { openSettings, Permission, PERMISSIONS, RESULTS } from 'react-native-permissions';
import i18n from './i18n/i18n';
import { I18nKeys } from './i18n/locales';
// import imgPicker, { ImagePickerOption as _ } from 'react-native-syan-image-picker';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

const platform = isIos ? 'IOS' : 'ANDROID';
const permissionPlatform = PERMISSIONS[platform];

const perPhoto = isIos
  ? PERMISSIONS.IOS.PHOTO_LIBRARY // ios
  : Platform.Version.toString() > '32'
  ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES // android 13
  : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE; // android < 13

export const PERMISSIONS_RESULT = RESULTS;
export type ImagePickerOption = _;

function onBlock(content: I18nKeys) {
  showAlert({
    title: i18n.t('alert:notify'),
    content: i18n.t(content),
    type: 'confirm',
    actions: [
      {
        title: i18n.t('alert:cancel'),
        type: 'secondary',
        onPress: () => {},
      },
      {
        title: i18n.t('alert:open_setting'),
        type: 'primary',
        onPress: () => {
          openSettings();
        },
      },
    ],
  });
}

function onCamBlock() {
  onBlock('alert:request_camera_permission');
}

function onPhotoBlock() {
  onBlock('alert:request_photo_permission');
}

const photoUtils = {
  requestCam: function () {
    const perType = permissionPlatform.CAMERA;
    return photoUtils.request(perType, {
      onBlocked: onCamBlock,
    });
  },
  requestPhoto: () => {
    return photoUtils.request(perPhoto, {
      onBlocked: onPhotoBlock,
    });
  },
  request: (perType: Permission, optionCallBack?: OptionCallBack) => {
    return new Promise(async (resolve, reject) => {
      // const per = await check(perType);

      // console.log('====================================');
      // console.log('per',per);
      // console.log('====================================');
      // switch (per) {
      //     case RESULTS.GRANTED:
      //         return resolve(RESULTS.GRANTED)
      //     case RESULTS.BLOCKED:
      //         return onCamBlock();
      //     default:
      //         break;
      // }
      requestPermission(perType, {
        ...optionCallBack,
        onGranted: () => {
          optionCallBack?.onGranted?.();
          resolve(RESULTS.GRANTED);
        },
        onBlocked: () => {
          optionCallBack?.onBlocked?.();
          resolve(RESULTS.DENIED);
        },
      });
    });
  },
  capture: async function (option?: ImagePickerOption) {
    const per = await photoUtils.requestCam();
    if (per !== PERMISSIONS_RESULT.GRANTED) throw new Error('Not Allow Permission');
    try {
      // const imgs = await imgPicker.asyncOpenCamera(option ?? {})
      // return imgs[0]
    } catch (error) {
      // @ts-ignore
      BugsnagUtil.notify(error);
    }
  },
  pickPhoto: async function (option?: ImagePickerOption) {
    const per = await photoUtils.requestPhoto();
    if (per !== PERMISSIONS_RESULT.GRANTED) throw new Error('Not Allow Permission');
    try {
      const img = await ImageCropPicker.openPicker({
        mediaType: 'photo',
        ...option,
      });
      return img;
    } catch (error) {
      // @ts-ignore
      BugsnagUtil.notify(error);
    }
  },

  /**
   * make video/image file from base64 string
   * @param orgBase64 orgin base64 string
   * @param type 0= image, 1= video
   * @returns media file
   */
  makeMediaFileFromBase64: async function (orgBase64: string, type = 0) {
    let defMimeType = 'image/jpeg';
    if (type === 1) {
      defMimeType = 'video/mp4';
    }
    try {
      const base64 = orgBase64.replace(`data:${defMimeType};base64,`, '');
      const fileName = type === 0 ? `${Date.now()}.jpeg` : 'videoVerify.mp4';
      const split = K_IS_IOS ? '' : '/';
      const path = `${RNFS.TemporaryDirectoryPath}${split}${fileName}`;
      await RNFS.writeFile(path, base64, 'base64');
      const image = {
        uri: Platform.OS == 'ios' ? path : 'file://' + path,
        name: fileName,
        type: defMimeType,
      };
      return image;
    } catch (error) {
      console.log('error on make media file from base64', error);
    }
  },
};

export default photoUtils;
