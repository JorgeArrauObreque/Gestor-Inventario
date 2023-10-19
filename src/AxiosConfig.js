import axios from 'axios';

// Obten el token de local storage
let token = localStorage.getItem("token");

// Crea una instancia de Axios con la configuración base
const instance = axios.create({
  baseURL: 'http://localhost:5136/', // Cambia esto a tu URL base
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agrega el token a las cabeceras de la instancia
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;