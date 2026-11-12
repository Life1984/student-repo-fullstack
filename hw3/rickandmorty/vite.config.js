import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

//Enable -> Ract JSX transform and development refresh support
export default defineConfig({
  plugins: [react()],
});
