import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import CircularProgress from '@mui/material/CircularProgress';

import { Row } from './Search';

import { RESULTS_PER_TABLE_ROW } from '../../constants';

interface DataTableProps {
  rows: Row[] | undefined;
  onRowClick: (row: Row) => void;
  highlightedRow: Row | undefined;
  page: number;
  onPageChanged: (page: number) => void;
  totalRows: number;
  loading: boolean;
}

const DataTable = ({
  rows,
  onRowClick,
  highlightedRow,
  page,
  onPageChanged,
  totalRows,
  loading,
}: DataTableProps) => {
  return (
    <TableContainer sx={{ width: '300px' }} component={Paper}>
      <Table aria-label="Recordings table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Source</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Frequency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading || !rows ? (
            <TableRow sx={{ width: '100%' }}>
              <TableCell
                align="center"
                colSpan={3}
                padding="none"
                sx={{ border: 'none' }}
              >
                <CircularProgress size={40} sx={{ marginTop: '7.5px' }} />
              </TableCell>
            </TableRow>
          ) : rows.length > 0 ? (
            rows.map((row: Row) => (
              <TableRow
                sx={{ width: '100%' }}
                onClick={() => {
                  onRowClick(row);
                }}
                key={row.filename}
                style={{
                  cursor: 'pointer',
                  backgroundColor:
                    highlightedRow && row.filename === highlightedRow.filename
                      ? '#171717'
                      : '#232323',
                }}
              >
                <TableCell align="center">{row.source}</TableCell>
                <TableCell align="center">{row.gender}</TableCell>
                <TableCell align="center">{row.frequency}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow sx={{ width: '100%' }}>
              <TableCell align="center" colSpan={3}>
                Empty table
              </TableCell>
            </TableRow>
          )}
          <TableRow
            style={{
              height:
                53 *
                  (RESULTS_PER_TABLE_ROW -
                    (loading || !rows ? 1 : rows.length)) +
                40,
            }}
          >
            <TableCell colSpan={3} />
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              rowsPerPage={RESULTS_PER_TABLE_ROW}
              rowsPerPageOptions={[RESULTS_PER_TABLE_ROW]}
              count={totalRows}
              page={page}
              onPageChange={(_, page) => onPageChanged(page)}
              backIconButtonProps={loading ? { disabled: true } : {}}
              nextIconButtonProps={loading ? { disabled: true } : {}}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
