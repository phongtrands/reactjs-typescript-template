import { render, screen, fireEvent } from '@testing-library/react';

import SPTable from './SPTable';

import type { ColumnConfig } from '~/types';

type RowData = {
  id: number;
  name: string;
  status: string;
  count: number;
  action: string;
  download: string;
  double: string;
  check: string;
};

const columns: ColumnConfig<RowData>[] = [
  { field: 'name', headerName: 'Name', type: 'text', iconType: 'folder' },
  { field: 'status', headerName: 'Status', type: 'status' },
  { field: 'count', headerName: 'Count', type: 'number' },
  { field: 'action', headerName: 'Action', type: 'iconAction' },
  { field: 'download', headerName: 'Download', type: 'iconDownload' },
  { field: 'double', headerName: 'Double', type: 'doubleAction' },
  { field: 'check', headerName: 'Check', type: 'textCheckbox', iconType: 'paper' },
];

const mockData: RowData[] = [
  { id: 1, name: 'File 1', status: 'Matched', count: 5, action: '', download: '', double: '', check: '' },
  {
    id: 2,
    name: 'File 2',
    status: 'Awaiting Confirmation',
    count: 10,
    action: '',
    download: '',
    double: '',
    check: '',
  },
  { id: 3, name: 'File 3', status: 'Ready', count: 15, action: '', download: '', double: '', check: '' },
];

describe('SPTable', () => {
  it('renders loading state', async () => {
    render(<SPTable columns={columns} data={[]} loading={true} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders table rows', () => {
    render(<SPTable columns={columns} data={mockData} />);
    expect(screen.getByText('File 1')).toBeInTheDocument();
    expect(screen.getByText('File 2')).toBeInTheDocument();
    expect(screen.getByText('File 3')).toBeInTheDocument();
  });

  it('filters rows with search', () => {
    render(<SPTable columns={columns} data={mockData} enableSearch searchColumn='name' />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'file 2' } });
    expect(screen.queryByText('File 1')).not.toBeInTheDocument();
    expect(screen.getByText('File 2')).toBeInTheDocument();
  });

  it('calls onSelectionChange in single mode', () => {
    const onSelectionChange = jest.fn();
    render(
      <SPTable
        columns={columns}
        data={mockData}
        selectable='single'
        selected={[]}
        onSelectionChange={onSelectionChange}
      />,
    );
    fireEvent.click(screen.getByText('File 1'));
    expect(onSelectionChange).toHaveBeenCalledWith([1]);
  });

  it('calls onSelectionChange in multiple mode', () => {
    const onSelectionChange = jest.fn();
    render(
      <SPTable
        columns={columns}
        data={mockData}
        selectable='multiple'
        selected={[]}
        onSelectionChange={onSelectionChange}
      />,
    );
    fireEvent.click(screen.getByText('File 1'));
    expect(onSelectionChange).toHaveBeenCalledWith([1]);
  });

  it('calls onClick for iconAction', () => {
    const onClick = jest.fn();
    render(<SPTable columns={columns} data={mockData} onClick={onClick} />);
    fireEvent.click(screen.getByTestId('warning_icon_1'));
    expect(onClick).toHaveBeenCalledWith(mockData[0], 'action', expect.anything());
  });

  it('calls onClick for iconDownload', () => {
    const onClick = jest.fn();
    render(<SPTable columns={columns} data={mockData} onClick={onClick} />);
    fireEvent.click(screen.getByTestId('download_1'));
    expect(onClick).toHaveBeenCalledWith(mockData[0], 'download', expect.anything());
  });

  it('calls onClick for doubleAction', () => {
    const onClick = jest.fn();
    render(<SPTable columns={columns} data={mockData} onClick={onClick} />);
    fireEvent.click(screen.getByTestId('primary_1'));
    expect(onClick).toHaveBeenCalledWith(mockData[0], 'double_primary', expect.anything());
    fireEvent.click(screen.getByTestId('warning_1'));
    expect(onClick).toHaveBeenCalledWith(mockData[0], 'double_warning', expect.anything());
  });

  it('calls onChange for textCheckbox', () => {
    const onChange = jest.fn();
    render(<SPTable columns={columns} data={mockData} onChange={onChange} />);
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(mockData[0], true, 'check', expect.anything());
  });

  it('renders pagination and navigates', () => {
    render(<SPTable columns={columns} data={mockData} pagination rowsPerPage={1} />);
    expect(screen.getByText('File 1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('2'));
    expect(screen.getByText('File 2')).toBeInTheDocument();
  });
});
