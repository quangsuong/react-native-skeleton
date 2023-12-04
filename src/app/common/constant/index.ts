import { translate } from '@utils/i18n/translate';
import { Dimensions, PixelRatio, Platform, StyleSheet } from 'react-native';
import { fontScale, sizeScale } from '../scale';

export const K_WINDOW_WIDTH = Dimensions.get('window').width;
export const K_WINDOW_HEIGHT = Dimensions.get('window').height;
export const K_SCREEN_HEIGHT = Dimensions.get('screen').height;
export const K_SCREEN_WIDTH = Dimensions.get('screen').width;

//===================STORAGE_KEY===================//
export const STORAGE_KEY_TOKEN = 'TOKEN';
export const STORAGE_KEY_APP_THEME = 'APP_THEME';
export const STORAGE_KEY_LANGUAGE = 'STORAGE_KEY_LANGUAGE';
export const STORAGE_KEY_BIOMETRICS = 'is-biometrics-enabled';
export const STORAGE_KEY_UUID = 'STORAGE_KEY_UUID';
export const STORAGE_KEY_HIDE_AMOUNT = 'STORAGE_KEY_HIDE_AMOUNT';
export const STORAGE_KEY_AGREED_TERM_SOTP = 'STORAGE_KEY_AGREED_TERM_SOTP';
export const STORAGE_KEY_STATUS_LOGIN = 'STORAGE_KEY_STATUS_LOGIN';
export const STORAGE_KEY_PIN_LOGIN = 'STORAGE_KEY_PIN_LOGIN';
export const STORAGE_KEY_PIN_LOGIN_ERR = 'STORAGE_KEY_PIN_LOGIN_ERR';
export const STORAGE_KEY_ERR_PASS_LOGIN = 'STORAGE_KEY_ERR_PASS_LOGIN';
export const TYPE_BIOMETRIC = 'TYPE_BIOMETRIC';

//===================STORAGE_KEY===================//

export const K_HOT_LINE = {
  toString() {
    return translate('text:hotline_number'); //'1900 5555 92';
  },
};

export const K_IS_IOS = Platform.OS === 'ios';

export const K_IOS_VERSION_GREATER_THAN_OR_EQUAL_TO_16 = K_IS_IOS && Platform.Version >= '16.0';

export const widthToDp = (number: number | string) => {
  const actualWidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((K_SCREEN_WIDTH * actualWidth) / 100);
};

export const heightToDp = (number: number | string) => {
  const actualHeight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((K_SCREEN_WIDTH * actualHeight) / 100);
};

export const K_BUTTON_HEIGHT = 44;

export const K_SIZE_1 = 1;
export const K_SIZE_2 = 2;
export const K_SIZE_4 = 4;
export const K_SIZE_6 = 6;
export const K_SIZE_7 = 7;
export const K_SIZE_8 = 8;
export const K_SIZE_10 = 10;
export const K_SIZE_12 = 12;
export const K_SIZE_14 = 14;
export const K_SIZE_16 = 16;
export const K_SIZE_18 = 18;
export const K_SIZE_20 = 20;
export const K_SIZE_22 = 22;
export const K_SIZE_24 = 24;
export const K_SIZE_26 = 26;
export const K_SIZE_28 = 28;
export const K_SIZE_30 = 30;
export const K_SIZE_32 = 32;
export const K_SIZE_34 = 34;
export const K_SIZE_36 = 36;
export const K_SIZE_37 = 37;
export const K_SIZE_38 = 38;
export const K_SIZE_39 = 39;
export const K_SIZE_40 = 40;
export const K_SIZE_42 = 42;
export const K_SIZE_44 = 44;
export const K_SIZE_46 = 46;
export const K_SIZE_48 = 48;
export const K_SIZE_50 = 50;
export const K_SIZE_52 = 52;
export const K_SIZE_56 = 56;
export const K_SIZE_60 = 60;
export const K_SIZE_64 = 64;
export const K_SIZE_65 = 65;
export const K_SIZE_66 = 66;
export const K_SIZE_67 = 67;
export const K_SIZE_68 = 68;
export const K_SIZE_70 = 70;
export const K_SIZE_72 = 72;
export const K_SIZE_74 = 74;
export const K_SIZE_78 = 78;
export const K_SIZE_80 = 80;
export const K_SIZE_85 = 85;
export const K_SIZE_86 = 86;
export const K_SIZE_88 = 88;
export const K_SIZE_90 = 90;
export const K_SIZE_94 = 94;
export const K_SIZE_100 = 100;
export const K_SIZE_104 = 104;
export const K_SIZE_108 = 108;
export const K_SIZE_112 = 112;
export const K_SIZE_120 = 120;
export const K_SIZE_151 = 151;
export const K_SIZE_200 = 200;
export const K_SIZE_260 = 260;

