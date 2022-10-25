import axios from 'axios';

const museoApi = axios.create({
    baseURL: 'http://localhost:3000/api',
});

museoApi.interceptors.request.use((config) => {
    config.headers['Authorization'] = localStorage.getItem('token');

    return config;
});

const auth = async (name = '', password = '') => {
    const resp = await museoApi.post('/auth', {
        name,
        password,
    });
    const data = resp.data;
    return data;
};

const checkLogued = async (token = '') => {
    const resp = await museoApi.post('/auth/lookup', {
        token,
    });
    const data = resp.data;
    return data;
};

const getEstadistica = async () => {
    const resp = await museoApi.get('/estadistica');
    const data = resp.data;
    return data;
};

const getArmas = async () => {
    const resp = await museoApi.get('/armas');
    const data = resp.data;
    return data;
};

const getNaturales = async () => {
    const resp = await museoApi.get('/naturales');
    const data = resp.data;
    return data;
};

const getPrestamos = async () => {
    const resp = await museoApi.get('/prestamos');
    const data = resp.data;
    return data;
};

const getDonaciones = async () => {
    const resp = await museoApi.get('/donaciones');
    const data = resp.data;
    return data;
};

const getBajas = async () => {
    const resp = await museoApi.get('/bajas');
    const data = resp.data;
    return data;
};

const getOneArma = async (id) => {
    const resp = await museoApi.get(`/armas/${id}`);
    const data = resp.data;
    return data;
};

const getOneNatural = async (id) => {
    const resp = await museoApi.get(`/naturales/${id}`);
    const data = resp.data;
    return data;
};

const getOnePrestamo = async (id) => {
    const resp = await museoApi.get(`/prestamos/${id}`);
    const data = resp.data;
    return data;
};

const getOneDonacion = async (id) => {
    const resp = await museoApi.get(`/donaciones/${id}`);
    const data = resp.data;
    return data;
};

const createArma = async (arma = {}, image) => {
    const resp = await museoApi.post(
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
    const resp = await museoApi.put(`/armas/${arma._id}`, {
        ...arma,
    });
    const data = resp.data;
    return data;
};

const deleteArma = async (id) => {
    const resp = await museoApi.delete(`/armas/${id}`);
    const data = resp.data;
    return data;
};
const createNatural = async (natural = {}, image) => {
    const resp = await museoApi.post(
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
    const resp = await museoApi.put(`/naturales/${natural._id}`, {
        ...natural,
    });
    const data = resp.data;
    return data;
};

const deleteNatural = async (id) => {
    const resp = await museoApi.delete(`/naturales/${id}`);
    const data = resp.data;
    return data;
};
const createPrestamo = async (prestamo = {}) => {
    const resp = await museoApi.post('/prestamos', prestamo);
    const data = resp.data;
    return data;
};

const updatePrestamo = async (prestamo = {}) => {
    const resp = await museoApi.put(`/prestamos/${prestamo._id}`, prestamo);
    const data = resp.data;
    return data;
};

const deletePrestamo = async (id) => {
    const resp = await museoApi.delete(`/prestamos/${id}`);
    const data = resp.data;
    return data;
};

const getTransferencias = async () => {
    const resp = await museoApi.get('/transferencias');
    const data = resp.data;
    return data;
};
const getOneTransferencia = async (id) => {
    const resp = await museoApi.get(`/transferencias/${id}`);
    const data = resp.data;
    return data;
};

const createTransferencia = async (transferencia = {}) => {
    const resp = await museoApi.post('/transferencias', transferencia);
    const data = resp.data;
    return data;
};

const createDonacion = async (donacion = {}) => {
    const resp = await museoApi.post('/donaciones', donacion);
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
    getDonaciones,
    getOneDonacion,
    createDonacion,
    getBajas,
    getOneArma,
    getOneNatural,
};
