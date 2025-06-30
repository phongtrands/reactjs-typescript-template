import { Table, Button } from '@core/components';
import { Box, Grid, Typography } from '@mui/material';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import type { ColumnConfig } from '@core/types';

import { ExceptionData } from '../../configs/mockData';

interface Exceptions {
  id: number;
  refer_account_owne?: string;
  system?: string;
  payment_method?: string;
  dc_mark?: string;
  statement_date?: string;
  valuedate?: string;
  business_date?: string;
  amount?: number;
}

const ExceptionsTab: React.FC = () => {
  const columns: ColumnConfig<Exceptions>[] = [
    { headerName: 'Txn Reference Id', field: 'refer_account_owne', align: 'left', type: 'text' },
    { headerName: 'System', field: 'system', align: 'left', type: 'text' },
    { headerName: 'Payment Menthod', field: 'payment_method', align: 'left', type: 'text' },
    { headerName: 'Debit/Credit', field: 'dc_mark', align: 'left', type: 'text' },
    { headerName: 'Statement Date', field: 'statement_date', align: 'left', type: 'text' },
    { headerName: 'Value Date', field: 'valuedate', align: 'left', type: 'text' },
    { headerName: 'Business Date', field: 'business_date', align: 'left', type: 'text' },
    { headerName: 'Amount', field: 'amount', align: 'right', type: 'number' },
  ];
  return (
    <Box mt={4}>
      <Box ml={3} sx={{ fontSize: '16px' }}>
        <Grid container spacing={4}>
          <Grid item xs={3} ml={1}>
            <Typography variant='body1' color='text.secondary' component='span'>
              File:{' '}
            </Typography>
            <Typography variant='body1' fontWeight='bold' component='span'>
              SPA_20230224.txt
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='body1' color='text.secondary' component='span'>
              Account No.:{' '}
            </Typography>
            <Typography variant='body1' fontWeight='bold' component='span'>
              0039007442
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='body1' color='text.secondary' component='span'>
              Bank:{' '}
            </Typography>
            <Typography variant='body1' fontWeight='bold' component='span'>
              DBS
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          p: 2,
          mt: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box display='flex' alignItems='center' justifyContent={'space-between'} mb={2}>
          <Typography variant='h5' fontWeight='bold' ml={3}>
            MT940
          </Typography>
          <Box display='flex' alignItems='center'>
            <Button variant='outlined' color='inherit' startIcon={<SaveAltOutlinedIcon />}>
              Download Report
            </Button>
          </Box>
        </Box>
        <Table
          columns={columns}
          data={ExceptionData}
          pagination
          rowsPerPage={5}
          minHeight={1}
          backgroundHeader='#f2f2f2'
        />
      </Box>
      <Box display='flex' justifyContent='flex-end' mt={2}>
        <Button variant='contained' sx={{ width: 150 }}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default ExceptionsTab;