export const K_SIZE_SCALE_1 = sizeScale(1);
export const K_SIZE_SCALE_2 = sizeScale(2);
export const K_SIZE_SCALE_4 = sizeScale(4);
export const K_SIZE_SCALE_6 = sizeScale(6);
export const K_SIZE_SCALE_8 = sizeScale(8);
export const K_SIZE_SCALE_10 = sizeScale(10);
export const K_SIZE_SCALE_12 = sizeScale(12);
export const K_SIZE_SCALE_14 = sizeScale(14);
export const K_SIZE_SCALE_15 = sizeScale(15);
export const K_SIZE_SCALE_16 = sizeScale(16);
export const K_SIZE_SCALE_17 = sizeScale(17);
export const K_SIZE_SCALE_18 = sizeScale(18);
export const K_SIZE_SCALE_20 = sizeScale(20);
export const K_SIZE_SCALE_22 = sizeScale(22);
export const K_SIZE_SCALE_24 = sizeScale(24);
export const K_SIZE_SCALE_26 = sizeScale(26);
export const K_SIZE_SCALE_28 = sizeScale(28);
export const K_SIZE_SCALE_30 = sizeScale(30);
export const K_SIZE_SCALE_32 = sizeScale(32);
export const K_SIZE_SCALE_34 = sizeScale(34);
export const K_SIZE_SCALE_36 = sizeScale(36);
export const K_SIZE_SCALE_38 = sizeScale(38);
export const K_SIZE_SCALE_40 = sizeScale(40);
export const K_SIZE_SCALE_42 = sizeScale(42);
export const K_SIZE_SCALE_44 = sizeScale(44);
export const K_SIZE_SCALE_46 = sizeScale(46);
export const K_SIZE_SCALE_48 = sizeScale(48);
export const K_SIZE_SCALE_49 = sizeScale(49);
export const K_SIZE_SCALE_50 = sizeScale(50);
export const K_SIZE_SCALE_52 = sizeScale(52);
export const K_SIZE_SCALE_56 = sizeScale(K_SIZE_56);
export const K_SIZE_SCALE_60 = sizeScale(K_SIZE_60);
export const K_SIZE_SCALE_64 = sizeScale(K_SIZE_64);
export const K_SIZE_SCALE_65 = sizeScale(K_SIZE_65);
export const K_SIZE_SCALE_66 = sizeScale(K_SIZE_66);
export const K_SIZE_SCALE_67 = sizeScale(K_SIZE_67);
export const K_SIZE_SCALE_68 = sizeScale(K_SIZE_68);
export const K_SIZE_SCALE_72 = sizeScale(K_SIZE_72);
export const K_SIZE_SCALE_74 = sizeScale(K_SIZE_74);
export const K_SIZE_SCALE_78 = sizeScale(K_SIZE_78);
export const K_SIZE_SCALE_80 = sizeScale(K_SIZE_80);
export const K_SIZE_SCALE_85 = sizeScale(K_SIZE_85);
export const K_SIZE_SCALE_86 = sizeScale(K_SIZE_86);
export const K_SIZE_SCALE_88 = sizeScale(K_SIZE_88);
export const K_SIZE_SCALE_90 = sizeScale(K_SIZE_90);
export const K_SIZE_SCALE_100 = sizeScale(K_SIZE_100);
export const K_SIZE_SCALE_104 = sizeScale(K_SIZE_104);
export const K_SIZE_SCALE_108 = sizeScale(K_SIZE_108);
export const K_SIZE_SCALE_112 = sizeScale(K_SIZE_112);
export const K_SIZE_SCALE_120 = sizeScale(K_SIZE_120);
export const K_SIZE_SCALE_151 = sizeScale(K_SIZE_151);
export const K_SIZE_SCALE_200 = sizeScale(K_SIZE_200);
export const K_SIZE_SCALE_260 = sizeScale(K_SIZE_260);

//////////////////////////////////////////////////////

export const K_BORDER_WIDTH_1 = 1;
export const K_BORDER_WIDTH_2 = 2;

//////////////////////////////////////////////////////

export const K_BORDER_RADIUS_4 = 4;
export const K_BORDER_RADIUS_6 = 6;
export const K_BORDER_RADIUS_8 = 8;
export const K_BORDER_RADIUS_12 = 12;
export const K_BORDER_RADIUS_16 = 16;
export const K_BORDER_RADIUS_20 = 20;
export const K_BORDER_RADIUS_22 = 22;
export const K_BORDER_RADIUS_24 = 24;
export const K_BORDER_RADIUS_26 = 26;
export const K_BORDER_RADIUS_30 = 30;
export const K_BORDER_RADIUS_32 = 32;
export const K_BORDER_RADIUS_36 = 36;

//////////////////////////////////////////////////////

export const K_PADDING_1 = 1;
export const K_PADDING_2 = 2;
export const K_PADDING_3 = 3;
export const K_PADDING_4 = 4;
export const K_PADDING_5 = 5;
export const K_PADDING_6 = 6;
export const K_PADDING_8 = 8;
export const K_PADDING_10 = 10;
export const K_PADDING_12 = 12;
export const K_PADDING_14 = 14;
export const K_PADDING_16 = 16;
export const K_PADDING_20 = 20;
export const K_PADDING_24 = 24;
export const K_PADDING_32 = 32;
export const K_PADDING_36 = 36;
export const K_PADDING_40 = 40;
export const K_PADDING_46 = 46;
export const K_PADDING_52 = 52;
export const K_PADDING_56 = 56;
export const K_PADDING_60 = 60;

//////////////////////////////////////////////////////

export const K_PADDING_VERTICAL_4 = 4;
export const K_PADDING_VERTICAL_8 = 8;
export const K_PADDING_VERTICAL_16 = 16;
export const K_PADDING_VERTICAL_24 = 24;
export const K_PADDING_VERTICAL_32 = 32;

