export type Colors = {
  primary: string;
  secondary: string;
};

const COLORS_LIGHT: Colors = {
  primary: '#F3F4F8',
  secondary: '#0D0E1C',
};

const COLORS_DARK: Colors = {
  primary: '#0D0E1C',
  secondary: '#F3F4F8',
};

enum COLOR_SCHEME {
  LIGHT = 'light',
  DARK = 'dark',
}

export const COLORS = {
  [COLOR_SCHEME.LIGHT]: COLORS_LIGHT,
  [COLOR_SCHEME.DARK]: COLORS_DARK,
};