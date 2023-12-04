/* eslint-disable import/no-anonymous-default-export */

export const REGEX = {
  ALPHABET_NUMBER: new RegExp(/^[0-9A-Za-z]*$/),
  OTP: new RegExp(/^[0-9]{6}$/),
  PHONE: new RegExp(/^0+[3,5,7,8,9]{1}[0-9]{1}[1-9]{1}[0-9]{6}$/),

  USERNAME: new RegExp('^[0-9A-Za-z_.]*$'),
  NICKNAME:
    /^([a-zA-Z0-9ÀÁẢÂÈÉÊỆẾỄÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ.-\s]+)$/i,
  ONLY_LETTER: new RegExp('^[A-Za-z ]*$'),
  EMAIL: new RegExp(/^\w+([-\\.]?\w+)+@+((\w+[-]?\w+\.){1,})\w+[-]?\w+$/),
  INCLUDE_NUMBER_AND_LETTER: new RegExp('^[a-zA-Z0-9]*$'),
  DONOT_SPECIAL_CHARATOR: new RegExp(/^[^0-9!#$%&'()*+,\-/;:<=>?@\[\]^_`{|}~]*$/),
  DONOT_SPECIAL_CHARATOR_AND_NUMBER: new RegExp('^[a-zA-Z ]*$'),
  DONOT_ONLY_SPACE: new RegExp(/^[^\s*$]/),
  PASSWORD: new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%(*)+,\-/;+?\[\]^_'{};])[a-zA-Z\d@!#$%(*)+,\-/;+?\[\]^_'{};]{6,}$/
  ),
  HalalNumber: new RegExp('^[0-9A-Za-z-, ]*$'),
  URL: new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/),
  POSTAL_CODE: new RegExp(/^[0-9]{6}$/),
  PRICE: new RegExp(/^\d+\.?(\d(\d)?)?$/),
  INTEGER_NUMBER: new RegExp(/^[0-9]*$/),
  INTEGER_NUMBER_WITH_DOT: new RegExp(/^\d*\.?\d*$/),
  INTEGER_NUMBER_MORE_THAN_0: new RegExp(/^[1-9][0-9]*$/),
  INTEGER_NUMBER_MORE_THAN_0_WITH_DOT: new RegExp(/(?:1|[1-9][0-9]*)(?:\.[0-9]{1,2})?/),
  INTEGER_NUMBER_WITH_DOT_COMMA: new RegExp(/^\d*[\,\.]?\d*$/),
  INTEGER_NUMBER_WITH_DOT_COMMA_2_DIGITAL: new RegExp(/^\d+(\.\d{1,2})?$/),
  DONT_INCLUDE_3_CONSECUTIVE: new RegExp(
    /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)+/gi
  ),
  ONLY_NUMBER: new RegExp('^[0-9]+$'),
  NOTE: new RegExp('^[0-9A-Za-z-( ).,\n]*$'),
  ACC_NAME_RULE: new RegExp(/^[^!#$÷%&'*+\:<=>?@\[\]^_`{|}~]*$/),
  REGEX_CHECK_ONLY_LETTER: /[a-zA-Z]/g,
  REGEX_CHECK_SPACE_AND_SPECIAL_CHAR: /^(?! *$)[0-9A-Za-z .-]*$/,
  REGEX_REMIND_NAME:
    /^[a-zA-Z0-9ÀÁẢÂÈÉÊỆẾỄÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ.,:;/\-_() ]*$/,
};
