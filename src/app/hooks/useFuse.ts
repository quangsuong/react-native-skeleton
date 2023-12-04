import Fuse from 'fuse.js';
import { debounce, groupBy } from 'lodash';
import { useCallback, useMemo, useState } from 'react';

interface ItemData {
  name: string;
  id: string;
  title?: string;
}
interface Data {
  title: string;
  data: ItemData[];
}
export const useFuse = (list: Data[], options: Fuse.IFuseOptions<Data>, sectionList: boolean) => {
  const { limit, ...fuseOptions } = options;

  const [query, setQuery] = useState('');
  const flattenSearch = useMemo(() => {
    const result = [] as ItemData[];
    if (list?.length && sectionList) {
      list?.map((item) => item?.data.map((e) => result.push({ ...e, title: item?.title })));
    }
    return sectionList ? result : list;
  }, [list, sectionList]);

  const fuse = useMemo(() => new Fuse(flattenSearch, fuseOptions), [flattenSearch, fuseOptions]);

  const groupSearch = useCallback((data) => {
    const result = [];
    for (const [key, value] of Object.entries(data)) {
      result.push({
        title: key,
        data: value,
      });
    }
    return result;
  }, []);

  // if query is empty and `matchAllOnEmptyQuery` is `true` then return all list
  // NOTE: we remap the results to match the return structure of `fuse.search()`
  const hits = useMemo(() => {
    const searchList = fuse.search(query.trim(), { limit }).map((i) => i?.item);
    const search = groupBy(searchList, (i) => i?.title);
    return !query ? list : sectionList ? groupSearch(search) : searchList;
  }, [fuse, query]);

  const onSearch = useCallback(
    debounce((nextValue) => {
      setQuery(nextValue);
    }, 750),
    []
  );

  const onClean = useCallback(() => {
    setQuery('');
  }, []);

  const onClose = useCallback(() => {
    setTimeout(() => {
      onClean();
    }, 1000);
  }, []);
  return {
    hits,
    query,
    onSearch,
    onClean,
    onClose,
  };
};
