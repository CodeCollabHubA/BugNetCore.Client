import { useState } from 'react';

import { useMyContext } from 'src/hooks/contextApi';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import BugTableRow from '../bug-table-row';
import BugTableHead from '../bug-table-head';
import TableEmptyRows from '../table-empty-rows';
import BugTableToolbar from '../bug-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import BugModal from '../bug-modal';

// ----------------------------------------------------------------------

export default function BugPage() {
  const {bugs}=useMyContext()

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('status');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleChangePage = async(event, newPage) => {

    setPage(page+1);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const dataFiltered = applyFilter({
    inputData: bugs,
    comparator: getComparator(order, orderBy),
    filterFunction: (bug) => bug.description.toLowerCase().indexOf(filterName.toLowerCase()) !== -1,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <BugModal open={openCreateModal} handleClose={() => setOpenCreateModal(false)} />

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Bugs</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setOpenCreateModal(true)}
        >
          Report a Bug
        </Button>
      </Stack>

      <Card>
        <BugTableToolbar filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <BugTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'title', label: 'Bug Title'},
                  { id: 'projectName', label: 'Project Name'},
                  { id: 'description', label: 'Description'},
                  { id: 'category', label: 'category', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <BugTableRow key={row.id} bug={row} />
                  ))}

                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, bugs.length)} />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={bugs.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
