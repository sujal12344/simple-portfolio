"use client";
import { useState, useEffect, useRef } from "react";

export const useSocialPanel = () => {
  const [showDesktopSocial, setShowDesktopSocial] = useState(false);
  const [showMobileSocial, setShowMobileSocial] = useState(false);

  const desktopPanelRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const avatarDesktopRef = useRef<HTMLButtonElement>(null);
  const avatarMobileRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        showDesktopSocial &&
        desktopPanelRef.current &&
        !desktopPanelRef.current.contains(e.target as Node) &&
        avatarDesktopRef.current &&
        !avatarDesktopRef.current.contains(e.target as Node)
      ) {
        setShowDesktopSocial(false);
      }

      if (
        showMobileSocial &&
        mobilePanelRef.current &&
        !mobilePanelRef.current.contains(e.target as Node) &&
        avatarMobileRef.current &&
        !avatarMobileRef.current.contains(e.target as Node)
      ) {
        setShowMobileSocial(false);
      }
    };

    const handleScroll = () => {
      if (showDesktopSocial) setShowDesktopSocial(false);
      if (showMobileSocial) setShowMobileSocial(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showDesktopSocial, showMobileSocial]);

  return {
    showDesktopSocial,
    setShowDesktopSocial,
    showMobileSocial,
    setShowMobileSocial,
    desktopPanelRef,
    mobilePanelRef,
    avatarDesktopRef,
    avatarMobileRef,
  };
};
