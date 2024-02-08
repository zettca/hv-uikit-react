import { dirname, join } from "node:path";
import { mergeConfig } from "vite";
import { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

import viteConfig from "./vite.config";

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

export default {
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  stories: [
    "../docs/**/*.mdx",
    "../docs/**/*.stories.tsx",
    "../packages/**/src/**/*.stories.tsx",
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: true,
  },
  addons: [
    getAbsolutePath("@storybook/addon-controls"),
    getAbsolutePath("@storybook/addon-toolbars"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-links"),
    __dirname + "/addons/version-selector",
    __dirname + "/addons/theme-selector",
    __dirname + "/addons/mode-selector",
  ],
  features: {},
  staticDirs: [
    "./assets",
    {
      from: "../packages/icons/sprites/icons.svg",
      to: "assets/icons.svg",
    },
    {
      from: "../packages/icons/sprites/pictograms.svg",
      to: "assets/pictograms.svg",
    },
  ],
  async viteFinal(config) {
    return mergeConfig(config, viteConfig);
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      tsconfigPath: "../tsconfig.json",
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  },
} as StorybookConfig;
