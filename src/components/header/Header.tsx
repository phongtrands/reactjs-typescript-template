import { Avatar, Box, Menu, MenuItem } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import logo from '../../assets/image/left-logo.png';
import { Button, Typography } from '..';

const Header = () => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const location = useLocation();
  console.log('location', location);
  const path = location.pathname;
  const lastSegment = path.split('/').filter(Boolean).pop();

  let bigTitle = 'SAPFIN';
  let smallTitle = 'Finance Interface';
  let destinationLink = 'http://localhost:4200/epayment';
  let destinationName = 'EPAYMENT';

  if (lastSegment === 'epayment') {
    bigTitle = 'ePayment Recon';
    smallTitle = 'Matching & Verification';
    destinationLink = 'http://localhost:4200/sapfin';
    destinationName = 'SAPFIN';
  }

  // const logoutHandler = () => {
  //   dispatch(logout());
  //   navigate('/', { replace: true });
  // };

  return (
    // <Box component='header'>
    //   <AppBar position='static' sx={{ backgroundColor: '#055f8e' }}>
    //     <Toolbar
    //       sx={{
    //         position: 'relative',
    //         minHeight: '60px',
    //       }}
    //       disableGutters
    //     >
    //       <Box component='img' src={logo} alt='Logo' sx={{ width: 110, height: 85, mr: 2 }} />

    //       <Typography
    //         variant='h4'
    //         sx={{
    //           position: 'absolute',
    //           left: '50%',
    //           transform: 'translateX(-50%)',
    //           color: '#ffffff',
    //           fontWeight: 400,
    //         }}
    //       >
    //         Finance Interface
    //       </Typography>
    //     </Toolbar>
    //   </AppBar>

    //   <Box
    //     sx={{
    //       backgroundColor: '#0885bb',
    //       display: 'flex',
    //       justifyContent: 'space-between',
    //       alignItems: 'center',
    //       px: 2,
    //       py: 0.5,
    //     }}
    //   >
    //     <Typography variant='h6' sx={{ color: 'white' }}>
    //       * SAP Portal
    //     </Typography>
    //     <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
    //       <Typography variant='h6'>Hello&nbsp;</Typography>
    //       <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
    //         dh_ldap
    //       </Typography>
    //       <Typography variant='h6' sx={{ mx: 1 }}>
    //         |
    //       </Typography>
    //       <Button
    //         variant='text'
    //         sx={{ color: 'white', fontWeight: 'bold', textTransform: 'none' }}
    //         onClick={logoutHandler}
    //       >
    //         <Typography variant='h6'>Logout</Typography>
    //       </Button>
    //     </Box>
    //   </Box>
    // </Box>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        py: 2,
        // backgroundColor: '#055f8e',
        background: 'linear-gradient(to right, #07699c, #055f8e)',
        color: '#fff',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box component='img' src={logo} alt='Logo' sx={{ width: 100, height: 75, mr: 2 }} />
        <Box>
          <Typography variant='h4' sx={{ fontWeight: 600 }}>
            {bigTitle}
          </Typography>
          <Typography variant='h6' sx={{ fontWeight: 400 }}>
            {smallTitle}
          </Typography>
        </Box>
      </Box>

      <Box display='flex' alignItems='center' gap={2}>
        <Button
          variant='contained'
          sx={{
            // backgroundColor: '#2563eb',
            backgroundColor: 'white',
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 2.5,
            '&:hover': {
              backgroundColor: '#0ea5e9',
              boxShadow: 2,
            },
            color: '#055f8e',
          }}
          startIcon={<OpenInNewIcon />}
          onClick={() => window.open(destinationLink, '_blank')}
        >
          Go to {destinationName}
        </Button>

        <Box
          display='flex'
          alignItems='center'
          gap={1.5}
          px={2}
          py={1}
          sx={{
            backgroundColor: '#055f8e',
            color: 'white',
            cursor: 'pointer',
          }}
          // onClick={handleOpenMenu}
        >
          <Box>
            <Typography fontWeight={600} fontSize='16px'>
              dh_ldap
            </Typography>
          </Box>

          <Avatar sx={{ width: 32, height: 32, bgcolor: 'white', color: '#055f8e' }}>
            <AccountCircleIcon />
          </Avatar>
          <ArrowDropDownIcon />
        </Box>

        {/* Dropdown Menu (optional) */}
        <Menu open={false}>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
