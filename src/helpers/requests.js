import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] =
        localStorage.getItem('token');
}

const auth = async (name = '', password = '') => {
    const resp = await axios.post('/auth', {
        name,
        password,
    });
    const data = resp.data;
    return data;
};

const checkLogued = async (token = '') => {
    const resp = await axios.post('/auth/lookup', {
        token,
    });
    const data = resp.data;
    return data;
};

const getEstadistica = async () => {
    const resp = await axios.get('/estadistica');
    const data = resp.data;
    return data;
};

export default {
    auth,
    checkLogued,
    getEstadistica,
};
