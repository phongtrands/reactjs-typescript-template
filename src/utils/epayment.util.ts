import type { Banks } from '~/types';

export const extractFileName = (contentDisposition: string, fallbackExtension?: string): string => {
  const match = contentDisposition?.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i);

  if (!match || !match[1]) {
    return 'unknown_filename';
  }

  const rawFileName = match[1].replace(/['"]/g, '').trim();

  if (fallbackExtension) {
    const baseName = rawFileName.replace(/\.[^/.]+$/, '');
    return `${baseName}${fallbackExtension.startsWith('.') ? '' : '.'}${fallbackExtension}`;
  }

  return rawFileName;
};

export const getFilePath = (
  { bankName, csvFilePathTmp, csvFilePathBank }: Banks,
  accountNo: string,
  fileName: string,
  controlId: string,
  fileSapStatus: string,
): string => {
  const suffix = controlId ? `(${controlId}).csv` : '.csv';

  const csvFolderPath = fileSapStatus === 'Ready' ? `${csvFilePathBank}${accountNo}/` : csvFilePathTmp;

  let datePart = '';
  let prefix = '';

  switch (bankName) {
    case 'DBS':
      datePart = fileName.substring(25, 31);
      prefix = '20';
      break;

    case 'UOB':
      datePart = reverseString(fileName.slice(-6));
      prefix = '20';
      break;

    case 'OCBC':
      datePart = fileName.substring(17, 25);
      break;

    case 'CITI':
      datePart = fileName.substring(16, 24);
      break;

    default:
      throw new Error(`Unsupported bank name: ${bankName}`);
  }

  const fileDName = `${bankName}_${accountNo}_${prefix}${datePart}${suffix}`;
  return `${csvFolderPath}${fileDName}`;
};

function reverseString(str: string): string {
  return str.split('').reverse().join('');
}
