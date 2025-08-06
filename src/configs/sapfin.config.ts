import type { ColumnConfig, Interface, InterfaceFile } from '~/types';

export const interfaceColumns: ColumnConfig<Interface>[] = [
  { headerName: 'Interfaces', field: 'displayName', align: 'left', type: 'text', iconType: 'folder' },
];

export const fileColumns: ColumnConfig<InterfaceFile>[] = [
  { headerName: 'File', field: 'fileName', align: 'left', type: 'textCheckbox', iconType: 'paper' },
];

export const uploadFolderColumns: ColumnConfig<InterfaceFile>[] = [
  { headerName: 'Interfaces', field: 'fileName', align: 'left', type: 'text', iconType: 'paper' },
];
