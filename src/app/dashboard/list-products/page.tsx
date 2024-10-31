import { CONFIG } from 'src/config-global';

import { ProductList } from 'src/sections/list-product';

// ----------------------------------------------------------------------

export const metadata = { title: `Page two | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <ProductList />;
}
