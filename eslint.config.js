import nextConfig from "eslint-config-next";

export default [
  ...nextConfig,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      // Common SSR hydration pattern (setIsMounted in useEffect) is intentional
      "react-hooks/set-state-in-effect": "off",
      // Math.random in useMemo is acceptable for stable random values
      "react-hooks/purity": "off",
      // Unescaped entities in JSX are handled by the build; disable for readability
      "react/no-unescaped-entities": "off",
      // Anonymous default exports in config files are fine
      "import/no-anonymous-default-export": "off",
    },
  },
];
