import { useState, useEffect } from "react";
import { EXPERIENCE_CONSTANTS } from "@/lib/experience-utils";

export const useResponsiveLayout = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(
        window.innerWidth < EXPERIENCE_CONSTANTS.BREAKPOINTS.TABLET
      );
      setIsMobileScreen(
        window.innerWidth < EXPERIENCE_CONSTANTS.BREAKPOINTS.MOBILE
      );
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return { isSmallScreen, isMobileScreen };
};
