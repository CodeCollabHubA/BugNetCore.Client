import { Helmet } from 'react-helmet-async';
import { SupportRequestView } from 'src/sections/supportRequest/view';


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

