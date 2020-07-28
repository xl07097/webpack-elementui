import axios from 'axios';

let fetch = axios.create({
    baseURL: 'http://localhost:9087/note/',
    timeout: 10000,
    withCredentials: true,
})


export default fetch;
