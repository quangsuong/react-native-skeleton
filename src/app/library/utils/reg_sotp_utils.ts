const reg_sotp_utils = {
  onRegisterSuccess: () => {},
  cleanRegisterSuccess: function () {
    reg_sotp_utils.onRegisterSuccess = () => {};
  },
};

export default reg_sotp_utils;
