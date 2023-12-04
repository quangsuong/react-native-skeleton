// key dùng để save data vào keychain không cần biometrics
enum StorageSensitive {
  K_PASS_WORD = 'K_PASS_WORD',
  SOTP_PIN = 'SOTP_PIN',
  SOTP_BIOMETRIC = 'SOTP_BIOMETRIC',
  SIGNIN_PIN = 'SIGNIN_PIN',
  STORAGE_KEY_PIN_LOGIN = 'STORAGE_KEY_PIN_LOGIN',
  K_USER_NAME = 'K_USER_NAME',
  K_SECRET_SOTP = 'K_SECRET_SOTP',
  K_TIME_OPEN_SOTP = 'K_TIME_OPEN_SOTP',
  K_COUNT_INVALID_PIN_SOTP = 'K_COUNT_INVALID_PIN_SOTP',
}

// key dùng để save data vào keychain yêu cầu biometrics
enum StorageBiometrics {
  K_PASS_WORD = 'K_PASS_WORD',
}

type KEY_THEME = 'KEY_THEME';

export type StorageSensitiveType = keyof typeof StorageSensitive;
export type StorageBiometricsType = keyof typeof StorageBiometrics;

export type StorageTypeAll = StorageSensitiveType | StorageBiometricsType | KEY_THEME;
