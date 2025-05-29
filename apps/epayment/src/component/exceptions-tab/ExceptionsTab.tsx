import { Table, Button } from '@core/components';
import { Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import { ColumnConfig } from '@core/types';

const ExceptionsTab: React.FC = () => {

    const columns: ColumnConfig<never>[] = [
        { headerName: 'Txn Reference Id', field: 'txnReferenceId', align: 'left', type: 'text' },
        { headerName: 'System', field: 'system', align: 'left', type: 'text' },
        { headerName: 'Payment Menthod', field: 'paymentMenthod', align: 'left', type: 'text' },
        { headerName: 'Debit/Credit', field: 'debit-credit', align: 'left', type: 'text' },
        { headerName: 'Statement Date', field: 'statementDate', align: 'left', type: 'text' },
        { headerName: 'Value Date', field: 'valueDate', align: 'left', type: 'text' },
        { headerName: 'Business Date', field: 'businessDate', align: 'left', type: 'text' },
        { headerName: 'Amount', field: 'amount', align: 'left', type: 'number' },
    ];
  return (
    <Box mt={4}>
        <Box ml={3} sx={{ fontSize: '16px' }}>
            <Grid container spacing={4}>
                <Grid item xs={5} ml={1}>
                    <Typography variant="body1" color="text.secondary" component="span">
                        File:{' '}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" component="span">
                        SPA_20230224.txt
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="body1" color="text.secondary" component="span">
                        Account No.:{' '}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" component="span">
                        0039007442
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="body1" color="text.secondary" component="span">
                        Bank:{' '}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" component="span">
                        DBS
                    </Typography>
                </Grid>
            </Grid>
        </Box>
        <Paper  sx={{ mt: 2, borderRadius: 1, p: 2 }}>
            <Box display="flex" alignItems="center" justifyContent={'space-between'} mb={2}>
                <Typography variant="h5" fontWeight="bold" ml={3}>
                    MT940
                </Typography>
                <Box display="flex" alignItems="center">
                    <IconButton color='primary'>
                        <SaveAltOutlinedIcon />
                    </IconButton>
                    <Button variant='outlined' color='inherit'>Download Report</Button>
                </Box>
            </Box>
            <Table
                columns={columns}
                data={[]}
                pagination
                rowsPerPage={5}
                minHeight={1}
            />
        </Paper>
    </Box>
  );
};

export default ExceptionsTab;