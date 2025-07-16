import { Avatar, Box, Menu, MenuItem } from '@mui/material';
import { useLocation } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import logo from '../../assets/image/left-logo.png';
import { Button, Typography } from '../../components';

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const lastSegment = path.split('/').filter(Boolean).pop();

  let bigTitle = 'SAPFIN';
  let smallTitle = 'Finance Interface';
  let destinationLink = 'http://localhost:3000/epayment';
  let destinationName = 'EPAYMENT';

  if (lastSegment === 'epayment') {
    bigTitle = 'ePayment Recon';
    smallTitle = 'Matching & Verification';
    destinationLink = 'http://localhost:3000/sapfin';
    destinationName = 'SAPFIN';
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        py: 2,
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
        <Menu open={false}>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