//////////////////////////////////////////////////////

export const K_PADDING_HORIZONTAL_4 = 4;
export const K_PADDING_HORIZONTAL_8 = 8;
export const K_PADDING_HORIZONTAL_16 = 16;
export const K_PADDING_HORIZONTAL_24 = 24;
export const K_PADDING_HORIZONTAL_32 = 32;

//////////////////////////////////////////////////////

export const K_MARGIN_4 = 4;
export const K_MARGIN_6 = 6;
export const K_MARGIN_8 = 8;
export const K_MARGIN_10 = 10;
export const K_MARGIN_12 = 12;
export const K_MARGIN_16 = 16;
export const K_MARGIN_20 = 20;
export const K_MARGIN_24 = 24;
export const K_MARGIN_30 = 30;
export const K_MARGIN_32 = 32;
export const K_MARGIN_36 = 36;
export const K_MARGIN_40 = 40;
export const K_MARGIN_42 = 42;
export const K_MARGIN_60 = 60;

//////////////////////////////////////////////////////

export const K_MARGIN_VERTICAL_4 = 4;
export const K_MARGIN_VERTICAL_8 = 8;
export const K_MARGIN_VERTICAL_16 = 16;
export const K_MARGIN_VERTICAL_24 = 24;
export const K_MARGIN_VERTICAL_32 = 32;

//////////////////////////////////////////////////////

export const K_MARGIN_HORIZONTAL_4 = 4;
export const K_MARGIN_HORIZONTAL_8 = 8;
export const K_MARGIN_HORIZONTAL_16 = 16;
export const K_MARGIN_HORIZONTAL_24 = 24;
export const K_MARGIN_HORIZONTAL_32 = 32;

///////////////////////////////// SIZE SCALE ////////////////////////////////////////

export const K_MARGIN_SCALE_4 = sizeScale(K_MARGIN_4);
export const K_MARGIN_SCALE_6 = sizeScale(K_MARGIN_6);
export const K_MARGIN_SCALE_8 = sizeScale(K_MARGIN_8);
export const K_MARGIN_SCALE_16 = sizeScale(K_MARGIN_16);
export const K_MARGIN_SCALE_24 = sizeScale(K_MARGIN_24);
export const K_MARGIN_SCALE_32 = sizeScale(K_MARGIN_32);

//////////////////////////////////////////////////////

export const K_MARGIN_SCALE_VERTICAL_4 = sizeScale(K_MARGIN_VERTICAL_4);
export const K_MARGIN_SCALE_VERTICAL_8 = sizeScale(K_MARGIN_VERTICAL_8);
export const K_MARGIN_SCALE_VERTICAL_16 = sizeScale(K_MARGIN_VERTICAL_16);
export const K_MARGIN_SCALE_VERTICAL_24 = sizeScale(K_MARGIN_VERTICAL_24);
export const K_MARGIN_SCALE_VERTICAL_32 = sizeScale(K_MARGIN_VERTICAL_32);

//////////////////////////////////////////////////////

export const K_MARGIN_SCALE_HORIZONTAL_4 = sizeScale(K_MARGIN_HORIZONTAL_4);
export const K_MARGIN_SCALE_HORIZONTAL_8 = sizeScale(K_MARGIN_HORIZONTAL_8);
export const K_MARGIN_SCALE_HORIZONTAL_16 = sizeScale(K_MARGIN_HORIZONTAL_16);
export const K_MARGIN_SCALE_HORIZONTAL_24 = sizeScale(K_MARGIN_HORIZONTAL_24);
export const K_MARGIN_SCALE_HORIZONTAL_32 = sizeScale(K_MARGIN_HORIZONTAL_32);

//////////////////////////////////////////////////////

export const K_PADDING_SCALE_4 = sizeScale(K_PADDING_4);
export const K_PADDING_SCALE_8 = sizeScale(K_PADDING_8);
export const K_PADDING_SCALE_16 = sizeScale(K_PADDING_16);
export const K_PADDING_SCALE_24 = sizeScale(K_PADDING_24);
export const K_PADDING_SCALE_32 = sizeScale(K_PADDING_32);

//////////////////////////////////////////////////////

export const K_PADDING_SCALE_VERTICAL_4 = sizeScale(K_PADDING_VERTICAL_4);
export const K_PADDING_SCALE_VERTICAL_8 = sizeScale(K_PADDING_VERTICAL_8);
export const K_PADDING_SCALE_VERTICAL_16 = sizeScale(K_PADDING_VERTICAL_16);
export const K_PADDING_SCALE_VERTICAL_24 = sizeScale(K_PADDING_VERTICAL_24);
export const K_PADDING_SCALE_VERTICAL_32 = sizeScale(K_PADDING_VERTICAL_32);

//////////////////////////////////////////////////////

export const K_PADDING_SCALE_HORIZONTAL_4 = sizeScale(K_PADDING_HORIZONTAL_4);
export const K_PADDING_SCALE_HORIZONTAL_8 = sizeScale(K_PADDING_HORIZONTAL_8);
export const K_PADDING_SCALE_HORIZONTAL_16 = sizeScale(K_PADDING_HORIZONTAL_16);
export const K_PADDING_SCALE_HORIZONTAL_24 = sizeScale(K_PADDING_HORIZONTAL_24);
export const K_PADDING_SCALE_HORIZONTAL_32 = sizeScale(K_PADDING_HORIZONTAL_32);

