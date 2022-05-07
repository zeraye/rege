import Stack from "@mui/material/Stack";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from "@mui/material/TablePagination"

export class SearchResult {
  static ID_counter = 0;
  source: string;
  gender: string;
  highlight: boolean
  frequency: number;
  id: number;
  constructor (source: string, gender: string, frequency: number) {
    this.source = source;
    this.gender = gender;
    this.highlight = false;
    this.frequency = frequency;
    this.id = SearchResult.ID_counter;
    SearchResult.ID_counter++;
  }
}

export default function ResultsTable( {data, onRowClick, range, onRangeChanged, resultCount}: any) {
  return (
    <TableContainer component={Paper} sx={{ width: 'fit-content'}}>
      <Table sx={{ minWidth: '50%' }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align="center">Source</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Frequency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: SearchResult) => (
            <TableRow
              onClick={ () => {onRowClick(row.id)} }
              key={row.id}
              style={{ cursor: 'pointer', backgroundColor: row.highlight ? '#171717' : '#232323' }}
            >
              <TableCell align="center">{row.source}</TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              <TableCell align="center">{row.frequency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack
        style={{ width: "100%" }}
        spacing={2}
        direction="row"
        alignItems="center"
      >
        <TablePagination
          align="center"
          style={{width: '100%'}}
          component='tr'
          rowsPerPage={5}
          rowsPerPageOptions={[5]}
          count={resultCount}
          page={range}
          onPageChange={ (_ev, page) => {onRangeChanged(page)} }
        />
      </Stack>
    </TableContainer>
  );
}