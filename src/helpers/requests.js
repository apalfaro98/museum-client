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

const createArma = async (arma = {}, image) => {
    const resp = await axios.post(
        '/armas',
        {
            ...arma,
            image,
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    const data = resp.data;
    return data;
};

const updateArma = async (arma = {}) => {
    const resp = await axios.put(`/armas/${arma._id}`, {
        ...arma,
    });
    const data = resp.data;
    return data;
};

const deleteArma = async (id) => {
    const resp = await axios.delete(`/armas/${id}`);
    const data = resp.data;
    return data;
};
const createNatural = async (natural = {}, image) => {
    const resp = await axios.post(
        '/naturales',
        {
            ...natural,
            image,
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    const data = resp.data;
    return data;
};

const updateNatural = async (natural = {}) => {
    const resp = await axios.put(`/naturales/${natural._id}`, {
        ...natural,
    });
    const data = resp.data;
    return data;
};

const deleteNatural = async (id) => {
    const resp = await axios.delete(`/naturales/${id}`);
    const data = resp.data;
    return data;
};
const createPrestamo = async (prestamo = {}) => {
    const resp = await axios.post('/prestamos', prestamo);
    const data = resp.data;
    return data;
};

const updatePrestamo = async (prestamo = {}) => {
    const resp = await axios.put(`/prestamos/${prestamo._id}`, prestamo);
    const data = resp.data;
    return data;
};

const deletePrestamo = async (id) => {
    const resp = await axios.delete(`/prestamos/${id}`);
    const data = resp.data;
    return data;
};

const getTransferencias = async () => {
    const resp = await axios.get('/transferencias');
    const data = resp.data;
    return data;
};
const getOneTransferencia = async (id) => {
    const resp = await axios.get(`/transferencias/${id}`);
    const data = resp.data;
    return data;
};

const createTransferencia = async (transferencia = {}) => {
    const resp = await axios.post('/transferencias', transferencia);
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
    createArma,
    updateArma,
    deleteArma,
    createNatural,
    updateNatural,
    deleteNatural,
    createPrestamo,
    updatePrestamo,
    deletePrestamo,
    getTransferencias,
    createTransferencia,
    getOneTransferencia,
};
