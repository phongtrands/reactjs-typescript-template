import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, FormControl, Grid, InputLabel, Paper, TextareaAutosize, Typography } from '@mui/material';
import { DefaultTable, Dropdown } from '@shared/components';

const Main = () => {

  return (
    <Box p={3}>
        <Box
        sx={{
            bgcolor: '#f8f9fa',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}
        >
        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            bgcolor: '#005b84',
            border: '1px solid black',
            borderRadius: 1
            }}
        >
            <InputLabel sx={{ fontWeight: 'bold', color: '#fff' }}>
            Source
            </InputLabel>
            <Dropdown/>
        </Box>
        </Box>

      <Paper elevation={2} sx={{ mt: 2, borderRadius: 2, p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Preview Folder
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <DefaultTable />
              </Grid>
              <Grid item xs={6}>
                <DefaultTable isCheckBox={true} />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Button
                sx={{ border: 1, borderColor: 'grey.500', ml: 1 }}
                variant="contained"
                color="inherit"
              >
                Reject
              </Button>
              <Button
                sx={{ border: 1, borderColor: 'grey.500', ml: 1 }}
                variant="contained"
                color="inherit"
              >
                Download
              </Button>
            </Box>
          </Grid>

          <Grid item xs={1} container direction="column" alignItems="center" justifyContent="center">
            <Button
              sx={{ mb: 1, border: 1, borderColor: 'grey.500' }}
              variant="contained"
              color="inherit"
              startIcon={<ArrowForwardIosIcon />}
            />
            <Button
              sx={{ mt: 1, border: 1, borderColor: 'grey.500' }}
              variant="contained"
              color="inherit"
              startIcon={<ArrowBackIosNewIcon />}
            />
          </Grid>

          <Grid item xs={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Upload Folder
            </Typography>
            <DefaultTable />
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Button
                sx={{ border: 1, borderColor: 'grey.500', ml: 1 }}
                variant="contained"
                color="inherit"
              >
                Test Run
              </Button>
              <Button
                sx={{ border: 1, borderColor: 'grey.500', ml: 1 }}
                variant="contained"
                color="inherit"
              >
                Actual Run
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            SAP Response
          </Typography>
          <TextareaAutosize
            style={{ width: '100%', padding: '8px' }}
            minRows={4}
            maxRows={4}
            placeholder="Maximum 4 rows"
            defaultValue={'qqqqqqqqqqqqqqqqqqqqqqqqq\nqqqqqqqqqqqqqqqqqqqqqqqqq'}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Main;