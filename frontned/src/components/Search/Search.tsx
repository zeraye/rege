import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';

import { Page } from '../../App';
import DataTable from './DataTable';
import RowDisplay from './RowDisplay';
import FiltersBar from './FiltersBar';

import {
  RESULTS_PER_TABLE_ROW,
  DEFAULT_TOTAL_ROWS,
  SEARCH_ENDPOINT,
} from '../../constants';

export interface Filters {
  source: string;
  gender: string;
  frequencyRange: number[];
}

export interface Row {
  source: string;
  gender: string;
  frequency: number;
  figureUrl: string;
  filename: string;
}

interface SearchProps {
  defaultFilters: Filters;
  pageHandler: (pageTo: Page) => void;
}

const Search = ({ defaultFilters, pageHandler }: SearchProps) => {
  const [rows, setRows] = useState<Row[]>();
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(DEFAULT_TOTAL_ROWS);
  const [tablePage, setTablePage] = useState(0);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [highlightedRow, setHighlightedRow] = useState<Row>();

  const fetchRows = async () => {
    try {
      const response = await fetch(SEARCH_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...filters,
          recordingsRange: [
            tablePage * RESULTS_PER_TABLE_ROW,
            tablePage * RESULTS_PER_TABLE_ROW + RESULTS_PER_TABLE_ROW - 1,
          ],
        }),
        mode: 'cors',
      });

      if (!response.ok)
        throw new Error('Error when attempting to fetch resource.');

      const data = await response.json();

      if (!highlightedRow) setHighlightedRow(data['recordings'][0]);

      if (tablePage > data['count'] / RESULTS_PER_TABLE_ROW)
        setTablePage(Math.floor(data['count'] / RESULTS_PER_TABLE_ROW));

      setRows(data['recordings'].map((row: Row) => row));
      setTotalRows(data['count']);
      setLoading(false);
    } catch (e: unknown) {
      // TODO: add error handling
      if (typeof e === 'string') console.log(e);
      else if (e instanceof Error) console.log(e.message);
      else {
        console.log(e);
        throw new Error('Unhandled exception occured');
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, tablePage]);

  const filtersChangeHandler = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const onRowClick = (row: Row) => {
    setHighlightedRow(row);
  };

  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <FiltersBar
        defaultSource={filters.source}
        defaultGender={filters.gender}
        defaultFrequencyRange={filters.frequencyRange}
        filtersChangeHandler={filtersChangeHandler}
      />
      <Stack
        sx={{ flexDirection: { md: 'row', xs: 'column' } }}
        spacing={2}
        alignItems="center"
      >
        <DataTable
          rows={rows}
          onRowClick={onRowClick}
          highlightedRow={highlightedRow}
          page={tablePage}
          onPageChanged={(page: number) => setTablePage(page)}
          totalRows={totalRows}
          loading={loading}
        />
        <RowDisplay pageHandler={pageHandler} row={highlightedRow} />
      </Stack>
    </Stack>
  );
};

export default Search;
