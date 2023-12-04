import { REGEX } from '@validate/constant';
import moment from 'moment';
import { CURENCY_VND, CURENCY_VND_FORMAT } from '../constant';

export const isNumber = (num: any): boolean => {
  return !isNaN(parseFloat(String(num)));
};
export const tryParseNumber = (num: any): any => {
  if (isNumber(num)) {
    return parseFloat(String(num));
  }
  return num;
};

export const roundMaxFixed = (num: number, decimals: number): number => {
  return Number(Math.round(Number(String(num + 'e' + decimals))) + 'e-' + decimals);
};

export const formatNumber = (num: number | string, comma = ',') => {
  if (typeof num !== 'number' && typeof num !== 'string') {
    return num;
  }
  return String(num).replace(/(\d)(?=(\d{3})+\b)/g, `$1${comma}`);
};

export function formatPhone(phoneNumber: string) {
  if (phoneNumber) {
    phoneNumber = phoneNumber.replaceAll(' ', '');
    if (phoneNumber.length != 10) {
      return phoneNumber;
    }
    const match = phoneNumber.replace(/^(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    return match;
  } else {
    return phoneNumber;
  }
}

export function formatUserId(userId: string) {
  if (userId) {
    const match = userId.slice(0, 3) + 'xxx' + userId.slice(-4);
    return match;
  } else {
    return userId;
  }
}

export function formatCurrency(
  currencyParam: string | Number,
  sperator = ',',
  typeCurency?: string
) {
  if (currencyParam != undefined && currencyParam != null) {
    let currency;
    if (typeof currencyParam == 'string' && currencyParam.indexOf(',') < 0) {
      currency = Number(currencyParam).toString(); // convert to string
    } else {
      currency = currencyParam.toString();
    }
    let characterFist = '';
    if (currency.indexOf('-') == 0) {
      characterFist = '-';
      currency = currency.slice(1);
    }
    currency = currency.replaceAll(',', '');
    const content = [];
    const chunkSize = 3;
    for (let i = currency.length; i > 0; i -= chunkSize) {
      const number1 = i - chunkSize < 0 ? 0 : i - chunkSize;
      const chunk = currency.slice(number1, i);
      content.push(chunk);
    }
    return (
      characterFist + content.reverse().join(sperator) + (typeCurency ? ' ' + typeCurency : '')
    );
  }
  return '';
}

export function formatNumberAcountBankVsCCCD(numberAcountBank: string | undefined) {
  // return numberAcountBank;
  if (numberAcountBank) {
    numberAcountBank = numberAcountBank.replaceAll(' ', '');
    const chunkSize = 4;
    const content = [];
    for (let i = 0; i < numberAcountBank?.length; i += chunkSize) {
      const chunk = numberAcountBank.slice(i, i + chunkSize);
      content.push(chunk);
    }
    return content.join(' ');
  } else {
    return numberAcountBank;
  }
}

export function validatePhoneNumber(number: string) {
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}

export function formatBigNumber(x: any) {
  if (Math.abs(x) < 1.0) {
    const e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + new Array(e).join('0') + x.toString().substring(2);
    }
  } else {
    let e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join('0');
    }
  }
  return x;
}

export function formatExpDateCard(date: any) {
  if (date) {
    return moment(date, 'YYYYMM').format('MM/YYYY');
  }
  return '';
}
export function formatIssueDateCard(date: any) {
  console.log('date', date);
  if (date) {
    return moment(date, 'DDMMYYYY').format('DD/MM/YYYY');
  }
  return '';
}

export function formatOpenDateAccount(date: any) {
  console.log('date', date);
  if (date) {
    return moment(date, 'YYYYMMDD').format('DD/MM/YYYY');
  }
  return '';
}

export function getCurrencyLabel(curentCode: string) {
  if (curentCode === CURENCY_VND) {
    return CURENCY_VND_FORMAT;
  }
  return curentCode ?? '';
}

export function formatAccountNo(param: string) {
  if (!param) {
    return '';
  }
  const account = REGEX.REGEX_CHECK_ONLY_LETTER.test(param.toString())
    ? param
    : formatNumberAcountBankVsCCCD(param.toString());
  return account;
}

export function formatCreditAccountName(param: string) {
  if (!param) {
    return '';
  }
  const arr = param.split(' ');
  if (arr.length === 1 || arr.length === 2) {
    return param;
  }
  const username = `${arr?.[arr.length - 2]} ${arr?.[arr.length - 1]}`;
  return username;
}

export function maskCardNumber(param: string) {
  if (!param) {
    return '';
  }
  return param.slice(0, 6) + '**********';
}
