import axios from 'axios';

let fetch = axios.create({
    baseURL: 'https://tomcat.zhiqiuge.com/note/',
    timeout: 10000,
    withCredentials: true,
})


export default fetch;
