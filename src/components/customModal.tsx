import { useState, useEffect, useCallback } from "react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function CustomModal({
  isOpen,
  onClose,
  title,
  children,
}: CustomModalProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setLoaded(true), 100);
    } else {
      setLoaded(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setLoaded(false);
    setTimeout(() => onClose(), 200);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: { key: string }) => {
      if (e.key === "Escape" || e.key === "Esc") {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`bg-opacity-50 fixed inset-0 z-[999] flex items-center justify-center bg-white/20 backdrop-blur-xl duration-300 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`z-[90] w-11/12 max-w-2xl rounded-2xl bg-white p-6 shadow-lg shadow-black/30 ${
          loaded
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-full scale-90 opacity-0"
        } duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={handleClose}
            className="text-3xl text-gray-600 hover:cursor-pointer hover:text-gray-800 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
