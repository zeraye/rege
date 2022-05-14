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
  highlight: boolean; // only the row clicked by the user will be highlighted
  frequency: number;
  figureURL: string;
  id: number;
  constructor (source: string, gender: string, frequency: number, figureURL: any) {
    this.source = source;
    this.gender = gender;
    this.highlight = false;
    this.frequency = frequency;
    this.figureURL = figureURL;
    this.id = SearchResult.ID_counter;
    SearchResult.ID_counter++;
  }
}

export default function ResultsTable( {data, onRowClick, range, onRangeChanged, resultCount}: any) {
  return (
    <TableContainer component={Paper} sx={{width: '300px'}}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{width: '34%'}} align="center">Source</TableCell>
            <TableCell sx={{width: '33%'}} align="center">Gender</TableCell>
            <TableCell sx={{width: '33%'}} align="center">Frequency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {data.map((row: SearchResult) => (
            <TableRow
              sx={{width: '100%'}}
              onClick={ () => {onRowClick(row.id)} }
              key={row.id}
              style={{ cursor: 'pointer', backgroundColor: row.highlight ? '#171717' : '#232323' }}
            >
              <TableCell sx={{width: '34%'}} align="center">{row.source}</TableCell>
              <TableCell sx={{width: '33%'}} align="center">{row.gender}</TableCell>
              <TableCell sx={{width: '33%'}} align="center">{row.frequency}</TableCell>
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