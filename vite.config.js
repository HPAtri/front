import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    https:false,
    hotOnly:false,
    proxy:{
        '/api':{
            target:'https://lianghj.top:8888/api/private/v1/',
            changeOrigin:true,
            rewrite:(path)=>path.replace(/^\/api/,""),
            }
        }
    }
}
)
