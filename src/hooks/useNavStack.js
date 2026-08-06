import { useState } from "react";

/**
 * Browser-history-style navigation for the app's page state, so the
 * topbar's back/forward buttons actually work instead of being decorative.
 *
 * goTo(pageId, filterTag) goes to a page and optionally pre-selects a filter
 * tab on it (e.g. Home's "Top Hits" card -> playlist-hub page, "Top" tab
 * pre-selected). Always set together so a stale filter from a previous card
 * click never leaks into an unrelated page. It also drops any "forward"
 * entries past the current point, same as real browser history.
 *
 * onNavigate is an optional side-effect fired on every goTo (e.g. closing
 * the mobile nav drawer).
 */
export function useNavStack(initialPage = "home", { onNavigate } = {}) {
  const [page, setPage] = useState(initialPage);
  const [pendingFilter, setPendingFilter] = useState(null);
  const [nav, setNav] = useState({ stack: [{ page: initialPage, filter: null }], index: 0 });

  const goTo = (pageId, filterTag = null) => {
    setPendingFilter(filterTag);
    setPage(pageId);
    onNavigate?.();
    setNav((n) => {
      const stack = n.stack.slice(0, n.index + 1);
      stack.push({ page: pageId, filter: filterTag });
      return { stack, index: stack.length - 1 };
    });
  };

  const canGoBack = nav.index > 0;
  const canGoForward = nav.index < nav.stack.length - 1;

  const goBack = () => {
    if (!canGoBack) return;
    const idx = nav.index - 1;
    const entry = nav.stack[idx];
    setPendingFilter(entry.filter);
    setPage(entry.page);
    setNav((n) => ({ ...n, index: idx }));
  };

  const goForward = () => {
    if (!canGoForward) return;
    const idx = nav.index + 1;
    const entry = nav.stack[idx];
    setPendingFilter(entry.filter);
    setPage(entry.page);
    setNav((n) => ({ ...n, index: idx }));
  };

  return { page, pendingFilter, goTo, goBack, goForward, canGoBack, canGoForward };
}
