import React, { useEffect, useState } from 'react';
import { Get_all } from '../../Servicios/InventarioService';
import { format, getDate } from 'date-fns';

function formatearFecha(fecha) {
  return format(new Date(fecha), 'dd-MM-yyyy HH:mm');
}

export default function InventarioActivos() {
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    async function Getinventario() {
      try {
        const data = await Get_all();
        setInventario(data); // Actualiza el estado con los datos obtenidos
      } catch (error) {
        console.error(error);
      }
    }

    Getinventario(); // Llama a la función para obtener los datos al montar el componente
  }, []);

  const handleDownloadExcel = async () => {
    try {
      const response = await fetch('http://localhost:5136/api/Informe/export'); // Asegúrate de que la ruta sea correcta
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const currentDate = new Date();
      const formattedDate = currentDate.getFullYear() +
        ('0' + (currentDate.getMonth() + 1)).slice(-2) +
        ('0' + currentDate.getDate()).slice(-2) +
        ('0' + currentDate.getHours()).slice(-2) +
        ('0' + currentDate.getMinutes()).slice(-2);

      a.download = 'Inventario_' + formattedDate + '.xlsx'; // Nombre del archivo con fecha
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <div className='row justify-content-end'>
        <div className='col-lg-2'>
        <button className='btn btn-success w-100' onClick={handleDownloadExcel}>Exportar Excel</button>
        </div>
      
      </div>
      
      <table className="table mt-3">

        <tr className='table-head'>
          <th>Identificador Activo</th>
          <th>Nombre Producto</th>
          <th>Estado</th>
          <th>Fecha de Ingreso</th>
        </tr>

        <tbody>
          {inventario.map((item) => (
            <tr key={item.id_inventario}>
              <td>{item.id_inventario}</td>
              <td>{item.nombre_producto}</td>
              <td>{item.nombre_inventario_estado}</td>
              <td>{formatearFecha(item.fecha_creacion)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
