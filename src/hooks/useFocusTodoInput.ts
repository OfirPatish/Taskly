import { useRef, useEffect } from "react";

const FOCUS_SHORTCUT_KEY = "k";

export const useFocusTodoInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === FOCUS_SHORTCUT_KEY) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return inputRef;
};
