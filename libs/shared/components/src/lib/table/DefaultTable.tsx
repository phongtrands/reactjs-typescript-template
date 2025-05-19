import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const DefaultTable = ({ isCheckBox = false }) => {

    const data = [
        { id: 1, label: 'Row 1' },
        { id: 2, label: 'Row 2' },
        { id: 3, label: 'Row 3' },
        { id: 4, label: 'Row 4' },
        { id: 5, label: 'Row 5' },
        { id: 6, label: 'Row 6' },
        { id: 7, label: 'Row 7' },
      ];
    return(
        <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: 'auto' }} >
      <Table stickyHeader>
        <TableHead>
          <TableRow >
            <TableCell
              sx={{
                backgroundColor: '#005b84',
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              File
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} sx={{ borderBottom: 'none' }}>
              <TableCell
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  padding: '8px 16px',
                }}
              >
                {row.label}
                {isCheckBox && <Checkbox /> }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
};

export default DefaultTable;