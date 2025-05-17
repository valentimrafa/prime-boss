"use client";

import React, { PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById("portal-root")!;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="flex items-center justify-center absolute top-3 right-3 text-2xl font-bold text-gray-700 hover:text-gray-900 cursor-pointer rounded-full w-6 h-6"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
