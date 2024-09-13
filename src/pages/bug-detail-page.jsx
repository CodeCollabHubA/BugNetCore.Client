import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import BugDetailView from "src/sections/bug/view/bug-detail-view";
// ----------------------------------------------------------------------

export default function BugDetailPage() {
  const { bugId } = useParams();

  
  return (
    <>
      <Helmet>
        <title> Bug Detail | Minimal UI </title>
      </Helmet>

      <BugDetailView bugId={bugId} />
    </>
  );
}
