import { build } from 'vite';
import { resolve } from 'path';

async function optimize() {
    try {
        await build({
            configFile: resolve(__dirname, '../vite.config.ts'),
            mode: 'production',
            build: {
                minify: 'terser',
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

optimize();