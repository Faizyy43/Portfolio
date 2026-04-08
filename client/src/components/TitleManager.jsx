import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      document.title = "Faizan — Full Stack Developer";
    } else if (path === "/contact") {
      document.title = "Faizan — Contact";
    } else if (path === "/about") {
      document.title = "Faizan — About";
    } else if (path === "/projects") {
      document.title = "Faizan - Projects";
    } else {
      document.title = "Faizan";
    }
  }, [location]);

  return null;
}
