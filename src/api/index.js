// 当前这个模块：API进行统一管理
import requests from "./request";

// 向服务器发送图片的窗口
export const reqGetEntity = () => {
    return requests.get('/api');
}





