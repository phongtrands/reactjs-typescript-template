import { useEffect, useState } from 'react';
import { Box, Grid, type SelectChangeEvent } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, Dropdown, Table, TextArea, Typography } from '@core/components';
import type { ColumnConfig } from '@core/types';
import { Download, PlayArrow, RocketLaunch } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';

import PageContainer from '../components/PageContainer';
import { comminglingFiles, comminglingGuestFiles, mockupDataSource } from '../configs/mockupDataSource';
import type { ComminglingFile, Interface, Source } from '../types/sapfin.type';

const SapfinPage = () => {
  const [sourceDataList, setSourceDataList] = useState<Source[]>([]);
  const [sourceOptions, setSourceOptions] = useState<any[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [interfaceList, setInterfaceList] = useState<Interface[]>([]);
  const [selectedInterface, setSelectedInterface] = useState<string[]>(['1']);
  const [fileList, setFileList] = useState<ComminglingFile[]>([]);
  const [checkedFileList, setCheckedFileList] = useState<any[]>([]);
  const [uploadFolderFile, setUploadFolderFile] = useState<ComminglingFile[]>([]);

  useEffect(() => {
    const transformed = mockupDataSource.map((item) => ({
      value: item.name,
      label: item.displayName,
    }));
    setSourceOptions(transformed);
    setSourceDataList(mockupDataSource);
    if (mockupDataSource.length > 0) {
      setSelectedSource(mockupDataSource[0].name);
      setInterfaceList(mockupDataSource[0].interfaces);
      setSelectedInterface([mockupDataSource[0].interfaces[0]?.id]);
    }
  }, []);

  useEffect(() => {
    const filesWithId = (file: any[]) => {
      return file.map((item, index) => ({
        ...item,
        id: Math.floor(Math.random() * 1000000000),
      }));
    };

    setFileList(selectedInterface[0] === '1' ? filesWithId(comminglingFiles) : filesWithId(comminglingGuestFiles));
    setCheckedFileList([]);
    setUploadFolderFile([]);
  }, [selectedInterface]);

  const handleSourceChange = (event: SelectChangeEvent) => {
    const selected = event.target.value;
    const matched = sourceDataList.find((item) => item.name === selected);
    if (matched) {
      setSelectedSource(selected);
      setInterfaceList(matched.interfaces);
      setSelectedInterface([matched.interfaces[0]?.id]);
      setCheckedFileList([]);
      setUploadFolderFile([]);
    }
  };

  const handleInterfaceClick = (data: any) => {
    setSelectedInterface(data[0]);
  };

  const onCheckboxChange = (file: any, fieldName: string, value: boolean, event: any) => {
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

  const interfaceColumns: ColumnConfig<Interface>[] = [
    { headerName: 'Interfaces', field: 'displayName', align: 'left', type: 'text', iconType: 'folder' },
  ];

  const fileColumns: ColumnConfig<ComminglingFile>[] = [
    { headerName: 'File', field: 'fileName', align: 'left', type: 'textCheckbox', iconType: 'paper' },
  ];

  const uploadFolderColumns: ColumnConfig<ComminglingFile>[] = [
    { headerName: 'Interfaces', field: 'fileName', align: 'left', type: 'text', iconType: 'paper' },
  ];

  const enableRightButton = Object.keys(uploadFolderFile).length === 0 && Object.keys(checkedFileList).length === 1;
  const enableLeftButton = Object.keys(uploadFolderFile).length === 1;

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
          backgroundColor: '#3f85ac',
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
            backgroundColor: 'rgb(248, 246, 246)',
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
                  backgroundHeader='#3f85ac'
                  selected={selectedInterface}
                  onSelectionChange={handleInterfaceClick}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              <Table data={fileList} columns={fileColumns} onChange={onCheckboxChange} backgroundHeader='#3f85ac' />
            </Grid>
          </Grid>
          <Box display='flex' justifyContent='flex-end' mt={1}>
            <Button
              disabled={!enableRightButton}
              sx={commonButtonStyle}
              variant='contained'
              startIcon={<ClearIcon sx={{ color: enableRightButton ? 'red' : '#00000042' }} />}
            >
              Reject
            </Button>
            <Button
              disabled={!enableRightButton}
              sx={commonButtonStyle}
              variant='contained'
              startIcon={<Download sx={{ color: enableRightButton ? '#fff' : '#00000042' }} />}
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
          <Table data={uploadFolderFile} columns={uploadFolderColumns} backgroundHeader='#3f85ac' />
          <Box display='flex' justifyContent='flex-end' mt={1}>
            <Button
              disabled={!enableLeftButton}
              sx={commonButtonStyle}
              variant='contained'
              startIcon={<PlayArrow sx={{ color: enableLeftButton ? '#43a047' : '#00000042' }} />}
            >
              Test Run
            </Button>
            <Button
              disabled={!enableLeftButton}
              sx={commonButtonStyle}
              variant='contained'
              startIcon={<RocketLaunch sx={{ color: enableLeftButton ? '#fb8c00' : '#00000042' }} />}
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
        <TextArea
          value='qqqqqqqqqqqqqqqqqqqqqqqqq\nqqqqqqqqqqqqqqqqqqqqqqqqq'
          minRows={6}
          maxRows={6}
          placeholder='Maximum 4 rows'
          style={{ width: '100%', resize: 'none' }}
          disabled
        />
      </Box>
    </Box>
  );
};

export default PageContainer(SapfinPage);
