'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Group,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from '@tabler/icons-react';
import DashboardSidebar from './DashboardSidebar';
import NotificationBell from '@/components/ui/header/components/NotificationBell';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';

type DashboardShellProps = {
  children: ReactNode;
};

export default function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false);
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { roles, isLoading, isAuthResolved } = useGlobalProfile();

  const isAdmin = roles.includes('admin');
  const shouldBlock = isAuthResolved && !isLoading && !isAdmin;
  const shouldShowLoading = !isAuthResolved || isLoading;

  useEffect(() => {
    if (!isAuthResolved || isLoading) return;
    if (isAdmin) return;

    router.replace(`/${locale}`);
  }, [isAdmin, isAuthResolved, isLoading, locale, router]);

  return (
    <>
      <AppShell
        header={{ height: 55 }}
        navbar={{
          width: 300,
          breakpoint: 'md',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding={10}
        styles={{
          header: {
            background: '#ffffff',
            borderBottom: '1px solid #eef2f7',
          },
          main: {
            background: '#f8fafc',
          },
          navbar: {
            background: '#ffffff',
            borderInlineEnd: '1px solid #eef2f7',
          },
        }}
      >
        <AppShell.Header px="lg">
          <Group h="100%" justify="space-between" wrap="nowrap">
            <Group gap={6} wrap="nowrap">
              <Burger
                hiddenFrom="md"
                opened={mobileOpened}
                onClick={toggleMobile}
                size="sm"
                aria-label="Toggle sidebar"
              />

              <Text size="sm" className='flex items-center gap-2' fw={600} c="#334155">
              <img
                src="https://app.foresighta.co/assets/media/LOGO-KNOLD/KNOLDG-01.png"
                alt="Insighta Business Logo"
                style={{ height: 40, width: 'auto', objectFit: 'contain', marginRight: 8 }}
              />
              </Text>
            </Group>

            <NotificationBell parent="app" />
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p={0}>
          <DashboardSidebar
            locale={locale}
            pathname={pathname}
            onNavigate={closeMobile}
            onToggleCollapse={toggleDesktop}
          />
        </AppShell.Navbar>

        <AppShell.Main>
          <Box p="sm">{children}</Box>
        </AppShell.Main>
      </AppShell>

      {(shouldShowLoading || shouldBlock) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="text-center">
            <div className="animate-pulse mb-4">
              <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin mx-auto"></div>
            </div>
            <p className="text-gray-600">{shouldBlock ? 'Redirecting…' : 'Loading…'}</p>
          </div>
        </div>
      )}
    </>
  );
}