///////////////////////////////// SCALE ////////////////////////////////////////

///////////////////////////////// FONT NON-SCALE ////////////////////////////////////////

export const K_FONT_SIZE_NON_8 = 8;
export const K_FONT_SIZE_NON_9 = 9;
export const K_FONT_SIZE_NON_10 = 10;
export const K_FONT_SIZE_NON_11 = 11;
export const K_FONT_SIZE_NON_12 = 12;
export const K_FONT_SIZE_NON_13 = 13;
export const K_FONT_SIZE_NON_14 = 14;
export const K_FONT_SIZE_NON_15 = 15;
export const K_FONT_SIZE_NON_16 = 16;
export const K_FONT_SIZE_NON_17 = 17;
export const K_FONT_SIZE_NON_18 = 18;
export const K_FONT_SIZE_NON_19 = 19;
export const K_FONT_SIZE_NON_20 = 20;
export const K_FONT_SIZE_NON_21 = 21;
export const K_FONT_SIZE_NON_22 = 22;
export const K_FONT_SIZE_NON_23 = 23;
export const K_FONT_SIZE_NON_24 = 24;
export const K_FONT_SIZE_NON_25 = 25;
export const K_FONT_SIZE_NON_26 = 26;
export const K_FONT_SIZE_NON_27 = 27;
export const K_FONT_SIZE_NON_28 = 28;
export const K_FONT_SIZE_NON_29 = 29;
export const K_FONT_SIZE_NON_30 = 30;
export const K_FONT_SIZE_NON_31 = 31;
export const K_FONT_SIZE_NON_32 = 32;
export const K_FONT_SIZE_NON_33 = 33;
export const K_FONT_SIZE_NON_34 = 34;
export const K_FONT_SIZE_NON_35 = 35;
export const K_FONT_SIZE_NON_36 = 36;
export const K_FONT_SIZE_NON_38 = 38;
export const K_FONT_SIZE_NON_39 = 39;
export const K_FONT_SIZE_NON_40 = 40;
export const K_FONT_SIZE_NON_48 = 48;

///////////////////////////////// FONT SCALE ////////////////////////////////////////

export const K_FONT_SIZE_8 = fontScale(K_FONT_SIZE_NON_8);
export const K_FONT_SIZE_9 = fontScale(K_FONT_SIZE_NON_9);
export const K_FONT_SIZE_10 = fontScale(K_FONT_SIZE_NON_10);
export const K_FONT_SIZE_11 = fontScale(K_FONT_SIZE_NON_11);
export const K_FONT_SIZE_12 = fontScale(K_FONT_SIZE_NON_12);
export const K_FONT_SIZE_13 = fontScale(K_FONT_SIZE_NON_13);
export const K_FONT_SIZE_14 = fontScale(K_FONT_SIZE_NON_14);
export const K_FONT_SIZE_15 = fontScale(K_FONT_SIZE_NON_15);
export const K_FONT_SIZE_16 = fontScale(K_FONT_SIZE_NON_16);
export const K_FONT_SIZE_17 = fontScale(K_FONT_SIZE_NON_17);
export const K_FONT_SIZE_18 = fontScale(K_FONT_SIZE_NON_18);
export const K_FONT_SIZE_19 = fontScale(K_FONT_SIZE_NON_19);
export const K_FONT_SIZE_20 = fontScale(K_FONT_SIZE_NON_20);
export const K_FONT_SIZE_21 = fontScale(K_FONT_SIZE_NON_21);
export const K_FONT_SIZE_22 = fontScale(K_FONT_SIZE_NON_22);
export const K_FONT_SIZE_23 = fontScale(K_FONT_SIZE_NON_23);
export const K_FONT_SIZE_24 = fontScale(K_FONT_SIZE_NON_24);
export const K_FONT_SIZE_25 = fontScale(K_FONT_SIZE_NON_25);
export const K_FONT_SIZE_26 = fontScale(K_FONT_SIZE_NON_26);
export const K_FONT_SIZE_27 = fontScale(K_FONT_SIZE_NON_27);
export const K_FONT_SIZE_28 = fontScale(K_FONT_SIZE_NON_28);
export const K_FONT_SIZE_29 = fontScale(K_FONT_SIZE_NON_29);
export const K_FONT_SIZE_30 = fontScale(K_FONT_SIZE_NON_30);
export const K_FONT_SIZE_31 = fontScale(K_FONT_SIZE_NON_31);
export const K_FONT_SIZE_32 = fontScale(K_FONT_SIZE_NON_32);
export const K_FONT_SIZE_33 = fontScale(K_FONT_SIZE_NON_33);
export const K_FONT_SIZE_34 = fontScale(K_FONT_SIZE_NON_34);
export const K_FONT_SIZE_35 = fontScale(K_FONT_SIZE_NON_35);
export const K_FONT_SIZE_36 = fontScale(K_FONT_SIZE_NON_36);
export const K_FONT_SIZE_38 = fontScale(K_FONT_SIZE_NON_38);
export const K_FONT_SIZE_39 = fontScale(K_FONT_SIZE_NON_39);
export const K_FONT_SIZE_40 = fontScale(K_FONT_SIZE_NON_40);
export const K_FONT_SIZE_48 = fontScale(K_FONT_SIZE_NON_48);

