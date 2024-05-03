import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: 'auto' }); // 스크롤을 즉시 맨 위로 이동
    window.scroll(0, 0);

  }, [pathname]);

  return null;
}
