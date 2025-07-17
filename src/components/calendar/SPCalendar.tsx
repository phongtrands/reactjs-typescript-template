import React, { useState } from 'react';
import { Box, InputLabel, List, ListItemButton, ListItemText, Menu, TextField } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { subDays, format, subMonths, subYears, startOfMonth, endOfMonth, addYears, startOfYear } from 'date-fns';

import { Button, Typography } from '..';

import type { CalendarProps } from '~/types';
import { predefinedOptions } from '~/configs/calendar.config';

const SPCalendar: React.FC<CalendarProps> = ({ label, defaultFromDate = null, defaultToDate = null, onChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(defaultFromDate);
  const [toDate, setToDate] = useState<Date | null>(defaultToDate);
  const [startDate, setStartDate] = useState<Date | null>(fromDate);
  const [endDate, setEndDate] = useState<Date | null>(fromDate);
  const open = Boolean(anchorEl);
  const today = new Date();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedOption(null);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    handleChange(option);
  };

  const handleDone = () => {
    setFromDate(startDate);
    setToDate(endDate);
    if (onChange) {
      onChange(startDate, endDate);
    }
    handleCloseMenu();
  };

  const handleChange = (selection: string) => {
    let newFromDate = today;
    let newToDate = today;
    switch (selection) {
      case 'today':
        setFromDate(today);
        setToDate(today);
        break;
      case 'seventDay':
        newFromDate = subDays(today, 7);
        setFromDate(newFromDate);
        setToDate(newToDate);
        break;
      case 'oneMonth':
        newFromDate = startOfMonth(today);
        setFromDate(newFromDate);
        setToDate(newToDate);
        break;
      case 'oneYear':
        newFromDate = startOfYear(today);
        setFromDate(newFromDate);
        setToDate(newToDate);
        break;
      case 'previousMonth':
        newFromDate = startOfMonth(subMonths(today, 1));
        newToDate = endOfMonth(subMonths(today, 1));
        setFromDate(newFromDate);
        setToDate(newToDate);
        break;
      default:
        return;
    }
    if (onChange) {
      onChange(newFromDate, newToDate);
    }
    handleCloseMenu();
  };

  const handleCalendarChange = (selection: string, event: Date | null) => {
    switch (selection) {
      case 'specificDate':
        setStartDate(event);
        setEndDate(event);
        break;
      case 'oneYearBeforeDate':
        if (event) {
          setStartDate(subYears(event, 1));
          setEndDate(event);
        }
        break;
      case 'oneYearAfterDate':
        if (event) {
          setStartDate(event);
          setEndDate(addYears(event, 1));
        }
        break;
      case 'startDate':
        if (event) {
          setStartDate(event);
        }
        break;
      case 'endDate':
        if (event) {
          setEndDate(event);
        }
        break;
      default:
        return;
    }
  };

  const renderButton = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{ width: 90 }} onClick={() => handleCloseMenu()}>
          Cancel
        </Button>
        <Button sx={{ width: 90, marginLeft: 1 }} onClick={() => handleDone()}>
          Done
        </Button>
      </Box>
    );
  };

  const calendar = (selection: string) => {
    const title = predefinedOptions.find((item) => item.value === selection)?.name;
    const value = selection === 'oneYearAfterDate' ? startDate : endDate;
    return (
      <Box sx={{ background: '#deedf7', border: '1px solid #aed0ea', borderRadius: 2 }} m={1} p={1}>
        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <DateCalendar
          value={value}
          sx={{ background: 'white', border: '1px solid #dddddd', borderRadius: 2, my: 1 }}
          onChange={(event) => handleCalendarChange(selection, event)}
        />
        {renderButton()}
      </Box>
    );
  };

  const renderCalendar = (selection: string) => {
    switch (selection) {
      case 'specificDate':
        return calendar(selection);
      case 'oneYearBeforeDate':
        return calendar(selection);
      case 'oneYearAfterDate':
        return calendar(selection);
      case 'dateRange':
        return (
          <Box sx={{ background: '#deedf7', border: '1px solid #aed0ea', borderRadius: 2 }} m={1} p={1}>
            <Box sx={{ display: 'flex' }}>
              <Box>
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                  Start Date
                </Typography>
                <DateCalendar
                  value={startDate}
                  onChange={(event) => handleCalendarChange('startDate', event)}
                  sx={{ background: 'white', border: '1px solid #dddddd', borderRadius: 2, my: 1 }}
                />
              </Box>
              <Box marginLeft={1}>
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                  End Date
                </Typography>
                <DateCalendar
                  value={endDate}
                  onChange={(event) => handleCalendarChange('endDate', event)}
                  sx={{ background: 'white', border: '1px solid #dddddd', borderRadius: 2, my: 1 }}
                />
              </Box>
            </Box>
            {renderButton()}
          </Box>
        );
      default:
        return;
    }
  };

  const displayDate = () => {
    let value = '';
    if (fromDate && toDate) {
      if (fromDate === toDate) {
        value = format(toDate, 'yyyy-MM-dd');
      } else {
        value = `${format(fromDate, 'yyyy-MM-dd')} / ${format(toDate, 'yyyy-MM-dd')}`;
      }
    }
    return value;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <InputLabel>{label}</InputLabel>
        <TextField
          onClick={handleOpenMenu}
          value={displayDate()}
          sx={{
            width: '70%',
            backgroundColor: 'white',
            '& .MuiInputBase-input': {
              padding: 1,
            },
          }}
        />

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          MenuListProps={{ sx: { display: 'flex', flexDirection: 'row', p: 0 } }}
          sx={{ p: 1 }}
        >
          <List dense sx={{ width: 200 }}>
            {predefinedOptions
              .filter((opt) => !opt.calendar)
              .map((opt) => (
                <ListItemButton
                  key={opt.value}
                  onClick={() => handleOptionClick(opt.value)}
                  selected={selectedOption === opt.value}
                >
                  <ListItemText primary={opt.name} />
                </ListItemButton>
              ))}
            <Box my={2}>
              {predefinedOptions
                .filter((opt) => opt.calendar)
                .map((opt) => (
                  <ListItemButton
                    key={opt.value}
                    onClick={() => handleOptionClick(opt.value)}
                    selected={selectedOption === opt.value}
                  >
                    <ListItemText primary={opt.name} />
                    <PlayArrowIcon sx={{ fontSize: 16, color: '#055f8e' }} />
                  </ListItemButton>
                ))}
            </Box>
          </List>

          {renderCalendar(String(selectedOption))}
        </Menu>
      </Box>
    </LocalizationProvider>
  );
};

export default SPCalendar;
