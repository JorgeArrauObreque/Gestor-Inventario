import React from 'react';
import { format } from 'date-fns'; // Asegúrate de importar solo las funciones que necesitas desde date-fns

function formatearFecha(fecha) {
  return format(new Date(fecha), 'dd-MM-yyyy');
}

export default function ActivosPrestados(props) {
  return (
    <>
      {props.prestamos != null || props.prestamos != undefined ? (
        <table className="table">
      
            <tr className="table-head">
              <th>ID</th>
              <th>Producto</th>
              <th>Marca</th>
              <th>Fecha Prestamo</th>
              <th>Plazo</th>
            </tr>
      
          <tbody>
            {props.prestamos.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="alert alert-info">
                    <p>Sin préstamos encontrados</p>
                  </div>
                </td>
              </tr>
            ) : (
              props.prestamos.map((item, index) => (
                <tr key={index}>
                  <td>{item.inventarioNavigation.id_inventario}</td>
                  <td>{item.inventarioNavigation.productoNavigation.nombre_producto}</td>
                  <td>{item.inventarioNavigation.productoNavigation.marca}</td>
                  <td>{formatearFecha(item.prestamoNavigation.fecha_creacion)}</td>
                  <td>{formatearFecha(item.prestamoNavigation.fecha_plazo)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
       <span></span>
      )}
    </>
  );
}
