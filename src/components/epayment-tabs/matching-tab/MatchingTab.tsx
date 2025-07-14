import { Box, Divider, Grid, Typography } from '@mui/material';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';

import type { ColumnConfig } from '~/types';
import { Button, Table } from '~/components';
import { EPaymentData } from '~/configs/mockData';
import { EPAYMENT_TAB } from '~/configs';
import { changeTab } from '~/redux';
import { useAppDispatch } from '~/redux/hook';

interface Epayment {
  id: number;
  payment_method?: string;
  statement_date?: string;
  valuedate?: string;
  amount?: number;
}

const MatchingTab: React.FC = () => {
  const dispatch = useAppDispatch();
  const columns: ColumnConfig<Epayment>[] = [
    { headerName: 'Payment Method', field: 'payment_method', align: 'left', type: 'text' },
    { headerName: 'Statement Date', field: 'statement_date', align: 'left', type: 'text' },
    { headerName: 'Value Date', field: 'valuedate', align: 'left', type: 'text' },
    { headerName: 'Amount', field: 'amount', align: 'right', type: 'number' },
  ];
  return (
    <Box sx={{ mt: 3 }}>
      <Box ml={2} sx={{ fontSize: '16px' }}>
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
          borderRadius: 2,
          backgroundColor: '#fff',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          mt: 4,
        }}
      >
        <Box display='flex' alignItems='center' justifyContent={'space-between'} mb={2}>
          <Typography variant='h5' fontWeight='bold' ml={3}>
            ePayment
          </Typography>
          <Box display='flex' gap={2}>
            <Box display='flex' alignItems='center'>
              <Button variant='outlined' color='inherit' startIcon={<SaveAltOutlinedIcon />}>
                Download SAPFIN
              </Button>
            </Box>
            <Box display='flex' alignItems='center'>
              <Button variant='outlined' color='inherit' startIcon={<SaveAltOutlinedIcon />}>
                Download Report(MT940)
              </Button>
            </Box>
            <Box display='flex' alignItems='center'>
              <Button variant='outlined' color='inherit' startIcon={<SaveAltOutlinedIcon />}>
                Download Report(Host)
              </Button>
            </Box>
          </Box>
        </Box>
        <Box mt={3} mb={2}>
          <Table
            columns={columns}
            data={EPaymentData}
            pagination
            rowsPerPage={3}
            minHeight={1}
            backgroundHeader='#f2f2f2'
          />
        </Box>

        <Divider sx={{ borderColor: '#bdbdbd' }} />

        <Box mt={2}>
          <Typography variant='h5' fontWeight='bold' mb={2} ml={3}>
            Non ePayment
          </Typography>
          <Table
            columns={columns}
            data={EPaymentData}
            pagination
            rowsPerPage={3}
            minHeight={1}
            backgroundHeader='#f2f2f2'
          />
        </Box>
      </Box>
      <Box display='flex' justifyContent='flex-end' mt={2}>
        <Button variant='contained' sx={{ width: 150 }} onClick={() => dispatch(changeTab(EPAYMENT_TAB.SUMMARY))}>
          Back
        </Button>
        <Button variant='contained' sx={{ width: 150, ml: 3 }}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default MatchingTab;
