import { Box, IconButton, Paper, Typography } from '@mui/material';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import { Table, Button } from '@core/components';
import { ColumnConfig } from '@core/types';

const MatchingTab: React.FC = () => {

    const columns: ColumnConfig<never>[] = [
        { headerName: 'Payment Method', field: 'paymentMethod', align: 'left', type: 'text' },
        { headerName: 'Statement Date', field: 'statementDate', align: 'left', type: 'text' },
        { headerName: 'Value Date', field: 'valueDate', align: 'left', type: 'text' },
        { headerName: 'Amount', field: 'amount', align: 'right', type: 'number' },
    ];
  return (
    <Paper sx={{ mt: 2, borderRadius: 1, p: 2 }}>
        <Box display="flex" alignItems="center" justifyContent={'space-between'} mb={2}>
            <Typography variant="h5" fontWeight="bold" ml={3}>
                ePayment
            </Typography>
            <Box display="flex" gap={2}>
                <Box display="flex" alignItems="center">
                    <IconButton color='primary'>
                        <SaveAltOutlinedIcon />
                    </IconButton>
                    <Button variant='outlined' color='inherit'>Download SAPFIN</Button>
                </Box>
                <Box display="flex" alignItems="center">
                    <IconButton color='primary'>
                        <SaveAltOutlinedIcon />
                    </IconButton>
                    <Button variant='outlined' color='inherit'>Download Report(MT940)</Button>
                </Box>
                <Box display="flex" alignItems="center">
                    <IconButton color='primary'>
                        <SaveAltOutlinedIcon />
                    </IconButton>
                    <Button variant='outlined' color='inherit'>Download Report(Host)</Button>
                </Box>
            </Box>
        </Box>
        <Box mt={3}>
            <Table
            columns={columns}
            data={[]}
            pagination
            rowsPerPage={5}
            minHeight={1}
            />
        </Box>

        <Box mt={2}>
            <Typography variant="h5" fontWeight="bold" mb={2} ml={3}>
                Non ePayment
            </Typography>
            <Table
            columns={columns}
            data={[]}
            pagination
            rowsPerPage={5}
            minHeight={1}
            />
        </Box>
    </Paper>
  );
};

export default MatchingTab;