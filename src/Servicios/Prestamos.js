import axios from 'axios';
import Swal from 'sweetalert2';

const baseURL = 'http://localhost:5136';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};


export async function Get_all() {
    try {
      const response = await axios.get(`${baseURL}/api/Prestamo`, getHeaders());
      return response.data;
    } catch (error) {
      handleRequestError(error);
      return [];
    }
  }
  
  export async function Get_Pendientes() {
    try {
      const response = await axios.get(`${baseURL}/api/Prestamo/get_No_back`, getHeaders());
      return response.data;
    } catch (error) {
      handleRequestError(error);
      return [];
    }
  }

  export async function Get_Prestamo_By_Inventario(id) {
    try {
      const response = await axios.get(`${baseURL}/api/Prestamo/get_by_id_inventario?id=${id}`, getHeaders());
      return response.data;
    } catch (error) {
      handleRequestError(error);
      return [];
    }
  }


  function handleRequestError(error) {
    if (error.response) {
      console.error("Código de estado:", error.response.status);
      console.error("Mensaje de error:", error.response.data);
  
      if (error.response.status === 401) {
        console.error("Acceso no autorizado. Debes iniciar sesión.");
      }
    } else {
      console.error("Error de red o solicitud no válida:", error.message);
    }
  }