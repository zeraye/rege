import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export class SearchResult {
  static ID_counter = 0;
  filename: string;
  source: string;
  gender: string;
  highlight: boolean
  frequency: number;
  indeksik: number;
  constructor (filename: string, source: string, gender: string, frequency: number) {
    this.filename = filename;
    this.source = source;
    this.gender = gender;
    this.highlight = false;
    this.frequency = frequency;
    this.indeksik = -20;
    SearchResult.ID_counter++;
  }
}

export default function BasicTable( {data, onRowClick}: any) {
  // const [rows, setRows] = React.useState([
  //   {
  //     filename: 'test1',
  //     source: 'ja',
  //     gender: 'apache',
  //     higlight: false,
  //     frequency: 0,
  //     id: -10,
  //   },
  //   {
  //     filename: 'test2',
  //     source: 'ono',
  //     gender: 'apache',
  //     higlight: false,
  //     frequency: 69,
  //     id: -2137,
  //   }
  // ]);

  // const onRowClick = (id: number) => {
  //   setRows(rows.map((row) => row.id === id ? {...row, higlight: true} : {...row, higlight: false}));
  // }

  return (
    <TableContainer component={Paper} sx={{ width: '100%'}}>
      <Table sx={{ minWidth: '50%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Filename</TableCell>
            <TableCell align="center">Source</TableCell>
            <TableCell align="center">Gender</TableCell>
            {/* <TableCell align="right">Tone</TableCell>  */}
            <TableCell align="right">Frequency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: SearchResult) => (
            <TableRow
              onClick={ () => {onRowClick(row.indeksik)} }
              key={row.indeksik}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{ backgroundColor: row.highlight ? '#171717' : '#232323' }}
            >
              <TableCell component="th" scope="row">{row.filename}</TableCell>
              {/* <TableCell align="right">{row.filename}</TableCell> */}
              <TableCell align="center">{row.source}</TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              {/* <TableCell align="right">{row.tone}</TableCell> */}
              <TableCell align="right">{row.frequency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}