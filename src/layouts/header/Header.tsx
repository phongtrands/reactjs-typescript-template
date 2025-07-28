import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMsal } from '@azure/msal-react';

import logo from '../../assets/image/left-logo.png';
import { Button, Typography } from '../../components';

import { logout } from '~/redux';

const Header = () => {
  const { instance } = useMsal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const location = useLocation();
  const path = location.pathname;
  const lastSegment = path.split('/').filter(Boolean).pop();
  const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

  let bigTitle = 'SAPFIN';
  let smallTitle = 'Finance Interface';
  let destinationLink = `${BASE_URL}/epayment`;
  let destinationName = 'EPAYMENT';

  if (lastSegment === 'epayment') {
    bigTitle = 'ePayment Recon';
    smallTitle = 'Matching & Verification';
    destinationLink = `${BASE_URL}/sapfin`;
    destinationName = 'SAPFIN';
  }

  if (!lastSegment || lastSegment === 'login') {
    bigTitle = 'Login';
    smallTitle = ' ';
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    dispatch(logout());
    // await instance.logoutPopup({
    //   postLogoutRedirectUri: '/login',
    // });
    navigate('/login', { replace: true });
    handleClose();
  };

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
              backgroundColor: '#99daf8ff',
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
          gap={1}
          px={2}
          py={1}
          sx={{
            backgroundColor: '#055f8e',
            color: 'white',
            borderRadius: '8px',
          }}
        >
          <Typography fontWeight={600} fontSize='16px'>
            dh_ldap
          </Typography>

          <IconButton onClick={handleClick} sx={{ p: 0, ml: 1 }} disableRipple>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'white',
                color: '#055f8e',
              }}
            >
              <AccountCircleIcon />
            </Avatar>
            <ArrowDropDownIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ mt: 1, ml: 1 }}>
          <MenuItem sx={{ fontWeight: 600 }} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
