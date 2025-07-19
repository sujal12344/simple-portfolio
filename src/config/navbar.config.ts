export interface NavbarConfig {
  layout: {
    desktop: {
      container: string;
      logoSection: string;
      themeSection: string;
    };
    mobile: {
      container: string;
      header: string;
      controls: string;
    };
  };
  styling: {
    scrolled: string;
    default: string;
    mobileScrolled: string;
    mobileDefault: string;
  };
  animations: {
    mobileMenu: {
      initial: { opacity: number; height: number | string };
      animate: { opacity: number; height: number | string };
      exit: { opacity: number; height: number | string };
      transition: { duration: number };
    };
  };
}

export const navbarConfig: NavbarConfig = {
  layout: {
    desktop: {
      container:
        "sm:flex hidden w-full fixed py-3 sm:py-4 px-4 sm:px-6 justify-between items-center z-50 transition-all duration-500 lg:px-20 xl:px-32 2xl:px-40",
      logoSection: "w-auto sm:w-1/3 flex items-center",
      themeSection: "flex-shrink-0",
    },
    mobile: {
      container: "sm:hidden fixed top-0 left-0 right-0 z-50 p-3",
      header: "flex justify-between items-center",
      controls: "flex items-center space-x-1",
    },
  },
  styling: {
    scrolled:
      "bg-background/95 backdrop-blur-md shadow-md border-b border-primary/10",
    default: "bg-background/50 backdrop-blur-sm",
    mobileScrolled: "bg-background/95 backdrop-blur-md shadow-sm",
    mobileDefault: "bg-background/70 backdrop-blur-sm",
  },
  animations: {
    mobileMenu: {
      initial: { opacity: 0, height: 0 },
      animate: { opacity: 1, height: "auto" },
      exit: { opacity: 0, height: 0 },
      transition: { duration: 0.3 },
    },
  },
};
