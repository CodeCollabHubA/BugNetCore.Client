import { Helmet } from 'react-helmet-async';
import { ProjectsView } from 'src/sections/projects/view';


// ----------------------------------------------------------------------

export default function PrjectsPage() {
  return (
    <>
      <Helmet>
        <title> Projects | Minimal UI </title>
      </Helmet>

      <ProjectsView />
    </>
  );
}


