export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type FontDefinition = {
  fontFamily: string;
  fontWeight: FontWeight;
  fontStyle?: 'normal' | 'italic';
};

export type AppFontTheme = {
  regular: FontDefinition;
  medium: FontDefinition;
  light: FontDefinition;
  thin: FontDefinition;
  bold: FontDefinition;
  heavy: FontDefinition;
};

export const fonts: AppFontTheme = {
  regular: {
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  light: {
    fontFamily: 'Poppins',
    fontWeight: '300',
  },
  thin: {
    fontFamily: 'Poppins',
    fontWeight: '200',
  },
  bold: {
    fontFamily: 'Poppins',
    fontWeight: '700',
  },
  heavy: {
    fontFamily: 'Poppins',
    fontWeight: '800',
  },
};