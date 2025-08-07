import { downloadFile, getDataSources, getFiles, loadings, rejectFile, validations } from './sapfin.service';

import { api } from '~/utils';
import store from '~/redux/store';
import { extractFileName } from '~/utils/epayment.util';
import type { InterfaceFile } from '~/types';

jest.mock('~/utils', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

jest.mock('~/redux/store', () => ({
  dispatch: jest.fn(),
  __esModule: true,
  default: {
    dispatch: jest.fn(),
  },
}));

jest.mock('~/redux', () => ({
  openPopup: jest.fn().mockImplementation((args) => ({ type: 'MOCK_POPUP', payload: args })),
}));

jest.mock('~/utils/epayment.util', () => ({
  extractFileName: jest.fn().mockReturnValue('exported.csv'),
}));

describe('sapfin service', () => {
  const dispatch = store.dispatch as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getDataSources - success', async () => {
    const mockData = [{ name: 'sourceA' }];
    (api.get as jest.Mock).mockResolvedValue(mockData);
    const result = await getDataSources();
    expect(result).toEqual(mockData);
    expect(api.get).toHaveBeenCalled();
  });

  it('getDataSources - failure', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('Fetch failed'));
    const result = await getDataSources();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({ type: 'error', content: expect.stringContaining('Error') }),
      }),
    );
    expect(result).toEqual([]);
  });

  it('getFiles - success', async () => {
    const mockData = [{ fileName: 'file.csv' }];
    (api.get as jest.Mock).mockResolvedValue(mockData);
    const result = await getFiles('sourceA', 'interfaceA');
    expect(result).toEqual(mockData);
    expect(api.get).toHaveBeenCalledWith(expect.stringContaining('sourceA/interfaceA'));
  });

  it('getFiles - failure', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('404'));
    const result = await getFiles('x', 'y');
    expect(result).toEqual([]);
    expect(dispatch).toHaveBeenCalled();
  });

  it('rejectFile - success', async () => {
    const files: InterfaceFile[] = [{ fileName: 'f.csv', sourceName: 's', interfaceName: 'i' } as InterfaceFile];
    (api.post as jest.Mock).mockResolvedValue({});
    const result = await rejectFile(files);
    expect(result).toBe(true);
    expect(api.post).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
  });

  it('rejectFile - failure', async () => {
    const files: InterfaceFile[] = [{ fileName: 'f.csv', sourceName: 's', interfaceName: 'i' } as InterfaceFile];
    (api.post as jest.Mock).mockRejectedValue(new Error('reject failed'));
    const result = await rejectFile(files);
    expect(result).toBe(false);
    expect(dispatch).toHaveBeenCalled();
  });

  it('downloadFile - success', async () => {
    const files: InterfaceFile[] = [{ fileName: 'f.csv', sourceName: 's', interfaceName: 'i' } as InterfaceFile];

    const blobData = new Blob(['data'], { type: 'text/csv' });
    const mockResponse = {
      data: blobData,
      header: { 'content-disposition': 'attachment; filename="file.csv"' },
    };

    (api.post as jest.Mock).mockResolvedValue(mockResponse);

    Object.defineProperty(window, 'URL', {
      value: {
        createObjectURL: jest.fn().mockReturnValue('blob-url'),
        revokeObjectURL: jest.fn(),
      },
    });

    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();

    const mockLink = {
      href: '',
      download: '',
      click: jest.fn(),
      remove: jest.fn(),
    };
    jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);

    const result = await downloadFile(files);
    expect(result).toBeInstanceOf(Blob);
    expect(extractFileName).toHaveBeenCalled();
  });

  it('downloadFile - failure', async () => {
    const files: InterfaceFile[] = [{ fileName: 'f.csv', sourceName: 's', interfaceName: 'i' } as InterfaceFile];
    (api.post as jest.Mock).mockRejectedValue(new Error('Download error'));
    const result = await downloadFile(files);
    expect(result).toBeNull();
    expect(dispatch).toHaveBeenCalled();
  });

  it('validations - success', async () => {
    const file = { fileName: 'a', sourceName: 's', interfaceName: 'i' } as InterfaceFile;
    const res = { success: true, notes: ['ok'] };
    (api.post as jest.Mock).mockResolvedValue(res);
    const result = await validations(file);
    expect(result).toEqual(res);
  });

  it('validations - failure', async () => {
    const file = { fileName: 'a', sourceName: 's', interfaceName: 'i' } as InterfaceFile;
    (api.post as jest.Mock).mockRejectedValue(new Error('error'));
    const result = await validations(file);
    expect(result).toEqual({ success: false, notes: [] });
    expect(dispatch).toHaveBeenCalled();
  });

  it('loadings - success', async () => {
    const file = { fileName: 'a', sourceName: 's', interfaceName: 'i' } as InterfaceFile;
    const res = { success: true, notes: ['ok'] };
    (api.post as jest.Mock).mockResolvedValue(res);
    const result = await loadings(file);
    expect(result).toEqual(res);
  });

  it('loadings - failure', async () => {
    const file = { fileName: 'a', sourceName: 's', interfaceName: 'i' } as InterfaceFile;
    (api.post as jest.Mock).mockRejectedValue(new Error('error'));
    const result = await loadings(file);
    expect(result).toEqual({ success: false, notes: [] });
    expect(dispatch).toHaveBeenCalled();
  });
});
