import { SavingType } from '@model/app';
import moment from 'moment';

const configTime = {
  M: 30,
  W: 7,
  Y: 365,
};

const timeUtils = {
  getPeriodTime(timeUnit: string) {
    if (!timeUnit || timeUnit?.length < 2) {
      return ['', ''];
    }
    const _timeUnit = timeUnit.slice(-1);
    const _time = timeUnit.substring(0, timeUnit?.length - 1);
    return [_time, _timeUnit];
  },
  formatTime(timeUnit: string, t: any) {
    const [_time, _timeUnit] = timeUtils.getPeriodTime(timeUnit);
    return _time.lessThanTen() + ' ' + t(`text:${_timeUnit.toLowerCase()}`);
  },
  calInterest(amount: number, rate: number, period: string) {
    const [_time, _timeUnit] = timeUtils.getPeriodTime(period);
    const days = _time * configTime[_timeUnit];
    const interest = (amount * rate * days) / 36500;
    return Math.round(interest);
  },
  getTempInterest(item: SavingType, amount: number) {
    if (!item || !item?.interestRate || !item?.term || !amount) {
      return '0';
    }
    const value = item?.term?.slice(0, -1);
    const periodTime = item?.term?.charAt(item?.term.length - 1);
    const earningDate = moment().add(value, periodTime === 'M' ? 'months' : 'weeks');
    const diffDays = +earningDate.diff(moment(), 'days');
    const tempAmount = Math.round((amount / 100) * +item?.interestRate) * (diffDays / 365);
    return tempAmount;
  },
};

export default timeUtils;