const Styles = StyleSheet.create({
  boxShadown: {
    backgroundColor: 'white',
    shadowColor: '#0000001A', //fix default do import loop cycle
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: Platform.OS === 'ios' ? 0 : 7,
  },
});

export const K_ALERT_MAX_WIDTH = 343;
export const K_ALERT_MIN_HEIGHT = 190;
export const K_ALERT_WIDTH =
  K_SCREEN_WIDTH - K_SIZE_32 > K_ALERT_MAX_WIDTH ? K_ALERT_MAX_WIDTH : K_SCREEN_WIDTH - K_SIZE_32;

export const K_QR_SCAN_SIZE = sizeScale(260);
export const K_QR_SCAN_X = (K_SCREEN_WIDTH - K_QR_SCAN_SIZE) / 2;
export const K_QR_SCAN_Y = (K_SCREEN_HEIGHT - K_QR_SCAN_SIZE) / 2 - 88;
export const K_QR_SCAN_Y_SOTP = (K_SCREEN_HEIGHT - K_QR_SCAN_SIZE) / 2 - K_SIZE_SCALE_24;

export const K_TOAST_DURATION = 3000;
export const K_WIDTH_CARD = 311;
export const K_WIDTH_DRAWER = 270;

export const K_HEIGHT_ACCOUNT_CARD = 152;
export const K_HEIGHT_ACCOUNT_CARD_DETAIL = 167;
export const K_HEIGHT_CAMPAIGN = 120;

export const BASE_THEME = {
  borderRadiusBox: fontScale(12),
  ...Styles,
};

// general bank information
export const HOT_LINE = {
  toString() {
    return translate('text:hotline_number'); //'1900 5555 92';
  },
};
export const COUNT_TIME = 120;
export const K_TIME_SKELETON = 1500;

export const checkThreeConsecutive = (val: string) => {
  for (let i = 0; i <= val.length - 3; i++) {
    const s1 = val.charCodeAt(i);
    const s2 = val.charCodeAt(i + 1);
    const s3 = val.charCodeAt(i + 2);
    if (Math.abs(s1 - s2) === 1 && s1 - s2 === s2 - s3) {
      return true;
    }
  }
  return false;
};
export const iconsBiometric: any = {
  FaceID: 'ICON_FACE_ID',
  TouchID: 'IC_FINGER_PRINT_OUTLINE_BLACK',
  Fingerprint: 'IC_FINGER_PRINT_OUTLINE_BLACK',
  FACE: 'ICON_FACE_ID',
  IRIS: '',
};

export const imgBiometric: any = {
  FaceID: 'IMG_SERCURITY_FACEID',
  TouchID: 'IMG_SERCURITY_FINGERPRINT',
  Fingerprint: 'IMG_SERCURITY_FINGERPRINT',
  FACE: 'IMG_SERCURITY_FACEID',
  IRIS: '',
};

export const FORMART_DATE_TIME = 'HH:mm DD-MM-YYYY';

export const FORMART_DATE_TIME_APP = 'HH:mm DD/MM/YYYY';

export const FORMART_DATE = 'DD/MM/YYYY';

export const renderMaskPhone = (number: string) => {
  return `${number.substring(0, 3)}****${number.slice(-3)}`;
};

