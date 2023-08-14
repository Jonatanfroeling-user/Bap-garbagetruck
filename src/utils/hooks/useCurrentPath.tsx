import { useMemo } from "react";

// lightweight utility. Could be merged with the custom useLocation but this would not be optimal
export function useCurrentPath() {
  const [currentPath, currentPage, id] = useMemo(() => {
    const match = window.location.href.match(/\/#\/([^?]+)/);
    const pageTitle = match ? match[1] : "";
    const path = `/${pageTitle}`;
    const id = window.location.href.split("id=")[1] ?? null;

    return [path, pageTitle, id];
  }, [window.location.href]);

  const isActivePage = (_path: string) => currentPath.includes(_path);

  return {
    id,
    currentPath: currentPath,
    currentPage: currentPage,
    isActivePage: isActivePage,
  };
}
