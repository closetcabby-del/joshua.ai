import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["app/**/*.tsx", "components/**/*.tsx"],
    rules: {
      // Native document navigation avoids the deployed Vinext Link runtime error.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  globalIgnores([
    ".next/**",
    ".agents/**",
    "motion/**",
    "outputs/**",
    "public/vendor/**",
    "work/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
  ]),
]);
