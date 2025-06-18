import { useEffect, useState } from 'react';
import { Box, Grid, Paper, type SelectChangeEvent } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, Dropdown, Table, TextArea, Typography } from '@core/components';
import type { ColumnConfig } from '@core/types';

import { comminglingFiles, comminglingGuestFiles, mockupDataSource } from '../configs/mockupDataSource';

interface File {
  id: string;
  displayName?: string;
  fileName?: string;
}

const Main = () => {
  const [sourceDataList, setSourceDataList] = useState<any[]>([]);
  const [sourceOptions, setSourceOptions] = useState<any[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [interfaceList, setInterfaceList] = useState<any[]>([]);
  const [selectedInterface, setSelectedInterface] = useState<number>(0);
  const [fileList, setFileList] = useState<any[]>([]);
  const [checkedFileList, setCheckedFileList] = useState<any[]>([]);
  const [uploadFolderFile, setUploadFolderFile] = useState<any[]>([]);

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
      setSelectedInterface(mockupDataSource[0].interfaces[0]?.id);
    }
  }, []);

  useEffect(() => {
    const filesWithId = (file: any[]) => {
      return file.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
    };

    setFileList(selectedInterface === 1 ? filesWithId(comminglingFiles) : filesWithId(comminglingGuestFiles));
  }, [selectedInterface]);

  const handleSourceChange = (event: SelectChangeEvent) => {
    const selected = event.target.value;
    const matched = sourceDataList.find((item) => item.name === selected);
    if (matched) {
      setSelectedSource(selected);
      setInterfaceList(matched.interfaces);
      setSelectedInterface(matched.interfaces[0]?.id || '');
    }
  };

  const handleInterfaceClick = (data: any) => {
    setSelectedInterface(data.id);
  };

  const onCheckboxChange = (file: File, checked: boolean) => {
    if (checked) {
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

  const interfaceColumns: ColumnConfig<File>[] = [
    { headerName: 'Interfaces', field: 'displayName', align: 'left', type: 'text' },
  ];

  const fileColumns: ColumnConfig<File>[] = [
    { headerName: 'File', field: 'fileName', align: 'left', type: 'textCheckbox' },
  ];

  const uploadFolderColumns: ColumnConfig<File>[] = [
    { headerName: 'Interfaces', field: 'fileName', align: 'left', type: 'text' },
  ];

  const commonButtonStyle = { border: 1, borderColor: 'grey.500', ml: 1 };

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
          label='Source'
          options={sourceOptions}
          value={selectedSource}
          onChange={handleSourceChange}
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
                {selectedInterface !== 0 && (
                  <Table<File>
                    data={interfaceList}
                    onRowClick={handleInterfaceClick}
                    columns={interfaceColumns}
                    backgroundHeader='#0286c2'
                    defaultRowIdSelected={selectedInterface}
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                <Table<File>
                  data={fileList}
                  columns={fileColumns}
                  onCheckboxChange={onCheckboxChange}
                  backgroundHeader='#0286c2'
                />
              </Grid>
            </Grid>
            <Box display='flex' justifyContent='flex-end' mt={1}>
              <Button sx={commonButtonStyle} variant='contained' color='inherit'>
                Reject
              </Button>
              <Button sx={commonButtonStyle} variant='contained' color='inherit'>
                Download
              </Button>
            </Box>
          </Grid>

          <Grid item xs={1} container direction='column' alignItems='center' justifyContent='center'>
            <Button
              sx={{ mb: 1, ...commonButtonStyle }}
              variant='contained'
              color='inherit'
              onClick={onMoveToUploadFolder}
              disabled={!(Object.keys(uploadFolderFile).length === 0 && Object.keys(checkedFileList).length === 1)}
            >
              <ArrowForwardIosIcon />
            </Button>
            <Button
              sx={{ mt: 1, ...commonButtonStyle }}
              variant='contained'
              color='inherit'
              onClick={onMoveBack}
              disabled={Object.keys(uploadFolderFile).length === 0}
            >
              <ArrowBackIosNewIcon />
            </Button>
          </Grid>

          <Grid item xs={4}>
            <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
              Upload Folder
            </Typography>
            <Table<File> data={uploadFolderFile} columns={uploadFolderColumns} backgroundHeader='#0286c2' />
            <Box display='flex' justifyContent='flex-end' mt={1}>
              <Button sx={commonButtonStyle} variant='contained' color='inherit'>
                Test Run
              </Button>
              <Button sx={commonButtonStyle} variant='contained' color='inherit'>
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
