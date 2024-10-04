import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';
import { getAllUsersWithFilterPaginationAndSorting } from 'src/services/userApiService';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <UserView />
    </>
  );
}

export async function loader() {
  const { records: users } = await getAllUsersWithFilterPaginationAndSorting(
    null,
    null,
    null,
    null,
    25,
    1
  );

  return users;
}