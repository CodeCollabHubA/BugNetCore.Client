import { Helmet } from 'react-helmet-async';

import { BugView } from 'src/sections/bug/view';
import { getAllBugsWithFilterPaginationAndSorting } from 'src/services/bugApiService';

// ----------------------------------------------------------------------

export default function BugPage() {
  return (
    <>
      <Helmet>
        <title> Bug | BugNet Core 🐞 </title>
      </Helmet>

      <BugView />
    </>
  );
}

export async function loader() {
  const { records: bugs } = await getAllBugsWithFilterPaginationAndSorting(
    null,
    null,
    null,
    null,
    25,
    1
  );

  return bugs;
}
