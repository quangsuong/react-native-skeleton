import { isIos } from '@common';
import ReactNativeBiometrics from 'react-native-biometrics';
import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import { StorageBiometricsType, StorageSensitiveType, StorageTypeAll } from './storage-type';

if (isIos) {
  RNSecureKeyStore.setResetOnAppUninstallTo(false);
}

const rnBiometrics = new ReactNativeBiometrics();

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
const saveItemWithBiometrics = async (key: StorageBiometricsType, value: any) => {
  const passPrompt = await promptBiometrics();
  if (passPrompt) {
    return RNSecureKeyStore.set(key, value, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  }
  return Promise.reject('');
};

/**
 * Loads a value from storage.
 *
 * @param key The key to fetch.
 */

const getItemWithBiometrics = async (key: StorageBiometricsType) => {
  const passPrompt = await promptBiometrics();
  if (passPrompt) {
    return RNSecureKeyStore.get(key);
  }
  return Promise.reject('');
};

const promptBiometrics = async () => {
  return new Promise<boolean>(async (resolve, reject) => {
    const { available } = await isSensorAvailable();
    if (available) {
      rnBiometrics
        .simplePrompt({ promptMessage: 'Xác thực sinh trắc học' })
        .then(({ success }) => {
          if (success) {
            resolve(true);
          } else {
            reject({ available: false });
          }
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject({ available: false });
    }
  });
};

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
const saveItem = async (key: StorageSensitiveType, value: any) => {
  return RNSecureKeyStore.set(key, value, {
    accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
};

/**
 * Loads a value from storage.
 *
 * @param key The key to fetch.
 */

const getItem = async (key: StorageTypeAll) => {
  return RNSecureKeyStore.get(key);
};

const getItems = async (keys: StorageTypeAll[]) => {
  return await Promise.all(keys.map((key) => RNSecureKeyStore.get(key)));
};

/**
 * delete a value from storage.
 *
 * @param key The key to fetch.
 */

const deleteItem = async (key: StorageTypeAll) => {
  return RNSecureKeyStore.remove(key);
};

const deleteItems = async (keys: StorageTypeAll[]) => {
  const ListPromise = keys.map((key) => RNSecureKeyStore.remove(key));
  return Promise.all(ListPromise);
};

const isSensorAvailable = async () => {
  return rnBiometrics.isSensorAvailable();
};

export const StorageSecure = {
  isSensorAvailable,
  saveItemWithBiometrics,
  getItemWithBiometrics,
  deleteItem,
  saveItem,
  getItem,
  deleteItems,
  getItems,
};
