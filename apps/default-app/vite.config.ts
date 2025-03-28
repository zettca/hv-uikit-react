import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { HvAppShellVitePlugin } from "@hitachivantara/app-shell-vite-plugin";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    HvAppShellVitePlugin({
      mode,
      type: "app",
      modules: [
        "src/pages/AssetInventory",
        "src/pages/ListView",
        "src/pages/Notifications",
        "src/pages/Details",
        "src/pages/Breadcrumb",
        "src/pages/Navigation",
        "src/pages/Theming",
        "src/pages/TabLayout",
        "src/headerActions/HelloDefaultApp",
        "src/providers/DefaultAppProvider",
        "src/headerActions/ChangeContextValue",
        "src/pages/DisplayDefaultAppContext",
      ],
    }),
  ],
  server: { port: 5181 },
  preview: { port: 5181 },
}));
