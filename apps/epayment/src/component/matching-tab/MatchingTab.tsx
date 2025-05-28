import { Box, IconButton, Paper, Typography } from '@mui/material';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import { CommonTable, SpButton } from '@libs/ui-shared';
import { ColumnConfig } from '@libs/types';

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
                    <SpButton variant='outlined' color='inherit'>Download SAPFIN</SpButton>
                </Box>
                <Box display="flex" alignItems="center">
                    <IconButton color='primary'>
                        <SaveAltOutlinedIcon />
                    </IconButton>
                    <SpButton variant='outlined' color='inherit'>Download Report(MT940)</SpButton>
                </Box>
                <Box display="flex" alignItems="center">
                    <IconButton color='primary'>
                        <SaveAltOutlinedIcon />
                    </IconButton>
                    <SpButton variant='outlined' color='inherit'>Download Report(Host)</SpButton>
                </Box>
            </Box>
        </Box>
        <Box mt={3}>
            <CommonTable
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
            <CommonTable
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