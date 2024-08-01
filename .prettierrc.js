module.exports = {
  arrowParens: "always",
  endOfLine: "lf",
  printWidth: 80,
  quoteProps: "as-needed",
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.ts",
  importOrder: ["^react", "<THIRD_PARTY_MODULES>", "^@/src/apis/(.*)$", "^@/src/hooks/(.*)$", "^@/src/app/(.*)$", "^@/src/components/(.*)$", "^@/src/styles/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ],

  tailwindConfig: "./tailwind.config.ts",
};
