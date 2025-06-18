import { AppBar, Box, Toolbar } from '@mui/material';
import { Button, Typography } from '@core/components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@core/helpers';
import { logout } from '@libs/auth';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <Box component='header'>
      <AppBar position='static' sx={{ backgroundColor: '#005B85' }}>
        <Toolbar
          sx={{
            position: 'relative',
            minHeight: '60px',
            px: 2,
          }}
        >
          {/* <Box
            component="img"
            src=""
            alt="Logo"
            sx={{ width: 40, height: 40, mr: 2 }}
          /> */}

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
          backgroundColor: '#0286c2',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 0.5,
        }}
      >
        <Typography variant='body2' sx={{ color: 'white', fontStyle: 'italic' }}>
          * SAP Portal
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
          <Typography variant='body2'>Hello&nbsp;</Typography>
          <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
            dh_ldap
          </Typography>
          <Typography variant='body2' sx={{ mx: 1 }}>
            |
          </Typography>
          <Button
            variant='text'
            sx={{ color: 'white', fontWeight: 'bold', textTransform: 'none' }}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
