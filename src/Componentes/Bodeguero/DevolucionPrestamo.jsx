import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { devolver, devuelto, Get_all as get_all_prestamos, Get_Pendientes, Get_Prestamo_By_Inventario, Get_Prestamo_persona } from '../../Servicios/Prestamos';
import { format, isAfter } from 'date-fns';
import ActivosPrestados from './ActivosPrestadosPersona';
import Swal from 'sweetalert2';

function formatearFecha(fecha) {
    return format(new Date(fecha), 'dd-MM-yyyy');
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
                        'entregado': '',
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
                            'entregado': res.entregado,
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

    }, []);

    // Function to check if the deadline has passed
    function isDeadlinePassed(deadline) {
        return isAfter(new Date(), new Date(deadline));
    }


    const [filtro, setFiltro] = useState('');

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value.toLowerCase());

    };


    async function GetDataPrestamos(){
       var response = await Get_Prestamo_persona(rut);
       console.log(response);
       if (response.persona == null) {
        Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'info',
            title: "Persona no encontrada",
            showConfirmButton: false,
            timer: 3000,
        });
        setDatosPersonales({
            'nombres':'',
            'apellidos':'',
            'carrera':'',
            'tipo_persona':'',
        })
       }else{
        Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'info',
            title: "Solicitante encontrado",
            showConfirmButton: false,
            timer: 3000,
        });
        setDatosPersonales({
            'nombres':response.persona.nombres,
            'apellidos':response.persona.apellidos,
            'carrera':response.persona.carrera,
            'tipo_persona':'',
        });
       }
       setPrestamos(response);
    }
    const [rut,setRut] = useState('');
    const [DatosPersonales,setDatosPersonales] = useState({
        'nombres':'',
        'apellidos':'',
        'carrera':'',
        'tipo_persona':'',
    });
    const handleRut = (e) => {
        setRut(e.target.value); // Accede al valor con e.target.value
    };

    // const handleDatosPersonales= (e)=>{
    //     const { name, value } = e.target;
    //     setDatosPersonales({...DatosPersonales,[name]:[value]})
    // }
    const InventarioDevuelto = async ()=>{
       const response =  await devolver(PrestameDetalle.id_inventario,PrestameDetalle.rut_solicitante);
       Swal.fire({
        position: 'top-end', // Personaliza el ancho de la notificación
        toast: true, // Activa el modo Toast
        icon: 'success',
        title: 'Devolución realizada correctamente',
        showConfirmButton: false,
        timer: 3000,
    });
    }
    return (
        <>
            <button className='btn btn-warning' onClick={handleShowModal}>
                Escanear
            </button>
            <div className='container'>
                <div className='row'>
                    <div className='col-xxl-3'>
                        <label htmlFor="">Rut</label>
                        <input type="text" onChange={handleRut} value={rut} className='form-control' />
                    </div>
                    <div className='col-xxl-2'>
                        <br />
                        <button onClick={GetDataPrestamos} className='btn btn-primary'>Buscar</button>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col'>
                        <label htmlFor="">Nombres</label>
                        <input type="text" disabled value={DatosPersonales.nombres} name='nombres' className='form-control' />
                    </div>
                    <div className='col'>
                        <label htmlFor="">Apellidos</label>
                        <input type="text" disabled value={DatosPersonales.apellidos} name='apellidos' className='form-control' />
                    </div>
                    <div className='col'>
                        <label htmlFor="">Carrera</label>
                        <input type="text" disabled name='carrera' value={DatosPersonales.carrera} className='form-control' />
                    </div>
                </div>
            </div>
            <div className='container mt-3'>
                <ActivosPrestados prestamos={Prestamos.prestamos} />
            </div>



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
                            <label htmlFor="">Fecha Plazo </label>
                            <strong >({isDeadlinePassed(PrestameDetalle.fecha_plazo) ? 'Vencido' : 'En plazo'})</strong>
                            <input
                                type="text"
                                className='form-control'
                                value={PrestameDetalle.fecha_plazo ? formatearFecha(PrestameDetalle.fecha_plazo) : ''}
                            />



                        </div>
                        <div className='col'>
                            <label htmlFor="">entregado </label>
                           
                            <input
                                type="text"
                                className='form-control'
                                value={PrestameDetalle.entregado }
                            />



                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    {estadoPrestamoDetalle === false ? (
                        <button className='btn btn-info' onClick={handleCloseModaldetails}>Cerrar</button>
                    ) : (
                        <button onClick={InventarioDevuelto} className='btn btn-primary'>Aceptar Entrega</button>
                    )}



                </Modal.Footer>
            </Modal>

        </>
    );
}
