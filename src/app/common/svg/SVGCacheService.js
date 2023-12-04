// SVGCacheService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const ASYNC_STORAGE_KEY = 'svg-cache';

let data = null;

const loadData = async () => {
  const defaultData = {
    svgs: {},
  };

  const result = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
  data = result ? await JSON.parse(result) : defaultData;
  data = { ...defaultData, ...data };
};

export default class SVGCacheService {
  static async setSvg(uri, svg) {
    const oldData = data || {};

    const newData = {
      ...oldData,
      svgs: {
        ...oldData.svgs,
        [uri]: svg,
      },
    };

    data = newData;

    await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(newData));
  }

  static async getSvg(uri) {
    if (data === null) await loadData();
    return data.svgs[uri];
  }
}
