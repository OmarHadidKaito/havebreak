import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  ecommerce: icon('ic-ecommerce'),
  dashboard: icon('ic-dashboard'),
};

// ----------------------------------------------------------------------

export const navData = [
  {
    subheader: 'Overview',
    items: [
      { title: 'Add product', path: paths.dashboard.root, icon: ICONS.dashboard },
      { title: 'List products', path: paths.dashboard.list_product, icon: ICONS.ecommerce },
    ],
  },
];
