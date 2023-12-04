import { codePriorityCustomer } from '@common';
import { showAlert } from '@components/alert';
import { ENVConfig } from '@config/env';
import { navigate } from '@navigation/navigation-service';
import { ApiConstants } from '@networking/htc-api';
import { HTCservice } from '@networking/htc-service';
import { translate } from '@utils/i18n/translate';
import { Utils } from '@utils/utils';
import _, { get } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { getUniqueIdSync } from 'react-native-device-info';

interface LoginParams {
  userId: string;
  password: string;
}

export const unknowErrorRes = {
  result: {
    message: '',
    responseCode: 'GW-999',
    ok: false,
  },
  data: {},
};

export default async function LoginService({ userId, password }: LoginParams) {
  try {
    const data = {
      UserName: userId,
      Password: password,
      deviceId: getUniqueIdSync(),
      // userid: '0943611060',
      // password: 'Kony@1234',
    };
    const response = await HTCservice.Post({
      url: ENVConfig.HTC_ROOT + ApiConstants.LOGIN,
      data,
      headers: {
        'X-Kony-UserName': userId,
        'X-Kony-Cif': 'none',
      },
    });

    const token = response?.claims_token?.value;

    const passwordExpireDays = response?.profile?.user_attributes?.passwordExpireDays;
    const errcode = response?.details?.errcode;
    const isForceChangePassword = /10135|99039/.test(errcode);
    // force change keycloak 99039
    // 10135 mk het han
    let cif = '';

    try {
      const backendIdentifiers = get(response, 'profile.user_attributes.backendIdentifiers', '{}');
      const backendIdentifiersJson = JSON.parse(backendIdentifiers);
      cif = get(backendIdentifiersJson, 'CORE[0].BackendId', '');
      window.user_cif = cif;
    } catch (error) {
      console.log('====================================');
      console.log('backendIdentifiersErr', error);
      console.log('====================================');
    }
    const isNewDevice = __DEV__
      ? false
      : get(response, 'profile.user_attributes.isDeviceRegistered') === 'false';

    if (errcode === 11606) {
      // tk da bi khoa dky ngan hang
      return {
        data: {},
        result: {
          responseCode: 'US_011',
        },
      };
    }

    const customerStatus = _.get(response, 'profile.user_attributes.CustomerStatus', undefined);

    if (isForceChangePassword) {
      return {
        data: {
          isForceChangePassword,
          errcode,
        },
        result: {
          responseCode: '00',
        },
      };
    }

    if (token) {
      const userInfo: any = {};
      const deviceId = get(response, 'profile.user_attributes.deviceId');
      const deviceName = get(response, 'profile.user_attributes.deviceName');
      const deviceOs = get(response, 'profile.user_attributes.deviceOs');
      const isSmartOtp = get(response, 'profile.user_attributes.isSmartOtp');

      // check xem co phai khach hang uu tien khoong
      const isPriorityPerson =
        (customerStatus && codePriorityCustomer.indexOf(customerStatus) >= 0) || false;
      window.isPriority = isPriorityPerson;
      const deviceMFA = {
        deviceId,
        deviceName,
        deviceOs,
        isSmartOtp,
      };

      const { profile } = response;
      const data = {
        customer: {
          cif,
          name: profile?.firstname + ' ' + profile?.lastname,
          email: profile?.email,
          phoneNumber: profile?.user_attributes?.Phone,
          addr: profile?.user_attributes?.AddressLine1,
          userId,
          avatar: '',
          userName: profile?.user_attributes?.UserName,
          customerId: profile?.user_attributes?.customer_id,
          ...userInfo,
        },
        isNewDevice,
        passwordExpireDays,
        sessionId: token,
        deviceMFA,
        isPriorityPerson,
      };
      const { user_attributes } = profile;
      if (user_attributes?.raw_response) {
        const result = JSON.parse(user_attributes?.raw_response);

        data.customer.contract = {
          customerId: JSON.parse(result?.backendIdentifiers)?.CORE?.[0]?.BackendId,
          contractId: JSON.parse(result?.backendIdentifiers)?.CORE?.[0]?.contractId,
          companyId: result?.companyId,
        };
      }

      return {
        data,
        isNewDevice: false,
        isForceChangePassword: false,
        result: {
          message: 'OK',
          responseCode: '00',
          ok: true,
        },
      };
    } else if (/10095|10088|11000/.test(errcode)) {
      // 10095 sai mk  10088 // khoa  // 11000 tk mk ko chinh xac

      return {
        result: {
          message: 'Ten dang nhap hoac mat khau khong chinh xac.',
          responseCode: 'GW-401',
          ok: false,
          remainNum: response?.details?.errmsg,
          errcode,
        },
        data: {},
      };
    }

    switch (errcode) {
      case 11605:
        {
          showAlert({
            title: translate('alert:account_lock'),
            content: translate('error:' + errcode) + ' (11605)',
            type: 'confirm',
            actions: [
              {
                title: translate('text:close'),
                type: 'secondary',
              },
              {
                title: translate('text:call_hotline'),
                type: 'primary',
                onPress: () => Utils.callHotline(),
                iconName: 'IC_CALL_OUTLINE',
              },
            ],
          });
        }
        break;

      case 11604:
        {
          showAlert({
            title: translate('alert:temp_lock'),
            content: translate('alert:your_account_is_locked') + ' (11604)',
            type: 'confirm',
            actions: [
              {
                title: translate('text:close'),
                type: 'secondary',
              },
              {
                title: translate('text:call_hotline'),
                type: 'primary',
                onPress: () => Utils.callHotline(),
                iconName: 'IC_CALL_OUTLINE',
              },
            ],
          });
        }
        break;

      case 99047: // khi chua migrate nhap mk sai
        {
          showAlert({
            title: translate('alert:notify'),
            content: translate('text:account_migrate_content') + ' (99047)',
            type: 'confirm',
            actions: [
              {
                title: translate('text:forgot_password'),
                onPress: () => navigate('FORGOT_PASSWORD'),
              },
              {
                title: translate('alert:try_again'),
                type: 'secondary',
              },
            ],
          });
        }
        break;

      default: {
        const code = get(response, 'details.errcode', '');
        const msg = get(response, 'details.errmsg', '');
        let msgErr = msg;
        if (!isEmpty(`${code}`)) {
          msgErr += ` (${code})`;
        }
        showAlert({
          title: translate('alert:notify'),
          content: !isEmpty(msgErr) ? msgErr : translate('error:UNKNOWN'),
          type: 'confirm',
          actions: [
            {
              title: translate('text:close'),
              type: 'secondary',
            },
            {
              title: translate('text:call_hotline'),
              type: 'primary',
              onPress: () => Utils.callHotline(),
            },
          ],
        });
      }
    }

    return unknowErrorRes;
  } catch (error) {
    return unknowErrorRes;
  }
}
