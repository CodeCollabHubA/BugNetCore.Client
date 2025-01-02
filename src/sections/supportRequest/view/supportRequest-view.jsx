import { useState } from 'react';

import { useMyContext } from 'src/hooks/contextApi';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Card, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import SupportRequestTableToolbar from '../supportRequest-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import SupportRequestTableHead from '../supportRequest-table-head';

import SupportRequestTableRow from '../supportRequest-table-row';
import TableEmptyRows from '../table-empty-rows';
import TableNoData from '../table-no-data';

// ----------------------------------------------------------------------

export default function SupportRequestView() {
  const {supportRequests}= useMyContext()
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('status');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const currentUser = JSON.parse(localStorage.user);
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleChangePage = async (event, newPage) => {
    // const numberOfSupportRequestsNeeded = (newPage + 1) * rowsPerPage;
    // const { records: dataOfPage } = await getAllSupportRequestsWithFilterPaginationAndSorting(
    //   null,
    //   null,
    //   null,
    //   null,
    //   numberOfSupportRequestsNeeded,
    //   newPage
    // );
    // console.log(numberOfSupportRequestsNeeded);
    // console.log(dataOfPage);
    // console.log(newPage);
    // setSupportRequests(dataOfPage);
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
    inputData: supportRequests,
    comparator: getComparator(order, orderBy),
    filterFunction: (supportRequest) =>
      supportRequest.description.toLowerCase().indexOf(filterName.toLowerCase()) !== -1,
  });
  console.log(dataFiltered);
  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Supoort Requests</Typography>
      </Stack>

      <Card>
        <SupportRequestTableToolbar filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <SupportRequestTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'requestId', label: 'Chat Room' },
                  { id: 'bugTitle', label: 'Bug Title' },
                  { id: 'dev', label: 'Developer Name' },
                  { id: 'customer', label: 'Customer Name' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <SupportRequestTableRow key={row.id} SR={row} user={currentUser} />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, supportRequests.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={supportRequests.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
