import { createTheme } from '@material-ui/core/styles';
import common from './common';
import colors from './colors';

const dark = {
  palette: {
    type: 'dark',
    surface: colors.dark.surface,
    background: {
      default: colors.dark.surface[1],
      paper: colors.dark.surface[0],
    },
    divider: colors.dark.divider,
    text: {
      primary: colors.dark.text.primary,
      secondary: colors.dark.text.secondary,
      disabled: colors.dark.text.disabled,
      hint: colors.dark.text.passive,
    },
    action: {
      active: colors.dark.menu.itemHighlight,
      hover: colors.dark.active,
      disabledBackground: colors.dark.menu.itemHighlight,
    },
  },
};

export default createTheme(common, dark);
