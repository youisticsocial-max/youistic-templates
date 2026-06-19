import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'logo-placeholder-interceptor',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.includes('LOGO_URL')) {
             console.log('Intercepted request:', req.url);
          }
          // Check for URL encoded token {{LOGO_URL}}
          if (req.url === '/%7B%7BLOGO_URL%7D%7D' || req.url === '/{{LOGO_URL}}') {
            const logoPath = path.resolve(process.cwd(), 'public/assets/logo.png');
            if (fs.existsSync(logoPath)) {
              res.setHeader('Content-Type', 'image/png');
              fs.createReadStream(logoPath).pipe(res);
              return;
            }
          }
          next();
        });
      }
    }
  ],
})
