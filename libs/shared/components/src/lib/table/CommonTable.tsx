import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TextField, CircularProgress,
  IconButton,
  Box,
  Typography,
  Checkbox,
  Pagination,
  PaginationItem
} from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';

import React, { useMemo, useState } from 'react';

export interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  type?: string;
}

interface ChangeEvent {
  rowIndex: number;
  rowId: number | string;
  fieldName: string;
  value: number | string;
}

 interface TableProps<T> {
  columns: ColumnConfig<T>[];
  data: T[];
  loading?: boolean;
  enableSearch?: boolean;
  pagination?: boolean;
  rowsPerPage?: number;
  maxHeight?: number;
  minHeight?: number;
  backgroundHeader?: string;
  searchColumn?: keyof T
  onChange?: (event: ChangeEvent) => void;
}

function CommonTable<T extends { id: string | number }>({
  columns,
  data,
  loading = false,
  enableSearch = false,
  pagination = false,
  rowsPerPage = 5,
  maxHeight,
  minHeight,
  backgroundHeader,
  searchColumn,
  onChange,
}: TableProps<T>) {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
    setPage(1);
  };

  const renderCellContent = <T,>(row: T, col: ColumnConfig<T>): React.ReactNode => {
    switch (col.type) {
      case 'text':
        return String(row[col.field]);
      case 'number':
        return Number(row[col.field]);
      case 'iconAction':
        return (
            <IconButton color='warning'>
              <ArrowCircleRightOutlinedIcon />
            </IconButton>
        );
      case 'iconDownload':
        return (
            <IconButton color='primary'>
              <SaveAltOutlinedIcon />
            </IconButton>
        );
      case 'doubleAction':
        return (
          <div>
            <IconButton color='primary'>
              <ArrowCircleRightOutlinedIcon />
            </IconButton>
            <IconButton color='warning'>
              <ArrowCircleRightOutlinedIcon />
            </IconButton>
          </div>
        );
      case 'textCheckbox':
        return (
          <div>
            {String(row[col.field])}
            <Checkbox />
          </div>
        );
      default:
        return null;
    }
  };

  const filteredRows = useMemo(() => {
    if (!searchText) {return data;}

    return data.filter((row) => {
      if (!searchColumn) {return true;}

      const cellValue = row[searchColumn];
      return cellValue?.toString().toLowerCase().includes(searchText);
    });
  }, [data, searchText, searchColumn]);

  const paginatedData = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const count = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <Paper sx={{ padding: 2 }}>
      {enableSearch && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1,
          pb: 2,
        }}
        >
          <Typography fontWeight={600} fontSize={14}>Search:</Typography>
          <TextField
            size="small"
            variant="outlined"
            value={searchText}
            onChange={handleSearchChange}
            className="search-input"
            sx={{ minWidth: 160 }}
          />
        </Box>
      )}

      <TableContainer
      sx={{
        minHeight: minHeight ? { minHeight } : undefined,
        maxHeight: maxHeight ? { maxHeight } : undefined,
      }}
      >
        <Table sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={String(col.field)}
                  align={col.align || 'center'}
                  style={{ width: col.width }}
                  sx={{
                    border: '1px solid #ddd',
                    color: 'black',
                    fontWeight: 'bold',
                    backgroundColor: backgroundHeader ? { backgroundHeader } : undefined,
                  }}
                >
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row) => (
                <TableRow key={String(row.id)}>
                  {columns.map((col) => (
                    <TableCell key={String(col.field)} align={col.align || 'center'} sx={{ border: '1px solid #ddd' }}>
                        {renderCellContent(row, col)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1,
          pt: 2,
        }}>
          <Pagination
          count={count}
          page={page}
          onChange={handleChangePage}
          renderItem={(item) => (
          <PaginationItem
            components={{
            previous: () => <span style={{ padding: '0 8px' }}>Previous</span>,
            next: () => <span style={{ padding: '0 8px' }}>Next</span>,
            }}
            {...item}
            sx={{ borderRadius: 0 }}
          />
        )}
      />
        </Box>
      )}
    </Paper>
  );
}

export default CommonTable;