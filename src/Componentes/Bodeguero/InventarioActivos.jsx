


import React, { useEffect, useState } from 'react';
import { Get_all, sin_stock } from '../../Servicios/InventarioService';
import { format } from 'date-fns';
import { Modal } from 'react-bootstrap';
function formatearFecha(fecha) {
  return format(new Date(fecha), 'dd-MM-yyyy HH:mm');
}

export default function InventarioActivos() {
  const [inventario, setInventario] = useState([]);
  const [inventarioStock, setInventarioStock] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    async function GetSinStock() {
      const data = await sin_stock();
      
      setInventarioStock(data);
      if (data.length > 0 ) {
        handleShowModal();
      }
    }
    async function GetInventario() {
      try {
        const data = await Get_all();
        setInventario(data);
      } catch (error) {
        console.error(error);
      }
    }

    GetInventario();
    GetSinStock();
  }, []);

  const handleDownloadExcel = async () => {
    try {
      // Código para descargar el archivo Excel
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

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const filteredInventario = inventario.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filtro.toLowerCase())
    )
  );

  return (
    <>   <div>
      <div className='row justify-content-end'>
      <div className='col-lg-8'>
         <h1>Inventario</h1>
        </div>
        <div className='col-lg-2'>
          <button className='btn btn-success w-100' onClick={handleDownloadExcel}>
            Exportar Excel
          </button>
        </div>

      </div>
      <div className='row justify-content-center'>
        <div className="col-xxl-8">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Buscar..."
            value={filtro}
            onChange={handleFiltroChange}
          />
        </div>
      </div>

      <div className='row justify-content-center'>
        <div className="col-xxl-8">
        <table className="table mt-3">
        <tr className='table-head'>
          <th>Identificador Activo</th>
          <th>Nombre Producto</th>
          <th>Estado</th>
          <th>Fecha de Ingreso</th>
        </tr>

        <tbody>
          {filteredInventario.map((item) => (
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
      </div>
    
    </div>
      <Modal show={showModal} onHide={handleCloseModal} size="xl" >
        <Modal.Header>
          <Modal.Title>Aviso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className='text-center'>Los siguientes productos existe poco stock</h3>
          {inventarioStock.length > 0 ? (
          <table className='table'>
               <tr className='table-head'>
                  <td>Nombre Producto</td>
                  <td>Categoria</td>
                  <td>Marca</td>
                  <td>Stock</td>
              </tr>
              <tbody>
              {inventarioStock.map((item) => (
                <tr>
                  <td>{item.producto.nombre_producto}</td>
                  <td>{item.categoria}</td>
                  <td>{item.producto.marca}</td>
                  <td>{item.stock}</td>
                </tr>
            ))}
              </tbody>
     

          </table>) : (<span></span>)}
        </ Modal.Body>
      </ Modal>
    </>
  );
}
