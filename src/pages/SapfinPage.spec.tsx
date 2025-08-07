import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useMsal } from '@azure/msal-react';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

import SapfinPage from './SapfinPage';

import { downloadFile, getDataSources, getFiles, loadings, rejectFile, validations } from '~/services';
import { comminglingFiles, comminglingGuestFiles, mockupDataSource } from '~/configs/mockupDataSource';
import { addIdToArray } from '~/utils';

jest.mock('~/services', () => ({
  getDataSources: jest.fn(),
  getFiles: jest.fn(),
  rejectFile: jest.fn(),
  downloadFile: jest.fn(),
  validations: jest.fn(),
  loadings: jest.fn(),
}));

jest.mock('notistack', () => ({
  enqueueSnackbar: jest.fn(),
}));

const renderComponent = () => render(<SapfinPage />);

describe('SapfinPage Component', () => {
  let mockDispatch: jest.Mock;
  let mockEnqueue: jest.Mock;
  beforeEach(() => {
    const mockInstance = {
      loginPopup: jest.fn().mockResolvedValue({
        accessToken: 'mock-access-token',
        account: { username: 'testuser' },
      }),
    };
    (useMsal as jest.Mock).mockReturnValue({
      instance: mockInstance,
    });
    (getDataSources as jest.Mock).mockResolvedValue(mockupDataSource);
    (getFiles as jest.Mock).mockResolvedValue(addIdToArray(comminglingFiles));
    mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    mockEnqueue = enqueueSnackbar as jest.Mock;
    cleanup();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Render SapfinPage Component', async () => {
    await act(async () => {
      renderComponent();
    });
    const sourceDropdown = await screen.findByText('Source');
    expect(sourceDropdown).toBeInTheDocument();
  });

  test('Test Change Source to CITI', async () => {
    await act(async () => {
      renderComponent();
    });
    (getFiles as jest.Mock).mockResolvedValue([
      {
        id: '13',
        sourceName: 'CITI',
        interfaceName: '0810972009 Citi test account',
        fileName: 'TestInterface.csv',
      },
    ]);
    const dropdowns = await screen.findAllByRole('combobox');
    const sourceDropdown = dropdowns[0];
    fireEvent.mouseDown(sourceDropdown);
    const option = await screen.findByText('CITI');
    await act(async () => {
      fireEvent.click(option);
    });
    const testInterface = await screen.findByText('TestInterface.csv');
    expect(testInterface).toBeInTheDocument();
  });

  test('Test click Interface Commingling as a Guest', async () => {
    await act(async () => {
      renderComponent();
    });
    (getFiles as jest.Mock).mockResolvedValue(addIdToArray(comminglingGuestFiles));
    const newInterface = await screen.findByText('Commingling as a Guest');
    await act(async () => {
      fireEvent.click(newInterface);
    });
    const testInterface = await screen.findByText('Commingling_Guest_20240919(01).csv');
    expect(testInterface).toBeInTheDocument();
  });

  test('Test Reject Button', async () => {
    (rejectFile as jest.Mock).mockResolvedValue(true);
    await act(async () => {
      renderComponent();
    });
    const checkBox = await screen.getAllByRole('checkbox');
    await act(async () => {
      fireEvent.click(checkBox[0]);
      fireEvent.click(checkBox[1]);
      fireEvent.click(checkBox[1]);
    });
    const rejectBtn = await screen.findByText('Reject');
    await act(async () => {
      fireEvent.click(rejectBtn);
      const onOk = mockDispatch.mock.calls[0][0].payload.onOk;
      onOk();
    });
    expect(mockEnqueue.mock.calls[0][0]).toBe('Reject data successfully');
  });
  test('Test Reject Button with rejectFile return false', async () => {
    (rejectFile as jest.Mock).mockResolvedValue(false);
    await act(async () => {
      renderComponent();
    });
    const checkBox = await screen.getAllByRole('checkbox');
    await act(async () => {
      fireEvent.click(checkBox[0]);
    });
    const rejectBtn = await screen.findByText('Reject');
    await act(async () => {
      fireEvent.click(rejectBtn);
      const onOk = mockDispatch.mock.calls[0][0].payload.onOk;
      onOk();
    });
    expect(mockEnqueue.mock.calls[0][0]).toBe('Reject data failed');
  });

  test('Test Download Button', async () => {
    (downloadFile as jest.Mock).mockResolvedValue('123');
    await act(async () => {
      renderComponent();
    });
    const checkBox = await screen.getAllByRole('checkbox');
    await act(async () => {
      fireEvent.click(checkBox[0]);
    });
    const downloadBtn = await screen.findByText('Download');
    await act(async () => {
      fireEvent.click(downloadBtn);
    });
    expect(mockEnqueue.mock.calls[0][0]).toBe('Download data successfully');
  });

  test('Test Download Button with downloadFile return null', async () => {
    (downloadFile as jest.Mock).mockResolvedValue(null);
    await act(async () => {
      renderComponent();
    });
    const checkBox = await screen.getAllByRole('checkbox');
    await act(async () => {
      fireEvent.click(checkBox[0]);
    });
    const downloadBtn = await screen.findByText('Download');
    await act(async () => {
      fireEvent.click(downloadBtn);
    });
    expect(mockEnqueue.mock.calls[0][0]).toBe('Download data failed');
  });

  test('Test Test Run Button', async () => {
    (validations as jest.Mock).mockResolvedValue({
      success: true,
      notes: [],
    });
    await act(async () => {
      renderComponent();
    });
    const checkBox = await screen.getAllByRole('checkbox');
    await act(async () => {
      fireEvent.click(checkBox[0]);
    });
    const moveToBtn = screen.getByTestId('move-to-upload');
    await act(async () => {
      fireEvent.click(moveToBtn);
    });
    const testRunBtn = await screen.findByText('Test Run');
    await act(async () => {
      fireEvent.click(testRunBtn);
    });
    expect(mockEnqueue.mock.calls[0][0]).toBe('Test run data completed with no error');
  });

  test('Test Test Run Button with validations return error', async () => {
    (validations as jest.Mock).mockResolvedValue({
      success: false,
      notes: ['error'],
    });
    await act(async () => {
      renderComponent();
    });
    const checkBox = await screen.getAllByRole('checkbox');
    await act(async () => {
      fireEvent.click(checkBox[0]);
    });
    const moveToBtn = screen.getByTestId('move-to-upload');
    await act(async () => {
      fireEvent.click(moveToBtn);
    });
    const testRunBtn = await screen.findByText('Test Run');
    await act(async () => {
      fireEvent.click(testRunBtn);
    });
    const moveBackBtn = screen.getByTestId('move-back');
    await act(async () => {
      fireEvent.click(moveBackBtn);
    });
    expect(mockEnqueue.mock.calls[0][0]).toBe('Test run data completed with error');
  });

  test('Test Actual Run Button', async () => {
    (loadings as jest.Mock).mockResolvedValue({
      success: true,
      notes: [],
    });
    await act(async () => {
      renderComponent();
    });
    const checkBox = await screen.getAllByRole('checkbox');
    await act(async () => {
      fireEvent.click(checkBox[0]);
    });
    const moveToBtn = screen.getByTestId('move-to-upload');
    await act(async () => {
      fireEvent.click(moveToBtn);
    });
    const actualRunBtn = await screen.findByText('Actual Run');
    await act(async () => {
      fireEvent.click(actualRunBtn);
      const onOk = mockDispatch.mock.calls[0][0].payload.onOk;
      onOk();
    });
    expect(mockEnqueue.mock.calls[0][0]).toBe('Actual run data completed with no error');
  });

  test('Test Actual Run Button with loadings return error', async () => {
    (loadings as jest.Mock).mockResolvedValue({
      success: false,
      notes: ['error'],
    });
    await act(async () => {
      renderComponent();
    });
    const checkBox = await screen.getAllByRole('checkbox');
    await act(async () => {
      fireEvent.click(checkBox[0]);
    });
    const moveToBtn = screen.getByTestId('move-to-upload');
    await act(async () => {
      fireEvent.click(moveToBtn);
    });
    const actualRunBtn = await screen.findByText('Actual Run');
    await act(async () => {
      fireEvent.click(actualRunBtn);
      const onOk = mockDispatch.mock.calls[0][0].payload.onOk;
      onOk();
    });
    expect(mockEnqueue.mock.calls[0][0]).toBe('Actual run data completed with error');
  });
});
