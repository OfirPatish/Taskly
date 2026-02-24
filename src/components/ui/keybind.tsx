import { Kbd } from "@chakra-ui/react";
import { useSyncExternalStore } from "react";

/**
 * Platform-aware keybind display using Chakra Kbd. Mac: ⌘ | Win/Linux: Ctrl.
 */
const subscribe = () => () => {};
const getSnapshot = () =>
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform);
const getServerSnapshot = () => false;

const formatPart = (key: string, modKey: string): string => {
  const k = key.trim().toLowerCase();
  if (k === "mod" || k === "meta") return modKey;
  if (k === "shift") return "Shift";
  if (k === "enter") return "Enter";
  return key;
};

interface KeybindProps {
  keys: string;
  size?: "sm" | "md" | "lg";
}

export const Keybind = ({ keys, size = "sm" }: KeybindProps) => {
  const isMac = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const modKey = isMac ? "⌘" : "Ctrl";
  const parts = keys.split(/\+/).map((p) => formatPart(p, modKey));

  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && <span style={{ margin: "0 2px" }}>+</span>}
          <Kbd size={size}>{part}</Kbd>
        </span>
      ))}
    </>
  );
};
