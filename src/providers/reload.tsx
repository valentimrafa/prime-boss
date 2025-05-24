"use client";

import { createContext, useContext, useEffect } from "react";

const PageReloadContext = createContext({});

export const PageReloadProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageReloadContext.Provider value={{}}>
      {children}
    </PageReloadContext.Provider>
  );
};

export const usePageReload = () => useContext(PageReloadContext);
