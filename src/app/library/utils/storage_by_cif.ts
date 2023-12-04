import Storage from './storage';
import { StorageSecure as _StorageSecure } from './storage-secure';
import { StorageTypeAll } from './storage-secure/storage-type';

export const StorageSecureByCif = {
  getKey: (key: StorageTypeAll) => {
    return key;
    const cif = window.cif || window.user_cif;
    if (!cif) return '';
    const keyByCif = cif + '_' + key;
    return keyByCif;
  },
  getItem: (key: StorageTypeAll) => {
    // @ts-ignore
    return _StorageSecure.getItem(StorageSecureByCif.getKey(key));
  },
  saveItem: (key: StorageTypeAll, value: string) => {
    // @ts-ignore
    return _StorageSecure.saveItem(StorageSecureByCif.getKey(key), value);
  },
  deleteItem: (key: StorageTypeAll) => {
    // @ts-ignore
    return _StorageSecure.deleteItem(StorageSecureByCif.getKey(key));
  },
};

export const StorageByCif = {
  getItem: (key: StorageTypeAll) => {
    // @ts-ignore
    return Storage.loadString(StorageSecureByCif.getKey(key));
  },
  saveItem: (key: StorageTypeAll, value: string) => {
    // @ts-ignore
    return Storage.saveString(StorageSecureByCif.getKey(key), value);
  },
  deleteItem: (key: StorageTypeAll) => {
    // @ts-ignore
    return Storage.remove(StorageSecureByCif.getKey(key));
  },
};
