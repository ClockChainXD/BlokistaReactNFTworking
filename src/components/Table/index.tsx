import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  table: {
    '& .MuiTableCell-root': {
      borderBottom: `1px solid ${theme.palette.surface[2]}`,
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
      background: 'transparent',
    },
  },
  container: {
    boxShadow: '0 37px 26px 10px #1111',
    backgroundImage: 'linear-gradient(140deg, rgba(242,220,102,1) 16%, rgba(255,37,213,0.8519782913165266) 68%)',
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const BasicTable = ({ columns, rows }) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <>
                <TableCell>{column.label}</TableCell>
              </>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              {columns.map(column => (
                <>
                  <TableCell>{row[column.key]}</TableCell>
                </>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
