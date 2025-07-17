import { comminglingFiles, comminglingGuestFiles, mockupDataSource } from '~/configs/mockupDataSource';
import type { InterfaceFile, Source } from '~/types';
import { addIdToArray, api } from '~/utils';

export const getDataSources = async (): Promise<Source[]> => {
  try {
    // const response = await api.get<Source[]>('/data-sources');
    const response = mockupDataSource as Source[];
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getFiles = async (sourceName: string, interfaceName: string): Promise<InterfaceFile[]> => {
  try {
    // const response = await api.get<InterfaceFile[]>(`data-sources/${sourceName}/${interfaceName}`);
    let response: any[] = [];
    if (sourceName === 'BMCS' && interfaceName === 'Commingling Guest') {
      response = comminglingGuestFiles as InterfaceFile[];
    } else if (sourceName === 'BMCS' && interfaceName === 'Commingling') {
      response = comminglingFiles as InterfaceFile[];
    }
    const newData = response.length > 0 ? addIdToArray(response, 'file') : [];
    return newData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const rejectFile = async (files: InterfaceFile[]) => {
  try {
    // const response = await api.post<InterfaceFile[]>('data-sources/rejects', { files });
    const response = { took: 8, code: 'OK', message: 'Success', t: 1751618538837 };
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const downloadFile = async (files: InterfaceFile[]) => {
  try {
    // const response = await api.post<InterfaceFile[]>('data-sources/downloads', { files });
    const response = { took: 8, code: 'OK', message: 'Success', t: 1751618538837 };
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const validations = async (files: InterfaceFile[]) => {
  try {
    // const response = await api.post<InterfaceFile[]>('data-sources/validations', { files });
    const response = {
      took: 3802,
      data: {
        success: false,
        notes: [
          'Error in document: BKPFF $ 0M2DSC9',
          'Posting period 007 2018 not open for variant 2000 and ledger 0L',
          'Error in document: BKPFF $ 0M2DSC9',
          'Posting period 007 2018 not open for variant 2000 and ledger 0L',
          'Error in document: BKPFF $ 0M2DSC9',
          'Posting period 007 2018 not open for variant 2000 and ledger 0L',
        ],
      },
      t: 1751620882313,
    };
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const loadings = async (files: InterfaceFile[]) => {
  try {
    // const response = await api.post<InterfaceFile[]>('data-sources/loadings', { files });
    const response = {
      took: 3802,
      data: {
        success: false,
        notes: [
          'Error in document: BKPFF $ 0M2DSC9',
          'Posting period 007 2018 not open for variant 2000 and ledger 0L',
          'Error in document: BKPFF $ 0M2DSC9',
          'Posting period 007 2018 not open for variant 2000 and ledger 0L',
          'Error in document: BKPFF $ 0M2DSC9',
          'Posting period 007 2018 not open for variant 2000 and ledger 0L',
        ],
      },
      t: 1751620882313,
    };
    return response;
  } catch (error) {
    console.error(error);
  }
};
