import { useState, Suspense, useEffect } from 'react';
import { defer, Outlet, redirect, useLoaderData, useSubmit } from 'react-router-dom';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Box from '@mui/material/Box';

import { getAuthToken, getTokenDuration } from 'src/services/authService';
import { countProjectsByStatus } from 'src/services/projectApiService';
import { countBugsByStatus } from 'src/services/bugApiService';
import { countUsersByRole } from 'src/services/userApiService';
import { CircularProgress } from '@mui/material';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  useScrollToTop();
  const [openNav, setOpenNav] = useState(false);
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);

  return (
    
<>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Suspense fallback={CircularProgress}>
          <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        </Suspense>
        <Main>
          <Suspense>
            <Outlet />
          </Suspense>
        </Main>
      </Box>
    </>
  );
}

async function loadBugsStats() {
  return {
    inProgress: await countBugsByStatus('InProgress'),
    resolved: await countBugsByStatus('Resolved'),
    testing: await countBugsByStatus('Testing'),
    reported: await countBugsByStatus('Reported'),
  };
}

export function loader() {
  const token = getAuthToken();
  if (token == null) {
    return redirect('/auth');
  }
  return defer({
    numberOfProjects: countProjectsByStatus(),
    numberOfCustomers: countUsersByRole('Customer'),
    numberOfBugs: loadBugsStats(),
  });
}
