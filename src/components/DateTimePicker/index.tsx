import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useStyles from './style';
export default function DateTimePickerField({ label, value, onChange }) {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        className={classes.root}
        label={label}
        inputVariant="outlined"
        value={value}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  );
}
