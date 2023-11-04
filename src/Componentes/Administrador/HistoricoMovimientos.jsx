import React, { useState, useEffect } from 'react';
import { get_all } from '../../Servicios/HistoricoMovimientoService';

export default function HistoricoMovimientos() {
    const [data, setData] = useState([]);
    const [cadenaFiltro, setCadenaFiltro] = useState('');
    const [datosFiltrados, setDatosFiltrados] = useState([]);

    async function GetData() {
        const query = await get_all();
        setData(query);
        setDatosFiltrados(query); 
    }

    useEffect(() => {
        GetData();
    }, []);

    function filtrar() {
        const query = data.filter((item) => {
            return (
                item.id_movimiento.toString().includes(cadenaFiltro) ||
                item.nombre_movimiento.toLowerCase().includes(cadenaFiltro.toLowerCase()) ||
                item.id_inventario.toString().includes(cadenaFiltro) ||
                item.nombre_producto.toLowerCase().includes(cadenaFiltro.toLowerCase()) ||
                item.marca.toLowerCase().includes(cadenaFiltro.toLowerCase()) ||
                item.categoria.toLowerCase().includes(cadenaFiltro.toLowerCase()) ||
                item.fecha_creacion.includes(cadenaFiltro)
            );
        });
        setDatosFiltrados(query);
    }

    return (
        <div className='container'>
            <h1>Historico de Movimientos</h1>
            <div className='row'>
                <div className='col-xxl-3 d-flex'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Buscar...'
                        value={cadenaFiltro}
                        onChange={(e) => setCadenaFiltro(e.target.value)}
                    />
                    <button className='btn' onClick={filtrar}>
                        <i className='fa fa-search'></i>
                    </button>
                </div>
            </div>
            <table className='table mt-3'>
                <thead className='table-head'>
                    <tr>
                        <th>ID movimiento</th>
                        <th>Movimiento</th>
                        <th>ID inventario</th>
                        <th>Nombre Producto</th>
                        <th>Marca</th>
                        <th>Categoría</th>
                        <th>Fecha Movimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {datosFiltrados.map((item, key) => (
                        <tr key={key}>
                            <td>{item.id_movimiento}</td>
                            <td>{item.nombre_movimiento}</td>
                            <td>{item.id_inventario}</td>
                            <td>{item.nombre_producto}</td>
                            <td>{item.marca}</td>
                            <td>{item.categoria}</td>
                            <td>{item.fecha_creacion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
