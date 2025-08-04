import { extractFileName, getFilePath } from './epayment.util';

import type { Banks } from '~/types';

describe('extractFileName', () => {
  it('should extract filename from content-disposition header', () => {
    const header = 'attachment; filename="test.csv"';
    const result = extractFileName(header);
    expect(result).toBe('test.csv');
  });

  it('should extract filename without quotes', () => {
    const header = 'attachment; filename=test.csv';
    const result = extractFileName(header);
    expect(result).toBe('test.csv');
  });

  it('should return unknown_filename if no match', () => {
    const header = 'invalid-header';
    const result = extractFileName(header);
    expect(result).toBe('unknown_filename');
  });

  it('should return unknown_filename if match exists but filename is empty', () => {
    const header = 'attachment; filename=';
    const result = extractFileName(header);
    expect(result).toBe('unknown_filename');
  });

  it('should replace extension with fallbackExtension (with dot)', () => {
    const header = 'attachment; filename="test.csv"';
    const result = extractFileName(header, '.txt');
    expect(result).toBe('test.txt');
  });

  it('should replace extension with fallbackExtension (without dot)', () => {
    const header = 'attachment; filename="test.csv"';
    const result = extractFileName(header, 'txt');
    expect(result).toBe('test.txt');
  });
});

describe('getFilePath', () => {
  const baseBank: Banks = {
    bankName: 'DBS',
    csvFilePathTmp: '/apps/pentaho_data/sap-portal/temp/DBS/',
    csvFilePathBank: '/apps/pentaho_data/sap-portal/output-csv/DBS/',
    fileDownloadUrl: 'http://10.168.15.174:8081/api/v1/download',
    sapPortalUrl: 'http://10.168.15.174:8080/sap-portal/',
  };

  it('should return correct path for DBS when fileSapStatus is Ready', () => {
    const bank = { ...baseBank, bankName: 'DBS' };
    const result = getFilePath(bank, '123456', 'SINPOO01XXXX.CASP_MT940.D230617104353.txt', 'CTRL123', 'Ready');

    expect(result).toContain('/apps/pentaho_data/sap-portal/output-csv/DBS/123456/DBS_123456_20230617(CTRL123).csv');
    expect(result).toContain('DBS_123456_20');
    expect(result).toContain('(CTRL123).csv');
  });

  it('should return correct path for UOB when fileSapStatus is not Ready', () => {
    const bank = { ...baseBank, bankName: 'UOB' };
    const result = getFilePath(bank, '654321', 'UOBFILE123456', '', 'Pending');
    expect(result.startsWith('/apps/pentaho_data/sap-portal/temp/DBS/')).toBe(true);
    expect(result).toContain('UOB_654321_20');
    expect(result).toContain('.csv');
  });

  it('should return correct path for OCBC', () => {
    const bank = { ...baseBank, bankName: 'OCBC' };
    const result = getFilePath(bank, '999999', 'OCBCxxxxxxx20230101xxxx', '', 'Pending');

    expect(result.startsWith('/apps/pentaho_data/sap-portal/temp/DBS/')).toBe(true);
    expect(result).toContain('/apps/pentaho_data/sap-portal/temp/DBS/OCBC_999999_01xxxx.csv');
  });

  it('should return correct path for CITI', () => {
    const bank = { ...baseBank, bankName: 'CITI' };
    const result = getFilePath(bank, '111111', 'CITIxxxxxxx20230101xxxx', '', 'Pending');

    expect(result.startsWith('/apps/pentaho_data/sap-portal/temp/DBS/')).toBe(true);
    expect(result).toContain('/apps/pentaho_data/sap-portal/temp/DBS/CITI_111111_101xxxx.csv');
  });

  it('should throw error for unsupported bank', () => {
    const bank = { ...baseBank, bankName: 'UNKNOWN' };
    expect(() => getFilePath(bank, '000000', 'filename.txt', '', 'Pending')).toThrow('Unsupported bank name: UNKNOWN');
  });
});
