"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { NavLinks, PersonalData } from "../../../data/data";
import { navbarConfig } from "@/config/navbar.config";
import { useNavigation } from "@/hooks/useNavigation";
import { useSocialPanel } from "@/hooks/useSocialPanel";
import {
  SocialPanel,
  NavAvatar,
  NavLinks as NavLinksComponent,
  ThemeToggle,
  MobileMenu,
} from "@/components/navbar";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { activeSection, isScrolled, scrollToSection, setActiveSection } =
    useNavigation(NavLinks);
  const {
    showDesktopSocial,
    setShowDesktopSocial,
    showMobileSocial,
    setShowMobileSocial,
    desktopPanelRef,
    mobilePanelRef,
    avatarDesktopRef,
    avatarMobileRef,
  } = useSocialPanel();

  const { name, links } = PersonalData;
  const { github, twitter, linkedin, resume, linktree } = links;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const handleLinkClick = (targetId: string) => {
    setActiveSection(targetId);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    scrollToSection(targetId);
  };

  const handleMobileLinkClick = (targetId: string) => {
    setActiveSection(targetId);
    setIsMobileMenuOpen(false);
    setTimeout(() => scrollToSection(targetId), 100);
  };

  const { layout, styling } = navbarConfig;

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`${layout.desktop.container} ${
          isScrolled ? styling.scrolled : styling.default
        }`}
      >
        <div className={layout.desktop.logoSection}>
          <div className="relative">
            <NavAvatar
              ref={avatarDesktopRef}
              name={name}
              githubUrl={github}
              initials={initials}
              onClick={() => setShowDesktopSocial(!showDesktopSocial)}
              variant="desktop"
            />

            <SocialPanel
              isVisible={showDesktopSocial}
              onClose={() => setShowDesktopSocial(false)}
              variant="desktop"
              links={{ github, twitter, linkedin, resume, linktree }}
              panelRef={desktopPanelRef}
            />
          </div>
        </div>

        <NavLinksComponent
          links={NavLinks}
          activeSection={activeSection}
          onLinkClick={handleLinkClick}
        />

        <div className={layout.desktop.themeSection}>
          <ThemeToggle variant="desktop" />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className={`${layout.mobile.container} ${
          isScrolled ? styling.mobileScrolled : styling.mobileDefault
        }`}
      >
        <div className={layout.mobile.header}>
          <div className="flex items-center space-x-2">
            <NavAvatar
              ref={avatarMobileRef}
              name={name}
              githubUrl={github}
              initials={initials}
              onClick={() => setShowMobileSocial(!showMobileSocial)}
              variant="mobile"
            />
          </div>

          <div className={layout.mobile.controls}>
            <ThemeToggle variant="mobile" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="h-8 w-8"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          links={NavLinks}
          activeSection={activeSection}
          socialLinks={{ github, twitter, linkedin, resume }}
          onLinkClick={handleMobileLinkClick}
        />

        <SocialPanel
          isVisible={showMobileSocial}
          onClose={() => setShowMobileSocial(false)}
          variant="mobile"
          links={{ github, twitter, linkedin, resume, linktree }}
          panelRef={mobilePanelRef}
        />
      </nav>
    </>
  );
};

export default Navbar;
