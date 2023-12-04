import CryptoJS from 'crypto-js';

const key = '9875cce6826dbc1fc9083c12c6d75642';
const keyutf = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Utf8.parse('053D0C386EE38077');

const cfg = {
  iv: iv,
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7,
};

/**
 * encrypt to aes string
 * @param data: json string
 * return encrypted string
 * */
const encryptAES = (data: string) => {
  const result = CryptoJS.AES.encrypt(data, keyutf, cfg);
  return result.toString();
};

const decryptAES = (encryptedStr: string) => {
  const plainText = CryptoJS.AES.decrypt(encryptedStr.replace(/%2b/g, '+'), keyutf, cfg);
  return plainText?.toString(CryptoJS.enc.Utf8);
};

export default {
  encryptAES,
  decryptAES,
};