export const formatMoney = (num: number | string | undefined | null) => {
  if (!num) {
    return 0;
  }

  if (typeof num === 'string') {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  if (typeof num === 'number') {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return '';
};
export const isNegative = (num: number) => {
  if (Math.sign(num) === -1) {
    return true;
  }

  return false;
};
export type TypeErrBiometric =
  | 'not_setup'
  | 'lock_android'
  | 'lock_ios'
  | 'user_cancel'
  | 'not_permission';

export const TOUCH_FACEID = 'Touch/Face ID';

// the
export const listTypeIdCreditMappingHome = [
  {
    type: 1,
    typeName: 'Cashback Platinum',
    listIdMapping: ['465', '466'],
    img: 'https://d1mxhgkit2xc38.cloudfront.net/card/casback_platinum.png', // co
    img_detail: 'https://d1mxhgkit2xc38.cloudfront.net/card/casback_platium_3x.png', // co
  },
  {
    type: 2,
    typeName: 'Cashback Standard',
    listIdMapping: ['468', '469'],
    img: 'https://d1mxhgkit2xc38.cloudfront.net/card/cashback_standard.png', //co
    img_detail: 'https://d1mxhgkit2xc38.cloudfront.net/card/cashback_standard_3x.png', // co
  },
  {
    type: 9,
    typeName: 'Mastercard Platinum',
    listIdMapping: ['451', '401', '402', '403', '404', '405', '410', '406'],
    img: 'https://d1mxhgkit2xc38.cloudfront.net/card/mastercard_platinum.png', // co
    img_detail: 'https://d1mxhgkit2xc38.cloudfront.net/card/mastercard_platinum_3x.png', // co
  },
  {
    type: 3,
    typeName: 'Mastercard Classic',
    listIdMapping: ['385', '386', '388', '389', '391', '408', '426', '447', '448', '390'],
    img: 'https://d1mxhgkit2xc38.cloudfront.net/card/mastercard_classic.png', // co
    img_detail: 'https://d1mxhgkit2xc38.cloudfront.net/card/mastercard_classic_3x.png', // co
  },
  {
    type: 4,
    typeName: 'Mastercard Gold',
    listIdMapping: ['394', '395', '396', '397', '398', '409', '449', '399'],
    img: 'https://d1mxhgkit2xc38.cloudfront.net/card/Mastercard Gold.png', // co
    img_detail: 'https://d1mxhgkit2xc38.cloudfront.net/card/mastercard_gold_3x.png', // co
  },
  {
    type: 5,
    typeName: 'Shopping Platinum',
    listIdMapping: ['472', '473'],
    img: 'https://d1mxhgkit2xc38.cloudfront.net/card/shopping_platinum.png', // co
    img_detail: 'https://d1mxhgkit2xc38.cloudfront.net/card/shopping_platinum_3x.png', // co
  },
  {
    type: 6,
    typeName: 'Shopping Standard',
    listIdMapping: ['475', '476'],
    img: 'https://d1mxhgkit2xc38.cloudfront.net/card/shopping_standard.png', // co
    img_detail: 'https://d1mxhgkit2xc38.cloudfront.net/card/shopping_standard_3x.png', // co
  },
  {
    type: 7,
    typeName: 'Travel Platinum',
    listIdMapping: ['482', '483'],
    img: 'https://d1mxhgkit2xc38.cloudfront.net/card/travel_platinum.png', // co
    img_detail: 'https://d1mxhgkit2xc38.cloudfront.net/card/travel_platium_3x.png', // co
  },
  {
    type: 8,
    typeName: 'Travel World',
    listIdMapping: ['458'],
    img: 'https://d1mxhgkit2xc38.cloudfront.net/card/travel_platinum.png', //  có
    img_detail: 'https://d1mxhgkit2xc38.cloudfront.net/card/travel_platium_3x.png', // co
  },
];

export const listTypeIdDebitMappingHome = [
  {
    type: 1,
    typeName: 'PVcomBank Napas',
    listIdMapping: [
      '441',
      '440',
      '431',
      '442',
      '461',
      '490',
      '491',
      '432',
      '434',
      '435',
      '436',
      '437',
      '438',
      '439',
      '486',
    ],
    img: 'https://d1mxhgkit2xc38.cloudfront.net/card/debit_card.png', // co
    img_detail: 'https://d1mxhgkit2xc38.cloudfront.net/card/debit_card_3x.png', // co
  },
  {
    type: 1,
    typeName: 'PVcomBank Napas KHUT',
    listIdMapping: ['462'],
    img: 'https://d1mxhgkit2xc38.cloudfront.net/card/debit_card_KHUT.png', // co
    img_detail: 'https://d1mxhgkit2xc38.cloudfront.net/card/debit_card_KHUT_3x.png', // co
  },
  {
    type: 1,
    typeName: 'PVcomBank Mastercard',
    listIdMapping: ['488'],
    img: 'https://d1mxhgkit2xc38.cloudfront.net/card/debit_mastercard.png', // co
    img_detail: 'https://d1mxhgkit2xc38.cloudfront.net/card/debit_mastercard_3x.png', // co
  },
];
export const listTypeIdPrepaidMappingHome = [
  {
    type: 1,
    typeName: 'Prepaid',
    listIdMapping: ['601'],
    img: 'https://d1mxhgkit2xc38.cloudfront.net/card/one_link_card.png', // co
    img_detail: 'https://d1mxhgkit2xc38.cloudfront.net/card/card_one_link_3x.png', // co
  },
];

// loai tk
// Loại tài khoản
// 10: Tài khoản thanh toán
// 30: Tài khoản tiết kiệm lãi trả sau
// 40: Tài khoản tiết kiệm lãi trả trước
// 50: Khế ước nhận nợ

// tài khoản thanh toán
export const listAccountPaymentMappingHome = [
  { id: '1000' },
  { id: '1001' },
  { id: '1002' },
  { id: '1003' },
  { id: '1004' },
  { id: '1019' },
  { id: '1020' },
  { id: '1021' },
  { id: '1022' },
  { id: '1023' },
  { id: '1027' },
  { id: '1028' },
  { id: '1029' },
  { id: '1105' },
  { id: '1999' },
  { id: '4011' },
  { id: '4042' },
  { id: '10' }, // loai tk thanh toan o api v1.0
];

// tài khoản thanh toán
export const listTypeCodePaymentAccount = [
  '1000',
  '1001',
  '1002',
  '1003',
  '1004',
  '1019',
  '1020',
  '1021',
  '1022',
  '1023',
  '1027',
  '1028',
  '1029',
  '1105',
  '1999',
  '4011',
  '4042',
];

//Tài khoản thấu chi
export const listAccountOverdraftMappingHome = [
  { id: '1006' },
  { id: '1007' },
  { id: '1008' },
  { id: '1009' },
  { id: '1010' },
  { id: '1011' },
  { id: '1012' },
  { id: '1013' },
  { id: '1015' },
  { id: '1017' },
];

export const overdraftPayment = listAccountOverdraftMappingHome.concat(
  listAccountPaymentMappingHome
);

//tài khoản tiết kiệm
export const listAccountSavingMappingHome = [
  { id: '4061' },
  { id: '6000' },
  { id: '6001' },
  { id: '6010' },
  { id: '6599' },
  { id: '6600' },
  { id: '6601' },
  { id: '6602' },
  { id: '6603' },
  { id: '6604' },
  { id: '6605' },
  { id: '6606' },
  { id: '6607' },
  { id: '6608' },
  { id: '6609' },
  { id: '6610' },
  { id: '6611' },
  { id: '6612' },
  { id: '6613' },
  { id: '6614' },
  { id: '6615' },
  { id: '6616' },
  { id: '6620' },
  { id: '6622' },
  { id: '6623' },
  { id: '6624' },
  { id: '6625' },
  { id: '6626' },
  { id: '6627' },
  { id: '21002' },
  { id: '21003' },
  { id: '21004' },
  { id: '21011' },
  { id: '30' },
  { id: '40' },
];

//Tài khoản vay
export const listAccountLoanMappingHome = [
  { id: '3000' },
  { id: '3999' },
  { id: '4021' },
  { id: '21050' },
  { id: '21051' },
  { id: '21052' },
  { id: '21053' },
  { id: '21054' },
  { id: '21056' },
  { id: '21067' },
  { id: '21072' },
  { id: '21096' },
  { id: '28001' },
  { id: '28005' },
  { id: '28025' },
  { id: '28027' },
  { id: '28028' },
  { id: '28030' },
  { id: '28031' },
  { id: '28032' },
  { id: '28033' },
  { id: '28034' },
  { id: '28035' },
  { id: '28037' },
  { id: '28039' },
];

export const PVCB_NAPAS = '970412';
export const PVCB_BANK_ID = '99999';

export function toNonAccentVietnamese(str: string) {
  if (!str) {
    return '';
  }
  str = str.replace(/A|Ả|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, 'A');
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/g, 'E');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/I|Í|Ì|Ĩ|Ị/g, 'I');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, 'O');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, 'U');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, 'Y');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}

