import { Box, Divider, Grid, Typography } from '@mui/material';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import { enqueueSnackbar } from 'notistack';

import { Button, Table } from '~/components';
import { EPAYMENT_TAB, EPayMentColumns } from '~/configs';
import { changeTab, openPopup } from '~/redux';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import type { EPayment } from '~/types';
import { confirmFile, exportCSVFile } from '~/services';

const MatchingTab: React.FC = () => {
  const dispatch = useAppDispatch();
  const ePaymentData: EPayment[] = useAppSelector((state) => state.epayment.matching.matchingEPayment);
  const nonEPaymentData: EPayment[] = useAppSelector((state) => state.epayment.matching.matchingNonEPayment);
  const fileName: string = useAppSelector((state) => state.epayment.matching.file);
  const accountNo: string = useAppSelector((state) => state.epayment.matching.accountNo);
  const bank: string = useAppSelector((state) => state.epayment.matching.bank);

  const onOkConfirm = async () => {
    const response = await confirmFile();
    enqueueSnackbar('File confirm successfully ', { variant: 'success' });
  };

  const handleConfirm = () => {
    dispatch(
      openPopup({
        title: 'Confirm File Submission',
        content: 'Press OK to confirm ?',
        onOk: onOkConfirm,
      }),
    );
  };

  const handleDowload = async (type: string) => {
    const response = await exportCSVFile(fileName);
    enqueueSnackbar('File download successfully ', { variant: 'success' });
  };
  return (
    <Box sx={{ mt: 3 }}>
      <Box ml={2} sx={{ fontSize: '16px' }}>
        <Grid container spacing={4}>
          <Grid item xs={3} ml={1}>
            <Typography variant='body1' color='text.secondary' component='span'>
              File:{' '}
            </Typography>
            <Typography variant='body1' fontWeight='bold' component='span'>
              {fileName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='body1' color='text.secondary' component='span'>
              Account No.:{' '}
            </Typography>
            <Typography variant='body1' fontWeight='bold' component='span'>
              {accountNo}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='body1' color='text.secondary' component='span'>
              Bank:{' '}
            </Typography>
            <Typography variant='body1' fontWeight='bold' component='span'>
              {bank}
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
              <Button
                variant='outlined'
                color='inherit'
                startIcon={<SaveAltOutlinedIcon />}
                onClick={() => handleDowload('sapfin')}
              >
                Download SAPFIN
              </Button>
            </Box>
            <Box display='flex' alignItems='center'>
              <Button
                variant='outlined'
                color='inherit'
                startIcon={<SaveAltOutlinedIcon />}
                onClick={() => handleDowload('mt940')}
              >
                Download Report (MT940)
              </Button>
            </Box>
            <Box display='flex' alignItems='center'>
              <Button
                variant='outlined'
                color='inherit'
                startIcon={<SaveAltOutlinedIcon />}
                onClick={() => handleDowload('hostFile')}
              >
                Download Report (Host)
              </Button>
            </Box>
          </Box>
        </Box>
        <Box mt={3} mb={2}>
          <Table
            columns={EPayMentColumns}
            data={ePaymentData}
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
            columns={EPayMentColumns}
            data={nonEPaymentData}
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
        <Button variant='contained' sx={{ width: 150, ml: 3 }} onClick={handleConfirm}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default MatchingTab;
