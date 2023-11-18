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

export async function get_all(){
    const response = await axios.get(baseURL+"/api/Personas",getHeaders());
    return response.data;
}



export async function get_by_rut(rut) {
  try {
    const response = await axios.get(`${baseURL}/api/Personas/get_by_rut?rut=${rut}`, getHeaders());

    // Validar si la persona es nula
    if (response.data === '') {
      debugger;
      console.log('No se encontró ninguna persona con el rut:', rut);
      return null; // Retornar nulo para indicar que no se encontró la persona
    }

    // La solicitud fue exitosa y se encontró la persona
    return response.data;
  } catch (error) {
    // Manejar otros errores
    console.error('Error al obtener datos por rut:', error.message);
    throw error; // Puedes manejar el error según tus necesidades
  }
}
