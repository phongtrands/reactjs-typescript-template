import { Box, Grid, Typography } from '@mui/material';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';

import { Button, Table } from '~/components';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { changeTab, updateExceptions } from '~/redux';
import { EPAYMENT_TAB, exceptionsHostFileColumns, exceptionsMT940Columns, EXPORT_TYPE } from '~/configs';
import type { ExceptionsHostFile, ExceptionsMT940, Search } from '~/types';
import { exportCSVFile, getExceptionHostFileTable, getExceptionMT940Table } from '~/services';

const ExceptionsTab: React.FC = () => {
  const dispatch = useAppDispatch();
  const typeFile: string = useAppSelector((state) => state.epayment.typeFile);
  const mt940Data: ExceptionsMT940[] = useAppSelector((state) => state.epayment.exceptions.exceptionMT940);
  const hostFileData: ExceptionsHostFile[] = useAppSelector((state) => state.epayment.exceptions.exceptionHostFile);
  const fileName: string = useAppSelector((state) => state.epayment.exceptions.file);
  const accountNo: string = useAppSelector((state) => state.epayment.exceptions.accountNo);
  const bank: string = useAppSelector((state) => state.epayment.exceptions.bank);
  const selectedFile: string = useAppSelector((state) => state.epayment.selectedFile);
  const searchData: Search = useAppSelector((state) => state.epayment.summary.search);
  const isMT940: boolean = typeFile === 'mt940';

  useEffect(() => {
    if (selectedFile !== fileName) {
      const fetchData = async () => {
        const [eMT940, eHostFile] = await Promise.all([
          getExceptionMT940Table(selectedFile, searchData.accountNo),
          getExceptionHostFileTable(selectedFile, searchData.accountNo),
        ]);
        dispatch(
          updateExceptions({
            file: selectedFile,
            accountNo: searchData.accountNo,
            bank: searchData.bankName,
            exceptionMT940: eMT940,
            exceptionHostFile: eHostFile,
          }),
        );
      };
      fetchData();
    }
  }, []);

  const handleDowload = async () => {
    const exportType: string = isMT940 ? EXPORT_TYPE.EXCEPTION_MT940_FILE : EXPORT_TYPE.EXCEPTION_HOST_FILE;
    const response = await exportCSVFile(exportType, accountNo, fileName);
    if (response) {
      enqueueSnackbar('File download successfully ', { variant: 'success' });
    }
  };

  return (
    <Box mt={4}>
      <Box ml={3} sx={{ fontSize: '16px' }}>
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
          mt: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box display='flex' alignItems='center' justifyContent={'space-between'} mb={2}>
          <Typography variant='h5' fontWeight='bold' ml={3}>
            {isMT940 ? 'MT940' : 'HostFile'}
          </Typography>
          <Box display='flex' alignItems='center'>
            <Button
              variant='outlined'
              color='inherit'
              startIcon={<SaveAltOutlinedIcon />}
              onClick={() => handleDowload()}
            >
              Download Report
            </Button>
          </Box>
        </Box>
        {isMT940 ? (
          <Table
            columns={exceptionsMT940Columns}
            data={mt940Data}
            pagination
            rowsPerPage={5}
            minHeight={1}
            backgroundHeader='#f2f2f2'
          />
        ) : (
          <Table
            columns={exceptionsHostFileColumns}
            data={hostFileData}
            pagination
            rowsPerPage={5}
            minHeight={1}
            backgroundHeader='#f2f2f2'
          />
        )}
      </Box>
      <Box display='flex' justifyContent='flex-end' mt={2}>
        <Button variant='contained' sx={{ width: 150 }} onClick={() => dispatch(changeTab(EPAYMENT_TAB.SUMMARY))}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default ExceptionsTab;
