import { Box, Button, FormControlLabel, Paper, Switch, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Header } from '../layouts';

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
    <div>
      <Header></Header>
      <div className="login-page d-flex justify-content-center align-items-center">
        <Paper elevation={3} className="login-box p-4">
          <Typography variant="h5" className="text-center fw-bold mb-2">
            Login Now
          </Typography>
          <div className="underline mx-auto mb-4"></div>

          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              name='userName'
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
              name='password'
              onChange={onChange}
              value={password}
            />
            <FormControlLabel
              control={<Switch defaultChecked color="primary" />}
              label="Remember me"
              className="mt-2"
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
              disabled={ !( userName && password ) }
              onClick={onClick}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default LoginPage;
