import { BugsnagUtil, timeLockSOTP } from '@common';
import PVcrypto, { ORCAParams } from 'src/app/common/crypto';
import signinUtils from './signin-utils';
import { StorageByCif, StorageSecureByCif } from './storage_by_cif';

function savePin(pin: number) {
  StorageByCif.saveItem('SOTP_PIN', pin + '');
}

async function checkPin(pin: number) {
  try {
    const savedPin = await StorageByCif.getItem('SOTP_PIN');
    return +savedPin === pin;
  } catch (error) {
    return false;
  }
}

function saveBiometric(isActive?: '0' | '1' = '1') {
  StorageSecureByCif.saveItem('SOTP_BIOMETRIC', isActive);
}

async function isSetBiometric() {
  try {
    const savedBiometric = await StorageSecureByCif.getItem('SOTP_BIOMETRIC');
    return savedBiometric === '1';
  } catch (error) {}
}

async function isActiveSOTP() {
  try {
    const savedPin = await StorageByCif.getItem('SOTP_PIN');
    return !!savedPin;
  } catch (error) {
    return false;
  }
}

async function isRegistered() {
  try {
    const secret = await StorageSecureByCif.getItem('K_SECRET_SOTP');
    return !!secret;
  } catch (error) {
    return false;
  }
}

async function copySignInPin() {
  try {
    const loginPIN = await signinUtils.getLoginPin();
    StorageByCif.saveItem('SOTP_PIN', loginPIN);

    // @ts-ignore
  } catch (error) {}
}

function cleanData() {
  StorageByCif.deleteItem('SOTP_PIN');
  StorageSecureByCif.deleteItem('SOTP_BIOMETRIC');
  StorageByCif.deleteItem('K_TIME_OPEN_SOTP');
  // StorageSecure.deleteItem('K_SECRET_SOTP');
}

function saveSecret(secret: string) {
  return StorageSecureByCif.saveItem('K_SECRET_SOTP', secret);
}

async function getSmartOtp() {
  const otp = await StorageSecureByCif.getItem('K_SECRET_SOTP');
  // if (otp) {
  //   MixPanelUtil.track('GET_SECRET_SOTP', { status: 'get smotp success', OS: Platform.OS });
  // } else {
  //   MixPanelUtil.track('GET_SECRET_SOTP', { status: 'get smotp null', OS: Platform.OS });
  // }
  return otp;
}

const generateOCRA = async (transId: string) => {
  const otp = await sotpUtils.getSmartOtp();
  const params: ORCAParams = {
    key: otp,
    question: transId,
  };
  return PVcrypto.genORCA(params)
    .then((otp: string) => {
      return otp;
    })
    .catch((error: any) => {
      BugsnagUtil.notify(error);
      throw error;
    });
};

const checkLockSOTP = async () => {
  try {
    const timeToOpenLock = await StorageByCif.getItem('K_TIME_OPEN_SOTP');

    console.log('====================================');
    console.log('timeToOpenLock', timeToOpenLock);
    console.log('====================================');

    const remainTimeLock = timeToOpenLock - new Date().getTime();

    return remainTimeLock < 0 ? 0 : Math.ceil(remainTimeLock / 6e4);
  } catch (error) {
    return 0;
  }
};

const LockSOTP = () => {
  const timeToOpenLock = new Date().getTime() + timeLockSOTP;
  StorageByCif.saveItem('K_TIME_OPEN_SOTP', timeToOpenLock.toString());
};

const sotpUtils = {
  savePin,
  checkPin,
  isActiveSOTP,
  saveBiometric,
  isSetBiometric,
  copySignInPin,
  saveSecret,
  isRegistered,
  cleanData,
  getSmartOtp,
  generateOCRA,
  checkLockSOTP,
  LockSOTP,
  getSecretSMOTP: PVcrypto.getSecretSMOTP,
};

export default sotpUtils;