export const allListTypeAccount = [
  {
    loan: listAccountLoanMappingHome,
    saving: listAccountSavingMappingHome,
    overdraft: listAccountOverdraftMappingHome,
    payment: listAccountPaymentMappingHome,
  },
];

export const mappingStatusCard = {
  '0': 'text:actived',
  '25': 'text:lock_old_card_after_PHL',
  '21': 'text:permanent_key_card',
  '20': 'text:temporarily_locked_card',
  '19': 'text:card_temporarily_locked_suspicion_risk',
  '15': 'text:card_temporarily_locked_overdue_debt',
  '14': 'text:card_not_changed_PIN',
  '12': 'text:lock_card_due_to_not_activated',
  '11': 'text:card_temporarily_locked_overdue_debt',
  '6': 'text:theft/lost_card',
  '5': 'text:card_expiration',
  '3': 'text:temporarily_locked_card',
  '2': 'text:permanent_key_card',
  '1': 'text:card_not_activated',
};

export const hideCurentcy = '******';

export const K_MAX_ITEM_DISPLAY = 4;

export const listValueTopup = [
  {
    amountDenomination: '10000',
    amount: '10000',
  },
  {
    amountDenomination: '10000',
    amount: '10000',
  },
  {
    amountDenomination: '10000',
    amount: '10000',
  },
  {
    amountDenomination: '10000',
    amount: '10000',
  },
  {
    amountDenomination: '10000',
    amount: '10000',
  },
  {
    amountDenomination: '10000',
    amount: '10000',
  },
  {
    amountDenomination: '10000',
    amount: '10000',
  },
];

export const DES_TOPUP = 'Mobile Top-up';

export const LIMIT_MAX_TRANSFER = 499999999; //500tr
export const LIMIT_MIN_TRANSFER = 10000; //10.0000

export const K_ERROR_CODE_RESPONE_BLACKLIST = [
  'GW-401',
  'US_011',
  'US_012',
  'GW999',
  'GW-414',
  '1002',
  '4042',
  '4010',
  'E96',
  '405',
  '401',
  '22',
];

export const CURENCY_VND_FORMAT = '₫';
export const CURENCY_VND = 'VND';
export const CURENCY_USD = 'USD';
export const CURENCY_USD_FORMAT = '$';

export const K_MAIL_PVCB = 'pvb@pvcombank.com.vn';

export const TERM_CONDITION_PDF_URL =
  'https://www.pvcombank.com.vn/static/product/2021/MB05_DKDK%20mo%20va%20su%20dung%20dich%20vu%20TKTT%20PVcomBank.pdf';

export const LIST_SERVICE_BILL = [
  {
    icon: 'IC_ELECTRIC_TWO_TONE',
    label: 'text:pay_electric',
    type: 'electricity',
  },
  {
    icon: 'IC_WATER_TWO_TONE',
    label: 'text:pay_water',
    type: 'water',
  },
  // {
  //   icon: 'IC_PHONE_TWO_TONE',
  //   label: 'text:mobile',
  //   type: 'mobile',
  // },
  // {
  //   icon: 'IC_WIFI_TWO_TONE',
  //   label: 'text:internet',
  //   type: 'internet',
  // },
];

