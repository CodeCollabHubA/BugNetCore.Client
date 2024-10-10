/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';


import Router from 'src/routes/sections';
import useAppInitialLoad from './hooks/useAppInitialLoad';


// ----------------------------------------------------------------------

export default function App() {
  useAppInitialLoad()
  return <Router />;
}
