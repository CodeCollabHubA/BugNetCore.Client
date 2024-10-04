import { Helmet } from 'react-helmet-async';
import { SupportRequestView } from 'src/sections/supportRequest/view';
import { getAllSupportRequestsWithFilterPaginationAndSorting } from 'src/services/supportRequestApiService';


// ----------------------------------------------------------------------

export default function SupportRequestPage() {
  return (
    <>
      <Helmet>
        <title> Support Request | Minimal UI </title>
      </Helmet>

      <SupportRequestView />
    </>
  );
}

export async function loader() {
  const { records: supportRequest } = await getAllSupportRequestsWithFilterPaginationAndSorting(
    null,
    null,
    null,
    null,
    25,
    1
  );

  return supportRequest;
}