export const accountTypeSaving = {
  30: 'text:tra_lai_cuoi_ky',
  40: 'text:tra_lai_dau_ky',
};

export const SavingTypeName = {
  TraLaiCuoiKy: 30,
  TraLaiDauKy: 40,
};
export const statusAccountMapping = {
  A: 'Active',
  B: 'Block',
  I: 'Inactive',
  P: 'Pledge',
  C: 'Close',
};
export const CUMULATIVE_SAVINGS_PRODUCT_CODE = 'ACCUMULTED.INDI';
export const TERM_SAVING =
  'https://d1mxhgkit2xc38.cloudfront.net/term-and-condition/term_saving.pdf';

export const timeLockSOTP = 18e5; // 30m

export const minDepositSaving = 10000; // 30m

export const BCA_URL = 'https://canhsatquanlyhanhchinh.gov.vn/';

export const FormOfMaturity = {
  ORI: 'text:saving_title_1',
  NONE: 'text:saving_title_3',
  ALL: 'text:saving_title_2',
};

export const AccountTypeMapping = {
  CurentAccount: 'CA', // tài khoản thanh toán
  TermDepositAccount: 'TD', // tài khoản tiết kiệm trả trước
  OrverDraftAccount: 'OD', // tài khoản thấu chi
  LoanAccount: 'LN', // tài khoản vay
  Card: 'card', // thẻ
};

export const labelTypeSavingMapping = {
  '1': 'text:savings_pay_interest_at_the_beginning_of_the_period',
  '2': 'text:cumulative_savings',
  '3': 'text:fixed_savings',
  other: '',
};

export const iconTypeSavingMapping = {
  '1': 'IC_HAND_SAVING_TWO_TONE',
  '2': 'IC_SAVING_TWO_TONE_FOR_SAVING',
  '3': 'IC_FLOWER_SAVING_TWO_TONE',
  other: 'IC_SAVING_TWO_TONE_FOR_SAVING',
};

export const mappingTypeSaving = [
  {
    label: 'text:cumulative_savings',
    type: '2',
    items: ['ACCUMULTED.INDI'],
  },
  {
    label: 'text:savings_pay_interest_at_the_beginning_of_the_period', // ddaauf kyf
    type: '1',
    items: ['DISCOUNTED.INT.PUBLIC', 'DISCOUNTED.INT.TERM.DEPOSIT'],
  },
  {
    label: 'text:fixed_savings',
    type: '3',
    items: [
      'IB.BAND.INDIVIDUAL',
      'IB.PUBLIC.MAT',
      'IB.PUBLIC.QUARTERLY',
      'IB.PUBLIC.MONTHLY',
      'B.PUBLIC.WEEK',
    ],
  },
];

export const statusMappingSaving = [
  {
    id: 'ACTIVE', // dang hoạt động(cho tk tích luỹ/trung niên)
    isShow: true,
  },
  {
    id: 'CURRENT', // dang hoạt động(cho tk trả lãi trc/trả lãi sau)
    isShow: true,
  },
  {
    id: 'EXPIRED', // đến hạn gốc lãi đang treo chờ khách hàng rút
    isShow: true,
  },
  {
    id: 'CLOSED', // đã đóng đã tất toán(cho tk/ tích luỹ trung niên)
    isShow: false,
  },
  {
    id: 'LIQ', // đã tất toán(cho tk trả lãi trc)
    isShow: false,
  },
  {
    id: 'PENDING CLOSURE/ CLOSE', // đã tất toán(cho tk trả lãi sau)
    isShow: false,
  },
  {
    id: 'MOR', // tài khoản gắn với khoản vay
    isShow: true,
  },
];

export const codePriorityCustomer = [
  // dùng để phần biệt tài khoản ưu tiên
  '2100',
  '2101',
  '2103',
  '2104',
  '2201',
  '2202',
  '2203',
  '2114',
  '2115',
  '2116',
  '2301',
  '2302',
  '2303',
  '2304',
  '2305',
  '2306',
  '2307',
  '2110',
  '2111',
  '2112',
  '2113',
];

const K_ERROR_CODE_INFO_MFA: string[] = [
  '10095', // sai mk
  '10088', // khoa
  '11000', // sai tk mk
  '11604', // khoa
  '11605', // khoa do ko hoat dong
  '11606', // tk khoa
  '10135', // mk het han
  '99039', // force change pass keycloak,
  '99047', // migrate nhap sai tk
  // MFA
  '99032', // trang thai sotp da kich hoat
  '99031', // trang thai sotp da kich hoat
  '99033',
  '99030', // sai OTP
  // change pass
  '10147', // sai mk cu
  '17005', // otp qua so lan,
  '10552', // sai otp,
  '10145', // trung mk
];

export const PENDING_ERROR_CODE = ['417', '418', '991', '992', '996', '998', '68'];

export const K_ERROR_CODE_RESPONE_BLACKLIST_HTC = [
  '404',
  '029',
  '10517',
  '10518',
  '10519',
  '12504',
  '12501',
  '12505',
  '12506',
  '99050',
  '405',
  '10194',
  '99004',
  '03',
  '12062',
  '410',
  '99001',
  '10551',
]
  .concat(K_ERROR_CODE_INFO_MFA)
  .concat(PENDING_ERROR_CODE);

export const FORCE_NOT_SHOW_ERROR = [20921];
