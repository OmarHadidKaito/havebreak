import { CONFIG } from 'src/config-global';

import { ProductForm } from 'src/sections/add-product';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <ProductForm />;
}
