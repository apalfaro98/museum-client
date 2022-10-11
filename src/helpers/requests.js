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

const getArmas = async () => {
    const resp = await axios.get('/armas');
    const data = resp.data;
    return data;
};

const getNaturales = async () => {
    const resp = await axios.get('/naturales');
    const data = resp.data;
    return data;
};

const getPrestamos = async () => {
    const resp = await axios.get('/prestamos');
    const data = resp.data;
    return data;
};

const getOnePrestamo = async (id) => {
    const resp = await axios.get(`/prestamos/${id}`);
    const data = resp.data;
    return data;
};

export default {
    auth,
    checkLogued,
    getEstadistica,
    getArmas,
    getEstadistica,
    getNaturales,
    getPrestamos,
    getOnePrestamo,
};
