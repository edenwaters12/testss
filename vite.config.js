import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

// import path from "path";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   build: {
//     // Optional: Adjust chunk size limit
//     chunkSizeWarningLimit: 1000, // Set to a higher value if needed
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           // This function allows you to split the code into separate chunks
//           if (id.includes("node_modules")) {
//             return id.toString().split("node_modules/")[1].split("/")[0].toString();
//           }
//         },
//       },
//     },
//   },
// });
