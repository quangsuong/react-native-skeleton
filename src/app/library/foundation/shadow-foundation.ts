export const Shadows = {
  'down-xs': {
    height: 2,
    shadowRadius: 2,
  },
  'down-s': {
    height: 2,
    shadowRadius: 4,
  },
  'down-m': {
    height: 4,
    shadowRadius: 8,
  },
  'down-l': {
    height: 4,
    shadowRadius: 16,
  },
  'up-s': {
    height: -2,
    shadowRadius: 4,
  },
  'up-m': {
    height: -4,
    shadowRadius: 8,
  },
  'up-l': {
    height: -4,
    shadowRadius: 16,
  },
};

export type ShadowTypes = {
  [K in keyof typeof Shadows]: undefined;
};
