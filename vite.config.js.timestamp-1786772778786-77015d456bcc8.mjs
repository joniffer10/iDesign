// vite.config.js
import { defineConfig } from "file:///C:/Users/Jmakes/OneDrive/Documents/codethingz/Idesign/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Jmakes/OneDrive/Documents/codethingz/Idesign/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\Jmakes\\OneDrive\\Documents\\codethingz\\Idesign";
var vite_config_default = defineConfig(({ mode }) => {
  const isLib = mode === "lib";
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    ...isLib ? {
      build: {
        lib: {
          entry: path.resolve(__vite_injected_original_dirname, "src/index.js"),
          name: "Idesign",
          fileName: (format) => `idesign.${format}.js`
        },
        rollupOptions: {
          external: ["vue"],
          output: {
            globals: { vue: "Vue" },
            assetFileNames: "idesign.[ext]"
          }
        }
      }
    } : {}
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxKbWFrZXNcXFxcT25lRHJpdmVcXFxcRG9jdW1lbnRzXFxcXGNvZGV0aGluZ3pcXFxcSWRlc2lnblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcSm1ha2VzXFxcXE9uZURyaXZlXFxcXERvY3VtZW50c1xcXFxjb2RldGhpbmd6XFxcXElkZXNpZ25cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0ptYWtlcy9PbmVEcml2ZS9Eb2N1bWVudHMvY29kZXRoaW5nei9JZGVzaWduL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBpc0xpYiA9IG1vZGUgPT09ICdsaWInXG5cbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbdnVlKCldLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJylcbiAgICAgIH1cbiAgICB9LFxuICAgIC4uLihpc0xpYlxuICAgICAgPyB7XG4gICAgICAgICAgYnVpbGQ6IHtcbiAgICAgICAgICAgIGxpYjoge1xuICAgICAgICAgICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC5qcycpLFxuICAgICAgICAgICAgICBuYW1lOiAnSWRlc2lnbicsXG4gICAgICAgICAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgaWRlc2lnbi4ke2Zvcm1hdH0uanNgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgICBleHRlcm5hbDogWyd2dWUnXSxcbiAgICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsczogeyB2dWU6ICdWdWUnIH0sXG4gICAgICAgICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdpZGVzaWduLltleHRdJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICA6IHt9KVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErVixTQUFTLG9CQUFvQjtBQUM1WCxPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sUUFBUSxTQUFTO0FBRXZCLFNBQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFBQSxJQUNmLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFBQSxJQUNBLEdBQUksUUFDQTtBQUFBLE1BQ0UsT0FBTztBQUFBLFFBQ0wsS0FBSztBQUFBLFVBQ0gsT0FBTyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLFVBQzdDLE1BQU07QUFBQSxVQUNOLFVBQVUsQ0FBQyxXQUFXLFdBQVcsTUFBTTtBQUFBLFFBQ3pDO0FBQUEsUUFDQSxlQUFlO0FBQUEsVUFDYixVQUFVLENBQUMsS0FBSztBQUFBLFVBQ2hCLFFBQVE7QUFBQSxZQUNOLFNBQVMsRUFBRSxLQUFLLE1BQU07QUFBQSxZQUN0QixnQkFBZ0I7QUFBQSxVQUNsQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixJQUNBLENBQUM7QUFBQSxFQUNQO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
