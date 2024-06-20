import axios from 'axios';


const tesloApi = axios.create({
    baseURL: import.meta.env.VITE_TESLO_API_URL,

});



// tesloApi.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// },
//     (error) => {
//         return Promise.reject(error);
//     }
// );
export { tesloApi };