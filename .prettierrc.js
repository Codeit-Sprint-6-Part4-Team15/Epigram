module.exports = {
  printWidth: 200,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.ts",
  importOrder: ["^react", "<THIRD_PARTY_MODULES>", "^@/src/apis/(.*)$", "^@/src/hooks/(.*)$", "^@/src/app/(.*)$", "^@/src/components/(.*)$", "^@/src/styles/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importSortOrder: ["asc", "desc"],
};
