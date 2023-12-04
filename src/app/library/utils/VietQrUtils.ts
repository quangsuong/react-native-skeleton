function parseVietQR(result = {}, qrString = '', prefix = '') {
  const ID = qrString.substring(0, 2);
  const length = +qrString.substring(2, 4);
  const lastIndex = 4 + length;
  const qrLength = qrString.length;
  const value = qrString.substring(4, lastIndex);
  if (!length || lastIndex > qrLength) {
    return false;
  }

  const key = prefix ? prefix + '.' + ID : ID;

  let canContinue = false;
  if (/38|62/.test(key)) {
    canContinue = parseVietQR(result, value, key);
  }
  if (qrLength > lastIndex) {
    parseVietQR(result, qrString.substring(lastIndex, qrLength), prefix);
  }

  // if (!canContinue)
  result[key] = value;
  return true;
}

const getBytes = (str: String) => {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
};

const crc16_ccitt = (s: String) => {
  let crc = 0xffff;
  const polynomial = 0x1021;
  const bytes = getBytes(s);
  bytes.forEach((b) => {
    let i;
    for (i = 0; i < 8; i++) {
      const bit = ((b >> (7 - i)) & 1) == 1;
      const c15 = ((crc >> 15) & 1) == 1;
      crc <<= 1;
      if (c15 !== bit) {
        crc ^= polynomial;
      }
    }
  });
  return (crc & 0xffff).toString(16);
};

const generateVietQRCode = ({ bankAccount, amount, message = '' }: IPayment) => {
  const bankId = '970412';
  const part12 = '00'
    .concat(bankId.length.toString().padStart(2, '0'))
    .concat(bankId)
    .concat('01')
    .concat(bankAccount.length.toString().padStart(2, '0'))
    .concat(bankAccount);
  const part11 = '0010A000000727'
    .concat('01')
    .concat(part12.length.toString().padStart(2, '0'))
    .concat(part12)
    .concat('0208QRIBFTTA');
  const part1 = '38'.concat(part11.length.toString().padStart(2, '0')).concat(part11);
  let part21 = '';
  if (amount) {
    part21 = '08'.concat((message || '').length.toString().padStart(2, '0')).concat(message || '');
  }
  let part2 = '5303704';
  if (amount) {
    part2 = part2.concat('54').concat(amount.length.toString().padStart(2, '0')).concat(amount);
  }
  part2 = part2.concat('5802VN');
  if (amount) {
    part2 = part2.concat('62').concat(part21.length.toString().padStart(2, '0')).concat(part21);
  }
  const final = '000201'
    .concat('0102')
    .concat(!amount ? '11' : '12')
    .concat(part1)
    .concat(part2)
    .concat('6304');
  const crc = crc16_ccitt(final).toUpperCase();
  const checkSum = '0'.repeat(4 - crc.length) + crc;
  return final + checkSum;
};

const VietQrUtils = {
  parseVietQR,
  generateVietQRCode,
};

/** QR Code defined
 *  Immutable QR for Account: 00020101021138570010A00000072701270006970403011200110123456780208QRIBFTTA53037045802VN6304F4E5
 *  Payload Format Indicator: ID: 00 ; Length: 02 ; Value 01
 *  Point of Initiation Method: ID: 01 ; Length: 02 ; Value 11 (Immutable QR)
 *  Consumer Account Information:
 *      ID: 38 ; Length: 57 ;
 *      Value: 0010A00000072701270006970403011300110123456780208QRIBFTTA;
 *      More Detail:
 *       ID: 00 ; Length: 10 ; Value  A000000727 (Default Value for NAPAS)
 *       ID: 01 ; Length: 27 ; Value  000697040301130011012345678
 *       More Detail:
 *        ID: 00 ; Length: 06 ; Value  970403 (Acquire ID/ BNB ID => Bank BIN code defined by National Bank)
 *        ID: 01 ; Length: 13 (max length: 19) ; Value  0011012345678 (Merchant ID/Consumer id => Account number/ Personal tax number/ industry's number... defined by Bank/ )
 *        ID: 02 ; Length: 08 ; Value: QRIBFTTA (Service Code for Transfer 24/7 for QR to accounts)
 *  Service code:
 *   QRIBFTTA (Service Code for Transfer 24/7 for QR to accounts)
 *   QRIBFTTC (Service Code for Transfer 24/7 for QR to card)
 *   QRCASH (Service Code for Withdraw money from ATM)
 *   QRPUSH (Service Code for Goods payment by QR)
 *   IF service code doesn't match it will be treat as QRPUSH
 *  Point of Initiation Method:
 *   11 - Immutable QR
 *   12 - Mutable QR
 */

export interface IPayment {
  bankAccount: string;
  amount?: string;
  message?: string;
}

export default VietQrUtils;
