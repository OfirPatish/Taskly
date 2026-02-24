import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Professional teal accent – modern, clean, solid (no gradients)
const brand = {
  50: { value: "#f0fdfa" },
  100: { value: "#ccfbf1" },
  200: { value: "#99f6e4" },
  300: { value: "#5eead4" },
  400: { value: "#2dd4bf" },
  500: { value: "#14b8a6" },
  600: { value: "#0d9488" },
  700: { value: "#0f766e" },
  800: { value: "#115e59" },
  900: { value: "#134e4a" },
  950: { value: "#042f2e" },
};

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        accent: brand,
        brand,
      },
    },
    semanticTokens: {
      colors: {
        "accent.solid": { value: "{colors.accent.500}" },
        "accent.contrast": { value: "{colors.white}" },
        "accent.muted": { value: "{colors.accent.100}" },
        "accent.subtle": { value: "{colors.accent.200}" },
        "accent.fg": { value: "{colors.accent.700}" },
        "accent.emphasized": { value: "{colors.accent.600}" },
        "accent.focusRing": { value: "{colors.accent.500}" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
