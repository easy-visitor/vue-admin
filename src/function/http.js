import axios from 'axios';
import {Message} from 'element-ui';
import store from '../store';
import toast from './toast';

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://www.zht168.local/api.php?s=';
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = 'http://www.zht168.local/api.php';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'https://www.zht168.cn';
}

axios.interceptors.request.use(config => {//请求之前(可以设置token)
    return config
}, error => {
    toast.error(error);
    return Promise.reject(error);
});
axios.interceptors.response.use(response => {//数据拿到之后
    return response.data
}, error => {
    toast.error('Http请求失败，请联系管理员');
    return Promise.reject(error.response);
});

function error(res) {
    if (res.code != 200) {
        toast.error(res.message);
        return res;
    }
}

export default {
    axios: axios,
    request(method, url, data, callback) {
        return axios({
            method: method,
            url,
            data: data,
            withCredentials: true,
            timeout: 5000,//响应时间
            headers: {
                'token': store.state.token
            }
        }).then(res => {
            if (res.code == 0) {
                toast.error(res.msg);
                return
            }
            return callback(res)
        }, err => {
            return error(err);
        })
    }
}
