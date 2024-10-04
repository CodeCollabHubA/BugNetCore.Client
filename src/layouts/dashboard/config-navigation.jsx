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
  },
  {
    title: 'bugs',
    path: '/bug',
    icon: icon('ic_bug'),
  },
  {
    title: 'users',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Projects',
    path: '/project',
    icon: icon('ic_blog'),
  },
  {
    title: 'Support Request',
    path: '/supportRequest',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
