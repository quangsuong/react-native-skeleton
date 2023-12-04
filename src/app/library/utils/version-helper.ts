function getVerionCodePush(currentVersion: string, label: string) {
  const verCodePush = (label || '')?.replaceAll('v', '');
  return `${currentVersion}(${verCodePush})`;
}

const versionHelper = {
  getVerionCodePush,
};

export default versionHelper;
