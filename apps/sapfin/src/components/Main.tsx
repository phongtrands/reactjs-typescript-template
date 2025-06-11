import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Grid, Paper, type SelectChangeEvent } from '@mui/material';
import { Button, Dropdown, Table, TextArea, Typography } from '@core/components';
import type { ColumnConfig } from '@core/types';
import React from 'react';

interface File {
  id: string;
  filename: string;
}

const Main = () => {
  const menuData = [
    { value: 'BMCS', label: 'BMCS' },
    { value: 'Menu2', label: 'Menu2' },
    { value: 'Menu3', label: 'Menu3' },
  ];
  const [value, setValue] = React.useState(menuData[0].label);
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  const data: File[] = [
    { id: '1', filename: 'Row1' },
    { id: '2', filename: 'Row2' },
    { id: '3', filename: 'Row3' },
    { id: '4', filename: 'Row4' },
    { id: '5', filename: 'Row5' },
    { id: '6', filename: 'Row6' },
    { id: '7', filename: 'Row7' },
    { id: '8', filename: 'Row8' },
  ];

  const colum: ColumnConfig<File>[] = [{ headerName: 'File', field: 'filename', align: 'left', type: 'text' }];

  const columCheckbox: ColumnConfig<File>[] = [
    { headerName: 'File', field: 'filename', align: 'left', type: 'textCheckbox' },
  ];

  return (
    <Box p={3}>
      <Box
        sx={{
          bgcolor: '#f8f9fa',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Dropdown
          options={menuData}
          label='Source'
          value={value}
          onChange={handleChange}
          styleLabel={{ fontWeight: 'bold', color: '#fff' }}
          styleSelect={{ bgcolor: '#fff' }}
          styleBg={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            bgcolor: '#005b84',
            border: '1px solid black',
            borderRadius: 1,
          }}
        />
      </Box>

      <Paper elevation={2} sx={{ mt: 2, borderRadius: 2, p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
              Preview Folder
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Table<File> data={data} columns={colum} backgroundHeader='#0286c2' />
              </Grid>
              <Grid item xs={6}>
                <Table<File> data={data} columns={columCheckbox} backgroundHeader='#0286c2' />
              </Grid>
            </Grid>
            <Box display='flex' justifyContent='flex-end' mt={1}>
              <Button sx={{ border: 1, borderColor: 'grey.500', ml: 1 }} variant='contained' color='inherit'>
                Reject
              </Button>
              <Button sx={{ border: 1, borderColor: 'grey.500', ml: 1 }} variant='contained' color='inherit'>
                Download
              </Button>
            </Box>
          </Grid>

          <Grid item xs={1} container direction='column' alignItems='center' justifyContent='center'>
            <Button sx={{ mb: 1, border: 1, borderColor: 'grey.500' }} variant='contained' color='inherit'>
              <ArrowForwardIosIcon />
            </Button>
            <Button sx={{ mt: 1, border: 1, borderColor: 'grey.500' }} variant='contained' color='inherit'>
              <ArrowBackIosNewIcon />
            </Button>
          </Grid>

          <Grid item xs={4}>
            <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
              Upload Folder
            </Typography>
            <Table<File> data={data} columns={colum} backgroundHeader='#0286c2' />
            <Box display='flex' justifyContent='flex-end' mt={1}>
              <Button sx={{ border: 1, borderColor: 'grey.500', ml: 1 }} variant='contained' color='inherit'>
                Test Run
              </Button>
              <Button sx={{ border: 1, borderColor: 'grey.500', ml: 1 }} variant='contained' color='inherit'>
                Actual Run
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box mt={3}>
          <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
            SAP Response
          </Typography>
          <TextArea
            value='qqqqqqqqqqqqqqqqqqqqqqqqq\nqqqqqqqqqqqqqqqqqqqqqqqqq'
            onChange={() => ''}
            minRows={4}
            maxRows={4}
            placeholder='Maximum 4 rows'
            style={{ width: '100%' }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Main;
