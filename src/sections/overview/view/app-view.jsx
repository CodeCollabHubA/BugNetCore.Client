// import { faker } from '@faker-js/faker';
import { Await, useRouteLoaderData } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import { Suspense, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import BugModal from 'src/sections/bug/bug-modal';
// import AppTasks from '../app-tasks';
// import AppNewsUpdate from '../app-news-update';
import { useRouter } from 'src/routes/hooks';
import AppQuickActions from '../app-quick-actions';
// import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
// import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
// import AppCurrentSubject from '../app-current-subject';
// import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  const { numberOfProjects, numberOfCustomers, numberOfBugs } = useRouteLoaderData('dashboard');
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid xs={12} sm={6} md={3}>
          <Suspense
            fallback={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <Await resolve={numberOfProjects}>
              {(loadedProjectsData) => (
                <AppWidgetSummary
                  title="Projects"
                  total={loadedProjectsData}
                  color="info"
                  icon={<img alt="icon" src="/assets/icons/glass/ic_glass_document.png" />}
                />
              )}
            </Await>
          </Suspense>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Suspense
            fallback={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <Await resolve={numberOfCustomers}>
              {(loadedCustomersData) => (
                <AppWidgetSummary
                  title="New Customers"
                  total={loadedCustomersData}
                  color="info"
                  icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
                />
              )}
            </Await>
          </Suspense>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Suspense
            fallback={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <Await resolve={numberOfBugs}>
              {(loadedBugsData) => (
                <AppWidgetSummary
                  title="Bug Reports"
                  total={
                    loadedBugsData.reported +
                    loadedBugsData.resolved +
                    loadedBugsData.testing +
                    loadedBugsData.inProgress
                  }
                  color="error"
                  icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
                />
              )}
            </Await>
          </Suspense>
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid> */}
        <Grid xs={12} md={6} lg={8}>
          <BugModal open={openModal} handleClose={() => setOpenModal(false)} bug={null} />
          <AppQuickActions
            title="Quick actions"
            list={[
              {
                handleClick: () => setOpenModal(true),
                // path: 'ReportCreate',
                name: 'Report a Bug',
                icon: <Iconify icon="ant-design:bug-filled" color="#DF3E30" width={32} />,
              },
              {
                handleClick: () => router.push('/bug'),
                // path: 'liveSuport',
                name: 'Request Live Support',
                icon: <Iconify icon="fluent:person-support-24-filled" color="#0FFF50" width={32} />,
              },
              {
                handleClick: () => router.push('/bug'),
                // path: 'bug',
                name: 'View Bugs',
                icon: <Iconify icon="streamline:bug-virus-browser" color="#1877F2" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Suspense
            fallback={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <Await resolve={numberOfBugs}>
              {(loadedBugsData) => (
                <AppCurrentVisits
                  title="Bugs Stats"
                  chart={{
                    series: [
                      { label: 'In Progress', value: loadedBugsData.inProgress },
                      { label: 'Resolved', value: loadedBugsData.resolved },
                      { label: 'Testing', value: loadedBugsData.testing },
                    ],
                  }}
                />
              )}
            </Await>
          </Suspense>
        </Grid>
        {/* 
        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid> */}
        {/* 
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
