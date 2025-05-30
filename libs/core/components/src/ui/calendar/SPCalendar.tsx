import React, { useState, useEffect } from 'react';
import { Box, Button, ClickAwayListener, InputLabel, SxProps, TextField } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface SPCalendarProps {
  label?: string;
  defaultFromDate?: Date | undefined;
  defaultToDate?: Date | undefined;
  onCancel?: () => void;
  onSelect?: (fromDate: Date | undefined, toDate: Date | undefined) => void;
  className?: string;
}

const SPCalendar: React.FC<SPCalendarProps> = ({
  label,
  defaultFromDate = undefined,
  defaultToDate = undefined,
  onCancel,
  onSelect,
  className,
}) => {
  const [fromDate, setFromDate] = useState<Date | undefined>(defaultFromDate);
  const [toDate, setToDate] = useState<Date | undefined>(defaultToDate);
  const [tempFromDate, setTempFromDate] = useState<Date | undefined>(defaultFromDate);
  const [tempToDate, setTempToDate] = useState<Date | undefined>(defaultToDate);
  const [maxDate, setMaxDate] = useState<Date | undefined>(undefined);
  const [minDate, setMinDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setFromDate(defaultFromDate);
    setToDate(defaultToDate);
    setTempFromDate(defaultFromDate);
    setTempToDate(defaultToDate);
  }, [defaultFromDate, defaultToDate]);

  const handleCancel = () => {
    setTempFromDate(new Date());
    setTempToDate(new Date());
    setOpen((prev) => !prev);
    onCancel?.();
  };

  const handleSelect = () => {
    setFromDate(tempFromDate);
    setToDate(tempToDate);
    setOpen((prev) => !prev);
    onSelect?.(tempFromDate, tempToDate);
  };
  const styles: SxProps = {
    position: 'absolute',
    top: 60,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    p: 1,
    width: 'fit-content',
    bgcolor: 'background.paper',
  };
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display='flex' flexDirection='column'>
        <InputLabel>{label}</InputLabel>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box sx={{ position: 'relative' }}>
            <TextField
              onClick={handleClick}
              className={className}
              value={fromDate && toDate ? `${fromDate.toLocaleDateString()} - ${toDate.toLocaleDateString()}` : ''}
            />
            {open && (
              <Box sx={styles} display='flex' flexDirection='column'>
                <Box display='flex'>
                  <DateCalendar
                    value={tempFromDate}
                    maxDate={maxDate}
                    onChange={(fromDate) => {
                      setMinDate(fromDate ?? new Date());
                      setTempFromDate(fromDate ?? new Date());
                    }}
                  />
                  <DateCalendar
                    value={tempToDate}
                    minDate={minDate}
                    onChange={(toDate) => {
                      setMaxDate(toDate ?? new Date());
                      setTempToDate(toDate ?? new Date());
                    }}
                  />
                </Box>
                <Box display='flex' justifyContent='flex-end' gap={2}>
                  <Button variant='outlined' onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant='contained' onClick={handleSelect}>
                    Select
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </ClickAwayListener>
      </Box>
    </LocalizationProvider>
  );
};

export default SPCalendar;
