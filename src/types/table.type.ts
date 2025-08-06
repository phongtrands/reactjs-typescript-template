export interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  type?: string;
  iconType?: 'folder' | 'paper';
}

export interface TableProps<T> {
  columns: ColumnConfig<T>[];
  data: T[];
  loading?: boolean;
  enableSearch?: boolean;
  pagination?: boolean;
  rowsPerPage?: number;
  maxHeight?: number;
  minHeight?: number;
  backgroundHeader?: string;
  searchColumn?: keyof T;
  onChange?: (row: any, value: any, fieldName: string, event: any) => void;
  onSelectionChange?: (selected: (string | number)[]) => void;
  selected?: (string | number)[];
  selectable?: 'single' | 'multiple';
  onClick?: (row: any, fieldName: string, event: any) => void;
}
