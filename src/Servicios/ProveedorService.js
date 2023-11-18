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
    const response = await axios.get(`${baseURL}/api/Proveedores`, getHeaders());
    return response.data;
  } catch (error) {
    handleRequestError(error);
    return [];
  }
}

export async function Create(proveedor_guardar) {
  try {
    const response = await axios.post(`${baseURL}/api/Proveedores`,proveedor_guardar, getHeaders());
    const status = response.status;
    if (status === 200) {
      console.log("Solicitud exitosa");
      return 1;
    } else {
      console.log("La solicitud no fue exitosa. Código de estado:", status);
      return 0;
    }
    
  } catch (error) {
    handleRequestError(error);
    return 0;
  }
}



export async function Update(proveedor_guardar) {
  try {
    const response = await axios.put(`${baseURL}/api/Proveedores`, proveedor_guardar, getHeaders());
    return 1;
  } catch (error) {
    handleRequestError(error);
    return 0;
  }
}

export async function Delete(id_proveedor) {
  try {
    const response = await axios.delete(`${baseURL}/api/Proveedores/${id_proveedor}`, getHeaders());
    const status = response.status;
    if (status === 200) {
      console.log("Solicitud exitosa");
      return 1;
    } else {
      console.log("La solicitud no fue exitosa. Código de estado:", status);
      return 0;
    }
  } catch (error) {
    handleRequestError(error);
    return 0;
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