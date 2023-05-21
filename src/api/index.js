// 当前这个模块：API进行统一管理
import requests from "./request";

// // 注册用户的接口
// // 发请求:axios发请求返回结果是Promise对象
// export const reqRegister = (username, password) => {
//     let params = new URLSearchParams();
//     params.append('username', username);
//     params.append('password', password);
//     return requests.post('/question_box_war/registerServlet', params);
// }

// 登录的接口
// 发请求:axios发请求返回结果是Promise对象
export const reqLogin = (username, password) => {
    let params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    return requests.post('/loginServlet', params);
}

// // 更改密码的接口
// export const reqChangePassword = (userName, nowPassword, newPassword) => {
//     let params = new URLSearchParams();
//     params.append('username', userName);
//     params.append('nowPassword', nowPassword);
//     params.append('newPassword', newPassword);
//     return requests.post('/changePasswordServlet', params);
// }

// 向服务器发送图片的窗口
export const reqSendImg = (img) => {
    let params = new URLSearchParams();
    params.append('img', img);
    return requests.post('/sendImg', params);
}

export const reqGetProcess = () => {
    return requests.get('/getProcess');
}



