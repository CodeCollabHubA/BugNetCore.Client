import { Helmet } from 'react-helmet-async';
import { ProjectsView } from 'src/sections/projects/view';
import { getAllProjectsWithFilterPaginationAndSorting } from 'src/services/projectApiService';


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


export async function loader() {
  const { records: projects } = await getAllProjectsWithFilterPaginationAndSorting(
    null,
    null,
    null,
    null,
    25,
    1
  );

  return projects;
}