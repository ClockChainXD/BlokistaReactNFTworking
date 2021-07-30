import { createTheme } from '@material-ui/core/styles';
import common from './common';
import colors from './colors';

const light = {
  palette: {
    type: 'light',
    surface: colors.light.surface,
    background: {
      default: colors.light.surface[1],
      paper: colors.light.surface[0],
    },
    divider: colors.light.divider,
    text: {
      primary: colors.light.text.primary,
      secondary: colors.light.text.secondary,
      disabled: colors.light.text.disabled,
      hint: colors.light.text.passive,
    },
    action: {
      active: colors.light.active,
      hover: colors.light.active,
      disabledBackground: colors.light.menu.itemHighlight,
    },
  },
};

export default createTheme(common, light);
