import axios from 'axios';

export const serverIns = axios.create({
    baseURL: 'http://127.0.0.1:8080/pizzaexpress/',
    timeout: 1000,
    headers: { 'X-Custom-Header': '' }
})

//请求拦截处理
// instance.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });

//返回拦截处理
// instance.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response;
// }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
// });


// export const serverReq = async (api, params, method) => {
//     console.log('serverReq', api, params, method)
//     return new Promise((resolve, reject) => {
//         if (method == 'post') {
//             instance.post(api, params)
//                 .then(res => {
//                     resolve(res.data)
//                 })
//                 .catch(error => {
//                     reject(error)
//                 })
//         } else if (method == 'get') {
//             instance.get(api, params)
//                 .then(res => {
//                     resolve(res.data)
//                 })
//                 .catch(error => {
//                     reject(error)
//                 })
//         } else if (method == 'put') {
//             instance.put(api, params)
//                 .then(res => {
//                     resolve(res.data)
//                 })
//                 .catch(error => {
//                     reject(error)
//                 })
//         }

//     })
// };