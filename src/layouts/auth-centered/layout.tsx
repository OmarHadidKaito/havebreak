'use client';

import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Alert from '@mui/material/Alert';

import { useBoolean } from 'src/hooks/use-boolean';

import { Main } from './main';
import { HeaderBase } from '../core/header-base';
import { LayoutSection } from '../core/layout-section';

// ----------------------------------------------------------------------

export type AuthCenteredLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
};

export function AuthLayout({ sx, children }: AuthCenteredLayoutProps) {
  const mobileNavOpen = useBoolean();

  const layoutQuery: Breakpoint = 'md';

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderBase
          disableElevation
          layoutQuery={layoutQuery}
          onOpenNav={mobileNavOpen.onTrue}
          slotsDisplay={{
            signIn: false,
            account: false,
            contacts: false,
            searchbar: false,
            workspaces: false,
            menuButton: false,
            localization: false,
            notifications: false,
            helpLink: false,
            purchase: false,
          }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
          }}
          slotProps={{ container: { maxWidth: false } }}
          sx={{ position: { [layoutQuery]: 'fixed' } }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-auth-content-width': '420px',
      }}
      sx={{
        ...sx,
      }}
    >
      <Main
        sx={{ bgcolor: (theme) => theme.palette.background.paper, opacity: 1 }}
        layoutQuery={layoutQuery}
      >
        {children}
      </Main>
    </LayoutSection>
  );
}
