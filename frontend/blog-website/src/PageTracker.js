import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ScrollContext } from "./context/ScrollProvider";

const PageTracker = (params) => {
  const location = useLocation();
  const previousLocation = useRef(location.pathname);
  const {scroll, setScroll} = useContext(ScrollContext)

  useEffect(() => {
    if (previousLocation.current !== location.pathname && params.pages.includes(location.pathname)) {
        setTimeout(() => {window.scrollTo(0, scroll[location.pathname])}, 100);
    }
    previousLocation.current = location.pathname;
  }, [location]);

  return null; 
};

export default PageTracker;
