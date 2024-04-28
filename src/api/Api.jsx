import axios from 'axios';

export const baseURL = () => {
  return 'http://127.0.0.1:8000';
}

const instance = axios.create({
  baseURL: `${baseURL()}/api`, // Sesuaikan dengan URL API Anda
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

export const login = async (items) => {
  return await instance.post("/login", items);
}
export const logout = async () => {
  return await instance.post("/logout");
}
export const getProducts = async () => {
  return await instance.get("/products");
}
export const postProducts = async (items) => {
  return await instance.post("/products", items);
}
export const updateProducts = async (id, items) => {
  return await instance.post(`/products/${id}`, items);
}
export const deleteProducts = async (id) => {
  return await instance.delete(`/products/${id}`);
}