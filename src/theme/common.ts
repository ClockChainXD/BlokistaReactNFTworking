import '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core';
import colors from './colors';

import '@material-ui/core/styles';
// @ts-ignore
declare module '@material-ui/core/styles/createPalette' {
  // @ts-ignore
  interface Palette {
    surface?: Array<React.CSSProperties['color']>;
  }
}

declare module '@material-ui/core/styles/shape' {
  interface Shape {
    mdBorderRadius?: number;
    cardBorderRadius?: number;
    lgBorderRadius?: number;
  }
}

declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    layouts: {
      container: number;
      containerSm: number;
      logo: {
        width: {
          desktop: number;
          mobile: number;
        };
      };
      header: {
        height: {
          desktop: number;
          mobile: number;
        };
      };
    };
  }
}

const typographyOptions = {
  header: {
    fontSize: 60,
    fontWeight: 700,
    letterSpacing: 2.5,
  },
  title: {
    fontSize: 37,
    fontWeight: 700,
    letterSpacing: 1.8,
  },
  subtitle1: {
    fontSize: 25,
    fontWeight: 500,
    letterSpacing: 1,
    lineHeight: '32px',
  },
  subtitle2: {
    fontSize: 23,
    fontWeight: 700,
    lineHeight: '33px',
    letterSpacing: 1.5,
  },
  body1: {
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: 0.9,
    lineHeight: '30px',
  },
  body2: {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: 0.5,
  },
  tinyBold: {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 0.7,
  },
  tiny: {
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0.8,
    lineHeight: '12px',
  },
  caption: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
};

const spacing = 8;

export default {
  spacing,
  shape: {
    borderRadius: 10,
    mdBorderRadius: 14,
    cardBorderRadius: 18,
    lgBorderRadius: 30,
  },
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    success: colors.success,
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'Noto Sans',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji',
    ].join(),
    h1: typographyOptions.header,
    h2: typographyOptions.title,
    h3: typographyOptions.subtitle1,
    h4: typographyOptions.subtitle2,
    h5: typographyOptions.tinyBold,
    h6: typographyOptions.tiny,
    subtitle1: typographyOptions.subtitle1,
    subtitle2: typographyOptions.subtitle2,
    body1: typographyOptions.body1,
    body2: typographyOptions.body2,
    caption: typographyOptions.caption,
    button: typographyOptions.body1,
    overline: typographyOptions.body1,
  },
  overrides: {
    MuiOutlinedInput: {
      notchedOutline: {
        border: 'none',
      },
      input: {
        padding: '10.5px 14px',
      },
      adornedEnd: {
        paddingRight: 8,
      },
    },
    MuiButton: {
      root: {
        fontSize: 14,
        letterSpacing: 0.6,
        borderRadius: 24,
        height: 40,
      },
      sizeSmall: {
        height: 32,
        fontSize: 12,
        padding: 5,
        letterSpacing: 1.4,
      },
      sizeLarge: {
        height: 49,
        letterSpacing: 1.2,
      },
    },
    MuiBreadcrumbs: {
      li: {
        fontSize: 13,
        fontWeight: 'bold',
      },
      separator: {
        marginLeft: 26,
        marginRight: 26,
      },
    },
    MuiFormControlLabel: {
      label: {
        fontSize: 14,
        fontWeight: 600,
        marginLeft: 2,
      },
    },
    MuiDialog: {
      container: {
        background: '#272b35cf',
      },
      paper: {
        margin: 16,
      },
    },
    MuiPopover: {
      paper: {
        overflow: 'visible !important',
        borderRadius: 10,
      },
    },
    MuiCardMedia: {
      root: {
        backgroundSize: '100% 100% !important',
      },
    },
    MuiCollapse: {
      container: {
        width: '100%',
      },
    },
  },
  props: {},
  layouts: {
    container: 1152,
    containerSm: 766,
    logo: {
      width: {
        desktop: 140,
        mobile: 120,
      },
    },
    header: {
      height: {
        desktop: 80,
        mobile: 10,
      },
    },
  },
  breakpoints: {
    keys: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xxs: 0,
      xs: 567,
      sm: 768,
      md: 1025,
      lg: 1440,
      xl: 1920,
    },
  },
} as ThemeOptions;
