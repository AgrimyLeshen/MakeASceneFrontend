"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Header from "@/components/header/Header";
import { HeaderProvider, useHeaderConfig } from "@/components/header/HeaderContext";
import ThemeScope from "@/components/ui/ThemeScope";

function AppContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const config = useHeaderConfig(pathname);
  const hideHeader = pathname === "/login" || pathname === "/register";

  return (
    <ThemeScope themeId={config.themeId}>
      {!hideHeader && <Header />}
      {children}
    </ThemeScope>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <HeaderProvider>
      <AppContent>{children}</AppContent>
    </HeaderProvider>
  );
}
