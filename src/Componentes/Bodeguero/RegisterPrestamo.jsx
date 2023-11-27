import React, { useEffect, useState, useRef } from "react";
import { get_by_rut, get_all } from "../../Servicios/PersonasServices";
import { Modal, ModalBody, ModalTitle, ModalFooter } from "react-bootstrap";
import { exists } from "../../Servicios/InventarioService";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { CreatePrestamo } from "../../Servicios/Prestamos";
export default function RegisterPrestamo() {
    const [solicitante, setSolicitante] = useState(null);

    async function GetSolicitante(event) {
        try {
            let rut = event.target.value;
            if (rut === "") {
                setSolicitante(null);
            } else {
                let solicitanteData = await get_by_rut(rut);
                setSolicitante(solicitanteData);
                console.log(solicitanteData);
            }
        } catch (error) {

        }

    }

    const [personas, setPersonas] = useState([]);
    async function GetPersonas() {
        let query = await get_all();
        setPersonas(query);

    }

    //modal
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {

        setShowModal(true);

    };

    const handleCloseModal = () => {
        setShowModal(false);

    };


    async function onScan(event) {
        // Puedes verificar si la tecla presionada es Enter (código 13)
        if (event.key === 'Enter') {
            // Obtén el valor del campo de entrada
            const barcodeValue = event.target.value;

            // Realiza acciones adicionales con el código de barras si es necesario
            console.log('Código de barras escaneado:', barcodeValue);
            const response = await exists(barcodeValue);
            console.log(response);
            if (response.resultado == true) {

                const productosValidos = productosSeleccionados.filter((producto) => producto.id_inventario === barcodeValue);

                if (productosValidos.length > 0) {
                    Swal.fire({
                        position: 'top-end',
                        toast: true,
                        icon: 'info',
                        title: "El producto ya fue añadido",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                } else {
                    let producto = {
                        "id_inventario": response.inventario.id_inventario,
                        "nombre_producto": response.inventario.id_inventario,
                        "marca": response.inventario.marca,
                        "tipo_producto": response.inventario.tipo_producto
                    }

                    setProductosSeleccionados([...productosSeleccionados, producto])
                    Swal.fire({
                        position: 'top-end',
                        toast: true,
                        icon: 'info',
                        title: "producto añadido correctamente",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                    handleCloseModal();
                }

            } else {
                Swal.fire({
                    position: 'top-end',
                    toast: true,
                    icon: 'info',
                    title: "el código ingresado no existe dentro del inventario",
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
        }
    };

    const [productosSeleccionados, setProductosSeleccionados] = useState([]);


    const codigo = useRef();
    async function codigoManual() {
        const response = await exists(codigo.current.value);

        if (response.resultado == true) {

            const productosValidos = productosSeleccionados.filter((producto) => producto.id_inventario === codigo.current.value);

            if (productosValidos.length > 0) {
                Swal.fire({
                    position: 'top-end',
                    toast: true,
                    icon: 'info',
                    title: "El producto ya fue añadido",
                    showConfirmButton: false,
                    timer: 3000,
                });
            } else {
                let producto = {
                    "id_inventario": response.inventario.id_inventario,
                    "nombre_producto": response.inventario.id_inventario,
                    "marca": response.inventario.marca,
                    "tipo_producto": response.inventario.tipo_producto
                }

                setProductosSeleccionados([...productosSeleccionados, producto])
                Swal.fire({
                    position: 'top-end',
                    toast: true,
                    icon: 'info',
                    title: "producto añadido correctamente",
                    showConfirmButton: false,
                    timer: 3000,
                });
            }

        } else {
            Swal.fire({
                position: 'top-end',
                toast: true,
                icon: 'info',
                title: "el código ingresado no existe dentro del inventario",
                showConfirmButton: false,
                timer: 3000,
            });
        }

        handleCloseModal();
    }

    const { formState: { errors }, clearErrors, reset, register, handleSubmit } = useForm();
    async function onSubmit(data) {
        if (productosSeleccionados.length == 0) {
            Swal.fire({
                position: 'top-end',
                toast: true,
                icon: 'info',
                title: "Porfavor añada productos para realizar el prestamo",
                showConfirmButton: false,
                timer: 3000,
            });
        } else {
            const inventarios = productosSeleccionados.map(objeto => objeto.id_inventario);
            const response = await CreatePrestamo(data.rut, data.fecha_plazo, inventarios);

            if (response.status == 200) {
                Swal.fire({
                    position: 'top-end',
                    toast: true,
                    icon: 'success',
                    title: "Prestamo Generado correctamente",
                    showConfirmButton: false,
                    timer: 3000,
                });
             reset();
             setProductosSeleccionados([]);
             setSolicitante(null);
             
            }
        }
    }
    const obtenerFechaActual = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
    
        // Agregar un cero delante si el mes o el día tienen un solo dígito
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
    
        return `${year}-${month}-${day}`;
      };
    useEffect(() => {
        GetPersonas()
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                    <div className="mb-4 row">
                        <div className="col-xxl-2">
                            <button type="button" onClick={handleShowModal} className="btn btn-warning w-100">Escaner</button>

                        </div>
                        <div className="col-xxl-2">
                            <button type="submit" className="btn btn-primary w-100">Aceptar</button>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="">Solicitante</label>
                            <select name="solicitanteSelect" id="solicitanteSelect" onChange={GetSolicitante} className="form-control"   {...register('rut', {
                                required: true,
                                onChange: GetSolicitante
                            })}>
                                <option value="">Seleccione rut</option>
                                {
                                    personas.map((item) => (
                                        <option value={item.rut}>{item.nombres} {item.apellidos} ({item.rut})</option>
                                    ))
                                }
                            </select>

                            {errors.rut && (<span className="text-danger">Ingrese un solicitante</span>)}
                        </div>
                        <div className="col">
                                <label htmlFor="">Fecha de plazo</label>
                                <input type="date" name="" className="form-control" {...register("fecha_plazo",{required:true})} min={obtenerFechaActual()} />
                                {errors.fecha_plazo && (<span className="text-danger">Ingrese una fecha de plazo</span>)}
                        </div>
                    </div>



                    <div className="row mt-4">
                        <div className="col">
                            {solicitante && (
                                <div class="card" style={{ width: "25rem" }}>
                                    <div class="card-body">
                                        <h5 class="card-title">{solicitante.nombres} {solicitante.apellidos}</h5>
                                        {/* <p class="card-text">{solicitante.TipoPersonaNavegation.nombre_tipo_persona}</p> */}
                                    </div>
                                    <ul class="list-group list-group-light list-group-small">

                                        <li class="list-group-item px-4">
                                            <table>
                                                <tr>
                                                    <td className="text-start" style={{ width: '100px' }}> <strong>Rut</strong>        </td>
                                                    <td className="text-start" style={{ width: '200px' }}>{solicitante.rut}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-start" style={{ width: '100px' }}> <strong>Carrera</strong> </td>
                                                    <td className="text-start" style={{ width: '200px' }}>{solicitante.carrera}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-start" style={{ width: '100px' }}> <strong>Tipo</strong> </td>
                                                    <td className="text-start" style={{ width: '200px' }}>{solicitante.tipo}</td>
                                                </tr>
                                            </table>


                                        </li>

                                    </ul>
                                    {/* <div class="card-body">
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div> */}
                                </div>
                            )}
                        </div>
                        <div className="mt-4">
                            <h4>Productos a Prestar</h4>
                            {productosSeleccionados.length > 0 ? (
                                <table className='table'>

                                    <tr className='table-head'>
                                        <th>ID Inventario</th>
                                        <th>Nombre producto</th>
                                        <th>Marca</th>
                                        <th>Tipo producto</th>
                                    </tr>

                                    <tbody>
                                        {productosSeleccionados.map((producto) => (
                                            <tr key={producto.id_producto}>
                                                <td>{producto.id_inventario}</td>
                                                <td>{producto.nombre_producto}</td>
                                                <td>{producto.marca}</td>
                                                <td>{producto.tipo_producto}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="alert alert-info">
                                    <p>sin productos añadidos aun</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <Modal show={showModal} onHide={handleCloseModal} size="lg" >

                        <Modal.Body>
                            <h1 className="text-center">Escanee el codigo de barras </h1>
                            <div className="justify-content-center d-flex" >
                                <img src="https://codigodebarra.com.ar/wp-content/uploads/2018/08/entre-rios-codigos-de-barra-ean.png" style={{ width: "500px" }} />

                            </div>
                            <small> tambien puede escribir manualmente el código de ser necesario</small>
                            <input type="text" name="id_inventario" id="" maxLength={80} autoFocus className="form-control" ref={codigo} onKeyDown={onScan} />
                            <button className='btn btn-primary mt-5' onClick={codigoManual}>Aceptar</button>
                        </ Modal.Body>
                    </ Modal>
                </div>
            </form>


        </>
    );
}
