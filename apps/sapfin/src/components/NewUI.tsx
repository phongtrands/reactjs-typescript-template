import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import {
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  Download as DownloadIcon,
  Block as RejectIcon,
  PlayArrow as TestRunIcon,
  RocketLaunch as EstRunIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

export default function NewUI() {
  const initialFiles = ['Commingling_20181022(01).csv', 'Commingling_20181022(02).csv', 'Commingling_20181022(03).csv'];

  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const toggleFileSelection = (file: string) => {
    setSelectedFiles((prev) => (prev.includes(file) ? prev.filter((f) => f !== file) : [...prev, file]));
  };

  const transferFiles = () => {
    setUploadedFiles((prev) => [...prev, ...selectedFiles.filter((f) => !prev.includes(f))]);
    setSelectedFiles([]);
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
        <Box display='flex' alignItems='center'>
          <img src='/logo.png' alt='logo' style={{ height: 40, marginRight: 8 }} />
          <Typography variant='h6' fontWeight='bold'>
            Finance Interface
          </Typography>
        </Box>
        <Typography>
          Hello <strong>dh_ldap</strong> | Logout
        </Typography>
      </Box>

      {/* Search and Source */}
      <Box display='flex' gap={2} mb={2}>
        <TextField
          placeholder='Search Interface'
          variant='outlined'
          size='small'
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Select size='small' value='BMCS' sx={{ width: 150 }}>
          <MenuItem value='BMCS'>BMCS</MenuItem>
          <MenuItem value='XYZ'>XYZ</MenuItem>
        </Select>
      </Box>

      {/* Main Content */}
      <Box display='flex' gap={2}>
        {/* Preview Folder */}
        <Card sx={{ flex: 1, p: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant='subtitle1' fontWeight='bold' mb={1}>
            Preview Folder
          </Typography>
          <List dense>
            {['Commingling', 'Commingling as a Guest', 'Expired Bet', 'Paid Bet', 'Tote Cheque'].map((folder, i) => (
              <ListItem key={i} button selected={folder === 'Commingling as a Guest'}>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={folder} />
              </ListItem>
            ))}
          </List>
        </Card>

        {/* File List */}
        <Card sx={{ flex: 1, p: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant='subtitle1' fontWeight='bold' mb={1}>
            File
          </Typography>
          <List dense>
            {initialFiles.map((file, i) => (
              <ListItem
                key={i}
                secondaryAction={
                  <Checkbox checked={selectedFiles.includes(file)} onChange={() => toggleFileSelection(file)} />
                }
              >
                <ListItemIcon>
                  <FileIcon />
                </ListItemIcon>
                <ListItemText primary={file} />
              </ListItem>
            ))}
          </List>
          <Box display='flex' justifyContent='flex-end' mt={1}>
            <Button variant='outlined' size='small' onClick={transferFiles}>
              &gt;&gt;
            </Button>
          </Box>
          {/* Buttons under File */}
          <Box display='flex' gap={1} mt={2}>
            <Button variant='outlined' startIcon={<RejectIcon />}>
              Reject
            </Button>
            <Button variant='outlined' startIcon={<DownloadIcon />}>
              Download
            </Button>
          </Box>
        </Card>

        {/* Upload Folder */}
        <Card sx={{ flex: 1, p: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant='subtitle1' fontWeight='bold' mb={1}>
            Upload Folder
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary='Interfaces' />
            </ListItem>
            {uploadedFiles.map((file, i) => (
              <ListItem key={i}>
                <ListItemIcon>
                  <FileIcon />
                </ListItemIcon>
                <ListItemText primary={file} />
              </ListItem>
            ))}
          </List>

          {/* Buttons under Upload */}
          <Box display='flex' gap={1} mt={2}>
            <Button variant='outlined' startIcon={<EstRunIcon />}>
              Est Run
            </Button>
            <Button variant='contained' color='primary' startIcon={<TestRunIcon />}>
              Test Run
            </Button>
          </Box>
        </Card>
      </Box>

      {/* SAP Response */}
      <Box mt={3}>
        <Typography variant='subtitle1' fontWeight='bold'>
          SAP Response
        </Typography>
        <TextField fullWidth size='small' value='qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq' />
      </Box>
    </Box>
  );
}
