import { API_URLS } from '~/constants';
import { openPopup } from '~/redux';
import store from '~/redux/store';
import type { ExportFileType, InterfaceFile, ResponseAPIType, Source } from '~/types';
import { api } from '~/utils';
import { extractFileName } from '~/utils/epayment.util';

const showError = (error: string) => {
  const dispatch = store.dispatch;
  dispatch(
    openPopup({
      type: 'error',
      content: error,
      onOk: () => {},
    }),
  );
};

export const getDataSources = async (): Promise<Source[]> => {
  try {
    const response = await api.get<Source[]>(API_URLS.SAPFIN_PORTAL.DATA_SOURCES);
    return response;
  } catch (error) {
    showError(String(error));
    return [];
  }
};

export const getFiles = async (sourceName: string, interfaceName: string): Promise<InterfaceFile[]> => {
  try {
    const response = await api.get<InterfaceFile[]>(
      `${API_URLS.SAPFIN_PORTAL.DATA_SOURCES}/${sourceName}/${interfaceName}`,
    );
    return response;
  } catch (error) {
    showError(String(error));
    return [];
  }
};

export const rejectFile = async (files: InterfaceFile[]): Promise<boolean> => {
  try {
    const requestFiles = files.map(({ fileName, sourceName, interfaceName }) => ({
      fileName,
      sourceName,
      interfaceName,
    }));
    await api.post(API_URLS.SAPFIN_PORTAL.REJECTS, requestFiles);
    return true;
  } catch (error) {
    showError(String(error));
    return false;
  }
};

export const downloadFile = async (files: InterfaceFile[]) => {
  try {
    const requestFiles = files.map(({ fileName, sourceName, interfaceName }) => ({
      fileName,
      sourceName,
      interfaceName,
    }));
    const response: ExportFileType = await api.post<ExportFileType>(
      API_URLS.SAPFIN_PORTAL.DOWNLOADS,
      requestFiles,
      {
        Accept: 'text/csv',
      },
      'blob',
    );
    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    const exportFileName = extractFileName(response.header['content-disposition']);
    link.download = exportFileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return blob;
  } catch (error) {
    showError(String(error));
    return null;
  }
};

export const validations = async (file: InterfaceFile): Promise<ResponseAPIType> => {
  try {
    const response: ResponseAPIType = await api.post<ResponseAPIType>(API_URLS.SAPFIN_PORTAL.VALIDATE, {
      fileNames: file.fileName,
      sourceName: file.sourceName,
      interfaceName: file.interfaceName,
    });
    return response;
  } catch (error) {
    showError(String(error));
    return {
      success: false,
      notes: [],
    };
  }
};

export const loadings = async (file: InterfaceFile): Promise<ResponseAPIType> => {
  try {
    const response: ResponseAPIType = await api.post<ResponseAPIType>(API_URLS.SAPFIN_PORTAL.LOADINGS, {
      fileNames: file.fileName,
      sourceName: file.sourceName,
      interfaceName: file.interfaceName,
    });
    return response;
  } catch (error) {
    showError(String(error));
    return {
      success: false,
      notes: [],
    };
  }
};
