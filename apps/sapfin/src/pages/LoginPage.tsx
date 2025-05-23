import { Box, Button, FormControlLabel, Paper, Switch, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import Header from '../components/layout/Header';

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'userName') {
      setUserName(value);
    } else {
      setPassword(value);
    }
    return;
  };

  const onClick = () => {
    console.log('login');
  };

  return (
    <Box>
      <Header />
      <Box
        sx={{
          height: '100vh',
          bgcolor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            border: '2px solid #0077b6',
            borderRadius: 2,
            p: 4,
            maxWidth: 400,
            width: '100%'
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}
          >
            Login Now
          </Typography>

          <Box
            sx={{
              width: 60,
              height: 3,
              bgcolor: '#0077b6',
              borderRadius: 2,
              mx: 'auto',
              mb: 4
            }}
          />

          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              name="userName"
              onChange={onChange}
              value={userName}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              name="password"
              onChange={onChange}
              value={password}
            />
            <FormControlLabel
              control={<Switch defaultChecked color="primary" />}
              label="Remember me"
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 4 }}
              disabled={!(userName && password)}
              onClick={onClick}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginPage;
