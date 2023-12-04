import { ApiConstants } from '@networking/htc-api';
import { HTCservice } from '@networking/htc-service';

async function validateParams() {
  // fake - demo
  try {
    const rs = await HTCservice.Post({
      url: ApiConstants.LOGIN,
    });

    const data = rs?.data;

    return data;
  } catch (error) {}
}

const forgotPasswordService = {
  validateParams,
};

export default forgotPasswordService;
