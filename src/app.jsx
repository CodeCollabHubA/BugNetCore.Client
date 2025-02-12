/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';


import Router from 'src/routes/sections';
import useAppInitialLoad from './hooks/useAppInitialLoad';
import { useMyContext } from './hooks/contextApi';


// ----------------------------------------------------------------------

export default function App() {
  const {user}=useMyContext()
  useAppInitialLoad(user)
  
  return <Router />;
}
