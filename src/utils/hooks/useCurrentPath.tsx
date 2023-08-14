// lightweight utility. Could be merged with the custom useLocation but this would not be optimal
export function useCurrentPath() {
  const match = window.location.href.match(/\/#\/([^?]+)/);
  const pageTitle = match ? match[1] : "";
  const path = `/${pageTitle}`;

  const isActivePage = (_path: string) => path.includes(_path);

  return {
    currentPath: path,
    currentPage: pageTitle,
    isActivePage: isActivePage,
  };
}
