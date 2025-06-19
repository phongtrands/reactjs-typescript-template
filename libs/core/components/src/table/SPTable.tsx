import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  CircularProgress,
  IconButton,
  Box,
  Typography,
  Checkbox,
  Pagination,
  PaginationItem,
} from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import type { ColumnConfig, TableProps } from '@core/types';
import React, { useMemo, useState } from 'react';

function SPTable<T extends { id: string | number }>({
  columns,
  data,
  loading = false,
  pagination = false,
  rowsPerPage = 5,
  backgroundHeader,
  enableSearch = false,
  searchColumn,
  onChange,
  onRowClick,
  onCheckboxChange,
  defaultRowIdSelected = '',
}: TableProps<T> & {
  onRowClick?: (row: T) => void;
  onCheckboxChange?: (row: T, checked: boolean) => void;
  defaultRowIdSelected?: string | number;
}) {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => setPage(value);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
    setPage(1);
  };

  const handleRowClick = (row: T) => {
    onRowClick?.(row);
  };

  const renderCellContent = (row: T, col: ColumnConfig<T>): React.ReactNode => {
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
          <>
            <IconButton color='primary'>
              <ArrowCircleRightOutlinedIcon />
            </IconButton>
            <IconButton color='warning'>
              <ArrowCircleRightOutlinedIcon />
            </IconButton>
          </>
        );
      case 'textCheckbox': {
        const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          onCheckboxChange?.(row, event.target.checked);
        };
        return (
          <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
            {String(row[col.field])}
            <Checkbox onChange={handleCheckboxChange} />
          </Box>
        );
      }
      default:
        return null;
    }
  };

  const filteredRows = useMemo(() => {
    if (!searchText) {
      return data;
    }

    return data.filter((row) => {
      if (!searchColumn) {
        return true;
      }
      const cellValue = row[searchColumn];
      return cellValue?.toString().toLowerCase().includes(searchText);
    });
  }, [data, searchText, searchColumn]);

  const paginatedData = pagination ? filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage) : filteredRows;

  const count = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <Box>
      {enableSearch && (
        <Box display='flex' justifyContent='flex-end' alignItems='center' gap={1} pb={2}>
          <Typography fontWeight={600} fontSize={14}>
            Search:
          </Typography>
          <TextField
            size='small'
            variant='outlined'
            value={searchText}
            onChange={handleSearchChange}
            sx={{ minWidth: 160 }}
          />
        </Box>
      )}

      <TableContainer
        sx={{
          maxHeight: `${(rowsPerPage + 1) * 6}vh`,
          minHeight: `${(rowsPerPage + 1) * 6}vh`,
          overflowY: 'auto',
          border: '1px solid #ddd',
        }}
      >
        <Table stickyHeader sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={String(col.field)}
                  align={col.align || 'center'}
                  sx={{
                    width: col.width,
                    color: 'black',
                    fontWeight: 'bold',
                    backgroundColor: backgroundHeader || 'white',
                    height: '6vh',
                    lineHeight: '6vh',
                    padding: 0,
                    pl: 1,
                    pr: 1,
                    border: '1px solid #ddd',
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
                <TableCell colSpan={columns.length} align='center'>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row) => {
                const isSelected = String(defaultRowIdSelected) === String(row.id);
                return (
                  <TableRow
                    key={String(row.id)}
                    hover
                    onClick={() => handleRowClick(row)}
                    sx={{
                      backgroundColor: isSelected ? '#e3f2fd' : 'inherit',
                      cursor: 'pointer',
                    }}
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={String(col.field)}
                        align={col.align || 'center'}
                        sx={{
                          padding: 0,
                          pl: 1,
                          height: '6vh',
                          lineHeight: '6vh',
                          border: '1px solid #ddd',
                        }}
                      >
                        {renderCellContent(row, col)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && (
        <Box display='flex' justifyContent='flex-end' alignItems='center' gap={1} pt={2}>
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
    </Box>
  );
}

export default SPTable;
