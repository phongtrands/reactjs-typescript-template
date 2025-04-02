import { Button, Paper, TextField, Typography } from '@mui/material';
// import logo from '../../assets/image/singpools-logo.png';
import { ChangeEvent, useState } from 'react';

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
    <div className='container'>
      <Paper elevation={3} className='login-form'>
        <div>
          {/* <img src={logo} alt='Logo' className='logo' /> */}
        </div>
        <Typography className='login-title-text mt-3' variant='h5' component='h2' gutterBottom>
          DATA HUB LOGIN
        </Typography>
        <form className='ms-3 me-3'>
          <div className='form-group'>
            <div className='d-flex justify-content-start'>
              <span>User Name:</span>
            </div>
            <TextField
              placeholder='Enter your username'
              fullWidth
              margin='normal'
              value={userName}
              onChange={onChange}
              name='userName'
            />
          </div>
          <div className='form-group'>
            <div className='d-flex justify-content-start'>
              <span>Password:</span>
            </div>
            <TextField
              placeholder='Enter your password'
              fullWidth
              margin='normal'
              value={password}
              onChange={onChange}
              name='password'
            />
          </div>
          <Button className='login-btn' variant='contained' color='primary' fullWidth onClick={onClick}>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginPage;