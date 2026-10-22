"use client";
import { useEffect, type ReactNode } from "react";

interface SidebarOverlayProps {
  id: string;
  open: boolean;
  side: "left" | "right";
  label: string;
  onClose: () => void;
  children?: ReactNode;
}

export default function SidebarOverlay({id, open, side, label, onClose, children,}: SidebarOverlayProps) {

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const position = side === "left" ? "left-0" : "right-0";
  const hidden = side === "left" ? "-translate-x-full" : "translate-x-full";

  return (
    <>

      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-x-0 bottom-0 top-[55px] z-[2000] bg-black/50 backdrop-blur-sm transition-[opacity,visibility] duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <aside
        id={id}
        aria-label={label}
        aria-hidden={!open}
        className={`fixed bottom-0 top-[55px] z-[2100] w-[min(85vw,285px)] overflow-y-auto bg-sidebar p-5  shadow-2xl transition-[transform,translate,visibility] duration-300 ease-out ${position} ${
          open ? "visible translate-x-0" : `invisible ${hidden}`
        }`}
      >
        {children}
      </aside>
    </>
  );
}