// lightweight utility. Could be merged with the custom useLocation but this would not be optimal
export function useCurrentPath() {
  const path = window.location.hash?.split("#")[1] ?? "";

  const isActivePage = (_path: string) => path === _path;
  const extractPath = (_path: string) => _path.split("/")[1];

  return {
    currentPath: path,
    currentPage: path.split("/")[1],
    isActivePage: isActivePage,
    extractPath: extractPath,
  };
}
