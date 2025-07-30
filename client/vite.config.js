import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// // Replace these with your machine's LAN IP and your API port
// const HOST_IP = "192.168.35.41";  // <--- your computer's IP on Wi‑Fi
// const API_PORT = 3001;           // <--- your backend's port

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   host: true,        // or "0.0.0.0": listen on LAN, not just localhost
  //   port: 5173,        // default Vite port; change if you like
  //   // If your frontend calls /api/... we forward it to your backend:
  //   proxy: {
  //     "/api": {
  //       target: `http://${HOST_IP}:${API_PORT}`,
  //       changeOrigin: true,
  //     },
  //   },
  //   // Sometimes HMR needs this on other devices; if dev updates don’t show up, uncomment:
  //   // hmr: { host: HOST_IP, clientPort: 5173 },
  // },
});
