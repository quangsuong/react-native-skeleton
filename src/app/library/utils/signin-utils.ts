import { StorageSecure } from '@utils/storage-secure';
import { StorageSensitiveType } from './storage-secure/storage-type';

function savePin(pin: number) {
  StorageSecure.saveItem('SIGNIN_PIN', pin + '');
}

async function checkPin(pin: number) {
  try {
    const savedPin = await StorageSecure.getItem('SIGNIN_PIN');
    return +savedPin === pin;
  } catch (error) {}
  return false;
}

async function copyPin(key: StorageSensitiveType) {
  try {
    const pin = await StorageSecure.getItem('SIGNIN_PIN');
    StorageSecure.saveItem(key, pin);
  } catch (error) {}
}

async function getLoginPin() {
  try {
    return await StorageSecure.getItem('SIGNIN_PIN');
  } catch (error) {}
}

async function isSetPIN() {
  try {
    const savedPin = await StorageSecure.getItem('SIGNIN_PIN');
    return !!savedPin;
  } catch (error) {}
  return false;
}

function cleanData() {
  try {
    StorageSecure.deleteItem('SIGNIN_PIN');
  } catch (error) {}
}

const signinUtils = {
  savePin,
  checkPin,
  isSetPIN,
  copyPin,
  cleanData,
  getLoginPin,
};

export default signinUtils;
