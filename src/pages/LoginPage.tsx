import { useMsal } from '@azure/msal-react';
import { Box, Container, Paper } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { useEffect } from 'react';

import { Button, Typography } from '~/components';
import { loginRequest } from '~/configs/auth.config';
import PageContainer from '~/layouts/PageContainer';
import { login } from '~/redux';
import { useAppSelector } from '~/redux/hook';

const LoginPage: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const { instance } = useMsal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (token) {
      navigate('/epayment', { replace: true });
    }
  }, [token]);

  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      const account = loginResponse.account;
      const accessToken = loginResponse.accessToken;
      if (accessToken) {
        dispatch(login('accessToken'));
        navigate(from, { replace: true });
      }
    } catch (error) {
      dispatch(login('accessToken'));
      navigate(from, { replace: true });
      enqueueSnackbar(`Login failed: ${error}`, { variant: 'error' });
    }
  };

  return (
    <Container maxWidth='sm'>
      <Box height='70vh' display='flex' alignItems='center' justifyContent='center'>
        <Paper elevation={3} sx={{ p: 5, width: '100%', textAlign: 'center' }}>
          <Typography variant='h4' fontWeight='bold' mb={3}>
            Welcome to the Portal
          </Typography>
          <Typography variant='body1' mb={4}>
            Please login using your Microsoft account to continue
          </Typography>
          <Button variant='contained' startIcon={<MicrosoftIcon />} onClick={handleLogin}>
            Login with Microsoft
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

const WrappedLoginPage = PageContainer(LoginPage);

export default WrappedLoginPage;
