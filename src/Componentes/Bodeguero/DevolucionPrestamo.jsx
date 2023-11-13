import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Get_all as get_all_prestamos, Get_Pendientes, Get_Prestamo_By_Inventario } from '../../Servicios/Prestamos';
import { format, isAfter } from 'date-fns';

function formatearFecha(fecha) {
    return format(new Date(fecha), 'dd-MM-yyyy HH:mm');
}

export default function DevolucionPrestamo() {
    const [showModal, setShowModal] = useState(false);
    const [idInventario, setIdInventario] = useState('');
    const [Prestamos, setPrestamos] = useState([]);
    const [showModaldetails, setShowModaldetails] = useState(false);
    const [PrestameDetalle, setPrestamoDetalle] = useState({
        'rut_solicitante': '',
        'id_prestamo_detalle': '',
        'id_prestamo': '',
        'id_inventario': '',
        'nombre_solicitante': '',
        'fecha_plazo': '',
        'fecha_solicitud': '',
    });
    const [estadoPrestamoDetalle, setEstadoPrestamoDetalle] = useState(false);

    const handleShowModaldetails = () => {
        setShowModaldetails(true);
    };

    const handleCloseModaldetails = () => {
        setShowModaldetails(false);
    };

    function handleChange(event) {
        setIdInventario(event.target.value);
    }



    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    function handleChange(event) {
        setIdInventario(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            var barcode = idInventario;
            console.log('Código de barras escaneado:', barcode);
            setIdInventario(barcode);
            handleCloseModal();
            async function get_by_id() {

                const res = await Get_Prestamo_By_Inventario(barcode);
                if (res === '') {
                    setPrestamoDetalle({
                        'rut_solicitante': '',
                        'id_prestamo_detalle': '',
                        'id_prestamo': '',
                        'id_inventario': '',
                        'nombre_solicitante': '',
                        'fecha_plazo': '',
                        'fecha_solicitud': '',
                    });
                    setEstadoPrestamoDetalle(false);
                } else {
                    setPrestamoDetalle(
                        {
                            'rut_solicitante': res.prestamoNavigation.personaNavigation.rut,
                            'id_prestamo_detalle': res.id_prestamo_detalle,
                            'id_prestamo': res.prestamoNavigation.id_prestamo,
                            'id_inventario': res.id_inventario,
                            'nombre_solicitante': res.prestamoNavigation.personaNavigation.nombres + " " + res.prestamoNavigation.personaNavigation.apellidos,
                            'fecha_plazo': res.prestamoNavigation.fecha_plazo,
                            'fecha_solicitud': res.prestamoNavigation.fecha_creacion,
                        }

                    );
                    setEstadoPrestamoDetalle(true);
                }

                console.log(res);
            }
            get_by_id();
            handleShowModaldetails();
        }
    }

    useEffect(() => {
        async function Get_all() {
            const response = await Get_Pendientes();
            console.log(response);
            setPrestamos(response);
        }
        Get_all();
    }, []);

    // Function to check if the deadline has passed
    function isDeadlinePassed(deadline) {
        return isAfter(new Date(), new Date(deadline));
    }

    return (
        <>
            <button className='btn btn-warning' onClick={handleShowModal}>
                Abrir
            </button>

            <table className='table mt-3'>

                <tr className='table-head'>
                    <th>ID</th>
                    <th>Nombre Solicitante</th>
                    <th>Carrera Solicitante</th>
                    <th>ID Inventario</th>
                    <th>Fecha Solicitud</th>
                    <th>Fecha Plazo</th>
                    <th>Estado</th>
                </tr>

                <tbody>
                    {Prestamos.map((item) => (
                        <tr key={item.id_prestamo}>
                            <td>{item.id_prestamo}</td>
                            <td>
                                {item.prestamoNavigation.personaNavigation.nombres} {item.prestamoNavigation.personaNavigation.apellidos}
                            </td>
                            <td>{item.prestamoNavigation.personaNavigation.carrera}</td>
                            <td>{item.id_inventario}</td>
                            <td>{formatearFecha(item.prestamoNavigation.fecha_creacion)}</td>
                            <td>{formatearFecha(item.prestamoNavigation.fecha_plazo)}</td>
                            <td>
                                <span
                                    style={{
                                        backgroundColor: isDeadlinePassed(item.fecha_plazo) ? '#dc3545' : '#28a745',
                                        color: '#fff',
                                        padding: '0.25em 0.5em',
                                        borderRadius: '0.25em',
                                    }}
                                >
                                    {isDeadlinePassed(item.prestamoNavigation.fecha_plazo) ? 'Vencido' : 'En plazo'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showModal} onHide={handleCloseModal} size='lg'>
                <Modal.Body>
                    <h1 className='text-center'>Escanee el código de barras </h1>
                    <div className='justify-content-center d-flex'>
                        <img
                            src='https://codigodebarra.com.ar/wp-content/uploads/2018/08/entre-rios-codigos-de-barra-ean.png'
                            style={{ width: '500px' }}
                            alt='Barcode'
                        />
                    </div>
                    <input
                        type='text'
                        className='form-control'
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        autoFocus
                        value={idInventario}
                    />
                </Modal.Body>
            </Modal>



            <Modal show={showModaldetails} onHide={handleCloseModaldetails} size='lg'>
                <Modal.Body>
                    <h1 className='text-center'>Prestamo </h1>
                    {estadoPrestamoDetalle === false && (
                        <div className='alert alert-info'>
                            <p>No se ha encontrado un préstamo activo para el activo ingresado</p>
                        </div>
                    )}


                    <div className='justify-content-center row'>
                        <div className='col'>
                            <label htmlFor="">Rut Solicitante</label>
                            <input type="text" className='form-control' value={PrestameDetalle.rut_solicitante} />


                        </div>
                        <div className='col'>
                            <label htmlFor="">Nombre Solicitante</label>
                            <input type="text" className='form-control' value={PrestameDetalle.nombre_solicitante} />


                        </div>
                    </div>
                    <div className='justify-content-center row'>
                        <div className='col'>
                            <label htmlFor="">ID Inventario</label>
                            <input type="text" className='form-control' value={PrestameDetalle.id_inventario} />


                        </div>
                        <div className='col'>
                            <label htmlFor="">ID Prestamo</label>
                            <input type="text" className='form-control' value={PrestameDetalle.id_prestamo} />


                        </div>
                    </div>
                    <div className='justify-content-center row'>
                        <div className='col'>
                            <label htmlFor="">Fecha de prestamo</label>
                            <input
                                type="text"
                                className='form-control'
                                value={PrestameDetalle.fecha_solicitud ? formatearFecha(PrestameDetalle.fecha_solicitud) : ''}
                            />



                        </div>
                        <div className='col'>
                            <label htmlFor="">Fecha Plazo</label>
                            <input
                                type="text"
                                className='form-control'
                                value={PrestameDetalle.fecha_plazo ? formatearFecha(PrestameDetalle.fecha_plazo) : ''}
                            />



                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    {estadoPrestamoDetalle === false ? (
                        <button className='btn btn-info' onClick={handleCloseModaldetails}>Cerrar</button>
                    ) : (
                        <button className='btn btn-primary'>Aceptar</button>
                    )}



                </Modal.Footer>
            </Modal>

        </>
    );
}
