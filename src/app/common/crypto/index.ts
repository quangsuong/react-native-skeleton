import SHA1 from 'crypto-js/sha1';
import { NativeModules } from 'react-native';
const { generateOCRA } = NativeModules.OCRAModule;

export interface ORCAParams {
  key: string;
  counter?: string;
  question: string;
  password?: string;
  sessionInformation?: string;
  timeStamp?: string;
}

export const saltHashID = 'jQOhAZdJbOLz6BPtBm1R';

const PVcrypto = {
  getSessionSMOTP: async (code: string) => {
    const session = await NativeModules.Md5Hash.getSession(code);
    return session;
  },
  getSecretSMOTP: async () => {
    const secret = await NativeModules.Md5Hash.getSecret();
    return secret;
  },
  genORCA: (params: ORCAParams) => {
    const { key, counter, question, password, sessionInformation, timeStamp } = params;
    return generateOCRA(
      'OCRA-1:HOTP-SHA1-6:QN08',
      key,
      counter,
      question,
      password,
      sessionInformation,
      timeStamp
    );
  },
  hashIdentityNumber: function (identityNumber: string) {
    const dataEncrypt = identityNumber + saltHashID;
    try {
      return SHA1(dataEncrypt).toString().toUpperCase();
    } catch (error) {
      return '';
    }
  },
};

export default PVcrypto;
