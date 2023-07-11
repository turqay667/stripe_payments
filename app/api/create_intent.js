import proxy from "http-proxy-middleware";
import {createProxyMiddleware} from "http-proxy-middleware";
const proxyOptions={
    target:'http://localhost:3000',
    changeOrigin: true,
    pathRewrite:{
     '^/api':'/api',
     }

}
const apiProxy=createProxyMiddleware(proxyOptions); 
export default apiProxy;