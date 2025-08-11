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
  SxProps,
} from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import React, { useMemo, useState } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';

import type { ColumnConfig, TableProps } from '~/types';
import { STATUS_STYLES } from '~/constants';

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
  selected = [],
  selectable = 'single',
  onSelectionChange,
  onClick,
}: TableProps<T>) {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => setPage(value);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
    setPage(1);
  };

  const handleRowClick = (row: T) => {
    let newSelected = [row.id];
    if (selectable === 'single') {
      onSelectionChange?.(newSelected);
    } else if (selectable === 'multiple') {
      const isSelected = selected.includes(row.id);
      newSelected = isSelected ? selected.filter((id) => id !== row.id) : [...selected, row.id];
      onSelectionChange?.(newSelected);
    }
  };

  const handleIconClick = (row: T, fieldName: string, event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(row, fieldName, event);
  };

  const getBackgroundStatus = (value: string): SxProps => {
    return STATUS_STYLES[value] || {};
  };

  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'folder':
        return <FolderIcon sx={{ color: '#fbc02d', pr: 1, fontSize: 32 }} />;
      case 'paper':
        return <DescriptionIcon color='action' sx={{ pr: 1, fontSize: 32 }} />;
      default:
        return null;
    }
  };

  const renderCellContent = (row: T, col: ColumnConfig<T>): React.ReactNode => {
    const icons = getIcon(col.iconType);
    switch (col.type) {
      case 'text':
        return (
          <Box display='flex' alignItems='center'>
            {icons}
            {String(row[col.field])}
          </Box>
        );
      case 'status':
        return (
          <Typography component={'span'} borderRadius={3} sx={getBackgroundStatus(String(row[col.field]))}>
            {String(row[col.field])}
          </Typography>
        );
      case 'number':
        return (
          <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
            {Number(row[col.field])}
          </Typography>
        );
      case 'iconAction':
        return (
          <IconButton
            className='warningIcon'
            color='warning'
            onClick={(event) => {
              handleIconClick(row, String(col.field), event);
            }}
            data-testid={`warning_icon_${row.id}`}
          >
            <ArrowCircleRightOutlinedIcon sx={{ fontSize: 31 }} />
          </IconButton>
        );
      case 'iconDownload':
        return (
          <IconButton
            color='primary'
            onClick={(event) => {
              handleIconClick(row, String(col.field), event);
            }}
            data-testid={`download_${row.id}`}
          >
            <SaveAltOutlinedIcon sx={{ fontSize: 31 }} />
          </IconButton>
        );
      case 'doubleAction':
        return (
          <>
            <IconButton
              color='primary'
              onClick={(event) => {
                handleIconClick(row, `${String(col.field)}_primary`, event);
              }}
              sx={{ m: 0, p: 0, mr: 2 }}
              data-testid={`primary_${row.id}`}
            >
              <ArrowCircleRightOutlinedIcon sx={{ fontSize: 31 }} />
            </IconButton>
            <IconButton
              color='warning'
              onClick={(event) => {
                handleIconClick(row, `${String(col.field)}_warning`, event);
              }}
              sx={{ m: 0, p: 0, ml: 2 }}
              data-testid={`warning_${row.id}`}
            >
              <ArrowCircleRightOutlinedIcon sx={{ fontSize: 31 }} />
            </IconButton>
          </>
        );
      case 'textCheckbox': {
        const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          onChange?.(row, event.target.checked, String(col.field), event);
        };
        return (
          <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
            <Box display='flex' alignItems='center'>
              {icons}
              {String(row[col.field])}
            </Box>
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
          maxHeight: `${(rowsPerPage + 1) * 6 + 1}vh`,
          minHeight: `${(rowsPerPage + 1) * 6 + 1}vh`,
          overflowY: 'auto',
          border: '1px solid #ddd',
          borderBottom: paginatedData.length > 0 ? 'none' : '',
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
                    backgroundColor: backgroundHeader || 'white',
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
                const isSelected = selected.includes(row.id);
                return (
                  <TableRow
                    key={String(row.id)}
                    onClick={() => handleRowClick(row)}
                    sx={{
                      backgroundColor: isSelected ? '#cee7fa' : 'inherit',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: isSelected ? '' : '#f0f7ff',
                      },
                    }}
                  >
                    {columns.map((col) => (
                      <TableCell key={String(col.field)} align={col.align || 'center'}>
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
                  previous: () => <span style={{ padding: '0 8px', fontSize: '1rem', fontWeight: 500 }}>Previous</span>,
                  next: () => <span style={{ padding: '0 8px', fontSize: '1rem', fontWeight: 500 }}>Next</span>,
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
