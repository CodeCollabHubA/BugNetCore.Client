import { useState } from 'react';

import { useMyContext } from 'src/hooks/contextApi';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, Card, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import ProjectTableToolbar from '../project-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import ProjectTableHead from '../project-table-head';

import ProjectModal from '../project-modal';
import ProjectTableRow from '../project-table-row';
import TableEmptyRows from '../table-empty-rows';
import TableNoData from '../table-no-data';


// ----------------------------------------------------------------------

export default function PrjectsView() {
  const {projects} = useMyContext()
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
    inputData: projects,
    comparator: getComparator(order, orderBy),
    filterFunction: (Project) => Project.description.toLowerCase().indexOf(filterName.toLowerCase()) !== -1,
  });
  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <ProjectModal open={openCreateModal} handleClose={() => setOpenCreateModal(false)} />

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Projects</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setOpenCreateModal(true)}
        >
          Add a Project
        </Button>
      </Stack>

      <Card>
        <ProjectTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ProjectTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  {id:'0'},
                  { id: 'projectName', label: 'Project Name'},
                  { id: 'description', label: 'Description'},
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <ProjectTableRow key={row.id} project={row} />
                  ))}

                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, projects.length)} />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={projects.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
