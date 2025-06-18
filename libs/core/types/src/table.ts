export interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  type?: string;
}

export interface ChangeEvent {
  rowIndex: number;
  rowId: number | string;
  fieldName: string;
  value: number | string;
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
  onChange?: (event: ChangeEvent) => void;
}
