import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

const tseslintConfig = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);

/**
 * @type {import("@typescript-eslint/utils/dist/ts-eslint").FlatConfig.ConfigArray}
 */
const config = [
  ...tseslintConfig,
  {
    ignores: ["dist/*"],
  },
];

export default config;
