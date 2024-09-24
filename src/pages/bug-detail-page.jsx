import { Helmet } from "react-helmet-async";

import BugDetailView from "src/sections/bug/view/bug-detail-view";
// ----------------------------------------------------------------------

export default function BugDetailPage() {
  

  
  return (
    <>
      <Helmet>
        <title> Bug Detail | Minimal UI </title>
      </Helmet>

      <BugDetailView/>
    </>
  );
}
