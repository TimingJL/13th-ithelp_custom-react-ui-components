import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import Breadcrumb from '../lib/components/Breadcrumb';
import Chip from '../lib/components/Chip';
import Breadcrumbs from '../lib/components/Breadcrumb/Breadcrumbs';

export default {
  title: '導航元件/Breadcrumb',
  component: Breadcrumb,
};

const routes = [
  {
    to: '/home',
    label: '首頁',
  },
  {
    to: '/school',
    label: '學校列表',
  },
  {
    to: '/members',
    label: '會員列表',
  },
  {
    to: '/memberDetail',
    label: '會員資料',
  },
];

const routesWithIcon = [
  {
    to: '/home',
    label: '首頁',
    icon: <HomeIcon />,
  },
  {
    to: '/school',
    label: '學校列表',
    icon: <SchoolIcon />,
  },
  {
    to: '/members',
    label: '會員列表',
    icon: <SupervisorAccountIcon />,
  },
  {
    to: '/memberDetail',
    label: '會員資料',
    icon: <AssignmentIndIcon />,
  },
];

const Template = (args) => <Breadcrumb {...args} />;

const TemplateCustomNote = (args) => {
  const { routes: withIconRoutes } = args;
  return (
    <Breadcrumbs>
      {
        withIconRoutes.map((route) => (
          <Chip
            key={route.label}
            label={route.label}
            icon={route.icon}
          />
        ))
      }
    </Breadcrumbs>
  );
};

export const Default = Template.bind({});
Default.args = {
  routes,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  routes: routesWithIcon,
};

export const WithCustomSeparator = Template.bind({});
WithCustomSeparator.args = {
  separator: '/',
  routes: routesWithIcon,
};

export const WithMaxItems = Template.bind({});
WithMaxItems.args = {
  maxItems: 2,
  routes: routesWithIcon,
};

export const WithCustomNode = TemplateCustomNote.bind({});
WithCustomNode.args = {
  routes: routesWithIcon,
};
