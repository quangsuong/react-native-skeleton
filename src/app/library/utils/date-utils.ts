import { isEmpty } from 'lodash';

/**
 * format date string from 'yyyy-mm-dd' to 'dd/mm/yyyy'
 * @param orgString format
 * @returns formatted string || original string
 */
const formatDateFromString = (orgString: string | undefined) => {
  if (orgString && !isEmpty(orgString)) {
    const tmp = orgString.split('-');
    return tmp.reverse().join('/');
  }
  return orgString || '';
};

const DateUtils = {
  formatDateFromString,
};

export default DateUtils;
