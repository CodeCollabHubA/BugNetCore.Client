import { Helmet } from 'react-helmet-async';

import { BugView } from 'src/sections/bug/view';

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


