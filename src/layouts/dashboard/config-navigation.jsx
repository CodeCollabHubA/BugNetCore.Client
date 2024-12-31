import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
    roles: ['Admin', 'Customer', 'Dev'],
  },
  { 
    title: 'bugs',
    path: '/bug',
    icon: icon('ic_bug'),
    roles: ['Admin', 'Customer', 'Dev'],
  },
  {
    title: 'users',
    path: '/user',
    icon: icon('ic_user'),
    roles: ['Admin'],
  },
  {
    title: 'Projects',
    path: '/project',
    icon: icon('ic_blog'),
    roles: ['Admin', 'Dev'],
  },
  {
    title: 'Support Request',
    path: '/supportRequest',
    icon: icon('ic_cart'),
    roles: ['Admin', 'Customer', 'Dev'],
  },
];

export default navConfig;
