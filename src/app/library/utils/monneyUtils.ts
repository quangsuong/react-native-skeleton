import { formatMoney } from '@common';

export const currency_const = {
  vnd: '₫',
};

function getText(amount: number, currency: string = currency_const.vnd) {
  return formatMoney(amount) + ' ' + currency;
}

const moneyUtils = {
  getText,
};

export default moneyUtils;
