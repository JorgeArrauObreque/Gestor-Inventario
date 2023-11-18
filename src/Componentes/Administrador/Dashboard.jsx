import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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


const handleDownloadExcel = async () => {
  try {
    // Código para descargar el archivo Excel
    const response = await fetch('http://localhost:5136/api/Informe/export_multiple'); // Asegúrate de que la ruta sea correcta
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      ('0' + currentDate.getDate()).slice(-2) +
      ('0' + currentDate.getHours()).slice(-2) +
      ('0' + currentDate.getMinutes()).slice(-2) +
      ('0' + currentDate.getSeconds()).slice(-2);

    a.download = 'Inventario_' + formattedDate + '.xlsx'; // Nombre del archivo con fecha
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
}


const Dashboard = () => {
  const [estadisticas, setEstadisticas] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Agrega un estado para controlar la carga

  async function Estadisticas() {
    const data = await axios.get(baseURL + "/api/Estadisticas/dashboard", getHeaders());
    console.log(data.data);
    return data.data;
  }

  useEffect(() => {

    Estadisticas().then((result) => {
      setEstadisticas(result);
      const chartData = result.prestamos_siete_dias.map((item) => ({
        name: item.diaDeLaSemana,
        prestamos: item.cantidadPrestamos,
      }));
      setData(chartData);
      setLoading(false); // Marca la carga como completa
      console.log(result);
    });
  }, []);

  return (
    <div>
      <h2>Estadísticas</h2>
      <button className='btn btn-success' onClick={handleDownloadExcel}>Exportar Datos</button>
      {loading ? (
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (

        <div className='container'>
          <div className='row mb-3'>
            <div className='col-xxl-3'>
              <div className='card text-center p-3'>
                <h3 className='h6'>Cantidad de productos en inventario</h3>
                <h3>{estadisticas.cantidad_productos_inventario}</h3>
              </div>

            </div>
            <div className='col-xxl-3'>
              <div className='card text-center p-3'>
                <h3 className='h6'>Producto Más Solicitado</h3>
                {estadisticas.productoConMasPrestamos !== null ? (
                  <>
                    <h3>{estadisticas.productoConMasPrestamos.producto.nombre_producto} ({estadisticas.productoConMenosPrestamos.producto.marca})</h3>
                    <h3>Cantidad: {estadisticas.productoConMasPrestamos.totalPrestamos}</h3>
                  </>
                ) : (
                  <p>No hay datos disponibles para el Producto Más Solicitado.</p>
                )}
              </div>
            </div>

            <div className='col-xxl-3'>
              <div className='card text-center p-3'>
                <h3 className='h6'>Producto Menos Solicitado</h3>
                {estadisticas.productoConMenosPrestamos !== null ? (
                  <>
                    <h3>{estadisticas.productoConMenosPrestamos.producto.nombre_producto} ({estadisticas.productoConMenosPrestamos.producto.marca})</h3>
                    <h3>Cantidad: {estadisticas.productoConMenosPrestamos.totalPrestamos}</h3>
                  </>
                ) : (
                  <p>No hay datos disponibles para el Producto Menos Solicitado.</p>
                )}
              </div>
            </div>
          </div>


          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="prestamos" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No hay prestamos esta semana disponibles para mostrarse</p>
          )}


        </div>
      )}
    </div>
  );
};

export default Dashboard;
