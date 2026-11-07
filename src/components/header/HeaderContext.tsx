"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getHeaderConfigForPath } from "./header-config.mjs";
import { DEFAULT_HEADER_CONFIG, type HeaderConfig } from "./header-config-data";

type HeaderEntry = { path: string; config: HeaderConfig };
type HeaderContextValue = {
  entry: HeaderEntry | null;
  publish: (path: string, config: HeaderConfig) => void;
  clear: (path: string) => void;
};

const HeaderContext = createContext<HeaderContextValue | null>(null);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [entry, setEntry] = useState<HeaderEntry | null>(null);

  const publish = useCallback((path: string, config: HeaderConfig) => {
    setEntry({ path, config });
  }, []);

  const clear = useCallback((path: string) => {
    setEntry((current) => current?.path === path ? null : current);
  }, []);

  const value = useMemo(
    () => ({ entry, publish, clear }),
    [entry, publish, clear],
  );

  return (
    <HeaderContext.Provider value={value}>
      {children}
    </HeaderContext.Provider>
  );
}

function useHeaderContext() {
  const context = useContext(HeaderContext);
  if (!context) throw new Error("HeaderProvider fehlt");
  return context;
}

export function useHeaderConfig(pathname: string): HeaderConfig {
  const { entry } = useHeaderContext();
  return getHeaderConfigForPath(entry, pathname) ?? DEFAULT_HEADER_CONFIG;
}

/** Publish serializable page data to the persistent root-layout header. */
export function HeaderConfigPublisher({
  path,
  config,
}: {
  path: string;
  config: HeaderConfig;
}) {
  const { publish, clear } = useHeaderContext();

  useEffect(() => {
    publish(path, config);
    return () => clear(path);
  }, [path, config, publish, clear]);

  return null;
}
