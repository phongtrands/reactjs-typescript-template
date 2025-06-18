import { AppBar, Box, Toolbar } from '@mui/material';
import { Button, Typography } from '@core/components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@core/helpers';
import { logout } from '@libs/auth';

import logo from '../assets/image/left-logo.png';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <Box component='header'>
      <AppBar position='static' sx={{ backgroundColor: '#055f8e' }}>
        <Toolbar
          sx={{
            position: 'relative',
            minHeight: '60px',
          }}
          disableGutters
        >
          <Box component='img' src={logo} alt='Logo' sx={{ width: 110, height: 85, mr: 2 }} />

          <Typography
            variant='h4'
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#ffffff',
              fontWeight: 400,
            }}
          >
            Finance Interface
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          backgroundColor: '#0885bb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 0.5,
        }}
      >
        <Typography variant='h6' sx={{ color: 'white' }}>
          * SAP Portal
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
          <Typography variant='h6'>Hello&nbsp;</Typography>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            dh_ldap
          </Typography>
          <Typography variant='h6' sx={{ mx: 1 }}>
            |
          </Typography>
          <Button
            variant='text'
            sx={{ color: 'white', fontWeight: 'bold', textTransform: 'none' }}
            onClick={logoutHandler}
          >
            <Typography variant='h6'>Logout</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
