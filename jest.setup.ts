jest.mock('~/constants/env', () => ({
  API_BASE_URL: 'https://mock-api.example.com',
}));

jest.mock('../../assets/image/left-logo.png', () => 'mock-image');

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(() => ({
    pathname: '/epayment',
  })),
}));

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  enqueueSnackbar: jest.fn(),
}));

jest.mock('@azure/msal-react', () => ({
  useMsal: jest.fn(),
}));
