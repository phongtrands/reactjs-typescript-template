/* eslint-disable no-duplicate-imports */
import type { SelectChangeEvent } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Download, PlayArrow, RocketLaunch } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import { useSnackbar } from 'notistack';

import type { InterfaceFile, Interface, Source, ResponseAPIType, SourceOptionsType } from '~/types';
import PageContainer from '~/layouts/PageContainer';
import { Button, Dropdown, Table, TextArea, Typography } from '~/components';
import { useAppDispatch } from '~/redux/hook';
import { openPopup } from '~/redux';
import { downloadFile, getDataSources, getFiles, loadings, rejectFile, validations } from '~/services';
import { arrayToMultilineString } from '~/utils';
import { fileColumns, interfaceColumns, uploadFolderColumns } from '~/configs';

const SapfinPage = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [sourceDataList, setSourceDataList] = useState<Source[]>([]);
  const [sourceOptions, setSourceOptions] = useState<SourceOptionsType[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [interfaceList, setInterfaceList] = useState<Interface[]>([]);
  const [selectedInterface, setSelectedInterface] = useState<string[]>(['1']);
  const [fileList, setFileList] = useState<InterfaceFile[]>([]);
  const [checkedFileList, setCheckedFileList] = useState<InterfaceFile[]>([]);
  const [uploadFolderFile, setUploadFolderFile] = useState<InterfaceFile[]>([]);
  const [sapResponse, setSAPResponse] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const dataSource = await getDataSources();
      const transformed = dataSource.map((item) => ({
        value: item.name,
        label: item.displayName,
      }));
      setSourceOptions(transformed);
      setSourceDataList(dataSource);
      if (dataSource.length > 0) {
        setSelectedSource(dataSource[0].name);
        setInterfaceList(dataSource[0].interfaces);
        setSelectedInterface([dataSource[0].interfaces[0]?.id]);
        await getFiles(dataSource[0].name, dataSource[0].interfaces[0]?.name).then((file) => {
          setFileList(file);
        });
      }
    };
    fetchData();
  }, []);

  const handleSourceChange = async (event: SelectChangeEvent) => {
    const selected = event.target.value;
    const matched = sourceDataList.find((item) => item.name === selected);
    if (matched) {
      setSelectedSource(selected);
      setInterfaceList(matched.interfaces);
      setSelectedInterface([matched.interfaces[0]?.id]);
      await getFiles(matched.name, matched.interfaces[0]?.name).then((file) => {
        setFileList(file);
      });
      setCheckedFileList([]);
      setUploadFolderFile([]);
    }
  };

  const handleInterfaceClick = async (selected: (string | number)[]) => {
    setSelectedInterface([String(selected[0])]);
    if (selectedInterface[0] !== String(selected[0])) {
      const matchedInterface = interfaceList.find((item) => item.id === String(selected[0]));
      if (matchedInterface) {
        await getFiles(selectedSource, matchedInterface.name).then((files) => {
          setFileList(files);
          setCheckedFileList([]);
          setUploadFolderFile([]);
        });
      }
    }
  };

  const onCheckboxChange = (file: InterfaceFile, value: boolean) => {
    if (value) {
      setCheckedFileList((prev) => [...prev, file]);
    } else {
      setCheckedFileList((prev) => prev.filter((f) => f.id !== file.id));
    }
  };

  const onMoveToUploadFolder = () => {
    if (Object.keys(uploadFolderFile).length === 0 && Object.keys(checkedFileList).length === 1) {
      setUploadFolderFile(checkedFileList);
      setFileList((prev) => prev.filter((f) => f.id !== checkedFileList[0].id));
      setCheckedFileList([]);
    }
  };

  const onMoveBack = () => {
    if (Object.keys(uploadFolderFile).length === 1) {
      const [file] = uploadFolderFile;
      setFileList((prev) => [...prev, file]);
      setCheckedFileList((prev) => prev.filter((f) => f.id !== file.id));
      setUploadFolderFile([]);
    }
  };

  const handleOnOkReject = async () => {
    const success: boolean = await rejectFile(checkedFileList);
    if (success) {
      const newFileList = fileList.filter((a) => !checkedFileList.some((b) => b.id === a.id));
      setFileList(newFileList);
      setCheckedFileList([]);
      const matched = sourceDataList.find((item) => item.name === selectedSource);
      if (matched) {
        await getFiles(matched.name, matched.interfaces[0]?.name).then((file) => {
          setFileList(file);
        });
      }
      enqueueSnackbar('Reject data successfully', { variant: 'success' });
      return;
    }
    enqueueSnackbar('Reject data failed', { variant: 'error' });
    return;
  };

  const handleReject = async () => {
    dispatch(
      openPopup({
        title: 'Files Reject Confirmation',
        content: 'Do you want to reject these files ?',
        onOk: handleOnOkReject,
      }),
    );
  };

  const handleDownload = async () => {
    const response = await downloadFile(checkedFileList);
    if (response) {
      enqueueSnackbar('Download data successfully', { variant: 'success' });
      return;
    }
    enqueueSnackbar('Download data failed', { variant: 'error' });
    return;
  };

  const handleTestRun = async () => {
    const { success, notes }: ResponseAPIType = await validations(uploadFolderFile[0]);
    if (notes.length > 0) {
      setSAPResponse(arrayToMultilineString(notes));
    }
    if (success) {
      enqueueSnackbar('Test run data completed with no error', { variant: 'success' });
    } else {
      enqueueSnackbar('Test run data completed with error', { variant: 'warning' });
    }
    return;
  };

  const handleOnOkActualRun = async () => {
    const { success, notes }: ResponseAPIType = await loadings(uploadFolderFile[0]);
    if (notes.length > 0) {
      setSAPResponse(arrayToMultilineString(notes));
    }
    if (success) {
      enqueueSnackbar('Actual run data completed with no error', { variant: 'success' });
    } else {
      enqueueSnackbar('Actual run data completed with error', { variant: 'warning' });
    }
    return;
  };

  const handleActualRun = () => {
    dispatch(
      openPopup({
        title: 'File Run Confirmation',
        content: 'Do you want to actual run these files ?',
        onOk: handleOnOkActualRun,
      }),
    );
  };

  const enableRightButton = Object.keys(uploadFolderFile).length === 0 && Object.keys(checkedFileList).length === 1;
  const enableLeftButton = Object.keys(uploadFolderFile).length === 1;
  const enableFileButton = Object.keys(checkedFileList).length >= 1;

  const commonButtonStyle = {
    ml: 1,
    py: 1.5,
    px: 3,
  };

  return (
    <Box p={3}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 2,
          border: '1px solid rgba(0, 0, 0, 0.12)',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          width: 'fit-content',
          px: 1.5,
          py: 1.5,
          backgroundColor: 'white',
        }}
      >
        <Typography variant='body1' sx={{ mr: 2, fontWeight: 'bold' }}>
          Source
        </Typography>

        <Dropdown
          options={sourceOptions}
          value={selectedSource}
          onChange={handleSourceChange}
          styleSelect={{
            width: 160,
            border: 'none',
            outline: 'none',
            padding: '0',
            borderRadius: 2,
            height: '40px',
          }}
        />
      </Box>
      <Grid container sx={{ mt: 2, borderRadius: 2 }}>
        <Grid
          item
          xs={7}
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: '#fff',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Typography variant='h6' fontWeight='bold' gutterBottom>
            Preview Folder
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {selectedInterface.length !== 0 && (
                <Table
                  data={interfaceList}
                  columns={interfaceColumns}
                  selected={selectedInterface}
                  onSelectionChange={handleInterfaceClick}
                  backgroundHeader='#f2f2f2'
                />
              )}
            </Grid>
            <Grid item xs={6}>
              <Table data={fileList} columns={fileColumns} onChange={onCheckboxChange} backgroundHeader='#f2f2f2' />
            </Grid>
          </Grid>
          <Box display='flex' justifyContent='flex-end' mt={1}>
            <Button
              disabled={!enableFileButton}
              sx={commonButtonStyle}
              variant='contained'
              startIcon={<ClearIcon sx={{ color: enableFileButton ? '#fff' : '#00000042' }} />}
              onClick={handleReject}
            >
              Reject
            </Button>
            <Button
              disabled={!enableFileButton}
              sx={commonButtonStyle}
              variant='contained'
              startIcon={<Download sx={{ color: enableFileButton ? '#fff' : '#00000042' }} />}
              onClick={handleDownload}
            >
              Download
            </Button>
          </Box>
        </Grid>

        <Grid item xs={1} container direction='column' alignItems='center' justifyContent='center'>
          <Button sx={{ mb: 1 }} variant='contained' onClick={onMoveToUploadFolder} disabled={!enableRightButton}>
            <ArrowForwardIosIcon />
          </Button>
          <Button sx={{ mt: 1 }} variant='contained' onClick={onMoveBack} disabled={!enableLeftButton}>
            <ArrowBackIosNewIcon />
          </Button>
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: '#fff',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Typography variant='h6' fontWeight='bold' gutterBottom>
            Upload Folder
          </Typography>
          <Table data={uploadFolderFile} columns={uploadFolderColumns} backgroundHeader='#f2f2f2' />
          <Box display='flex' justifyContent='flex-end' mt={1}>
            <Button
              disabled={!enableLeftButton}
              sx={commonButtonStyle}
              variant='contained'
              startIcon={<PlayArrow sx={{ color: enableLeftButton ? '#fff' : '#00000042' }} />}
              onClick={handleTestRun}
            >
              Test Run
            </Button>
            <Button
              disabled={!enableLeftButton}
              sx={commonButtonStyle}
              variant='contained'
              startIcon={<RocketLaunch sx={{ color: enableLeftButton ? '#fff' : '#00000042' }} />}
              onClick={handleActualRun}
            >
              Actual Run
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: '#fff',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          mt: 3,
        }}
      >
        <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
          SAP Response
        </Typography>
        <TextArea value={sapResponse} minRows={6} maxRows={6} style={{ width: '100%', resize: 'none' }} disabled />
      </Box>
    </Box>
  );
};

const WrappedSapfinPage = PageContainer(SapfinPage);
export default WrappedSapfinPage;
