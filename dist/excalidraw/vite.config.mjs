import { defineConfig, loadEnv } from "vite";
// To load .env.local variables
const envVars = loadEnv("", `../../`);
// https://vitejs.dev/config/
export default defineConfig({
    root: "example/public",
    server: {
        port: 3001,
        // open the browser
        open: true,
    },
    publicDir: "public",
});
