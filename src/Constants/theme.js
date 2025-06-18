import responsive from '../Components/Responsive';

export const clr = {
  primary: 'white',
  Text1: 'black',
  Text2: '#adadad',
  bttonBg: '#21292B',
  icon: '#767676',
  Tertiary: '#3B82F6',
};

export const SIZES = {
  // FONTS Sizes
  large: responsive.fontSize(50),
  h1: responsive.fontSize(24),
  h2: responsive.fontSize(18),
  h3: responsive.fontSize(14),
  h4: responsive.fontSize(13),
};

export const FONTS = {
  largeTitle: {
    fontSize: SIZES.large,
  },
  h1: {
    fontSize: SIZES.h1,
  },
  h2: {
    fontSize: SIZES.h2,
  },
  h3: {
    fontSize: SIZES.h3,
  },
  h4: {
    fontSize: SIZES.h4,
  },
};

const appTheme = { clr, SIZES, FONTS };

export default appTheme;
