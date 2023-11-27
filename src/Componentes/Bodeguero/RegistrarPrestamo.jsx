import { useEffect, useState, useRef } from 'react';
import { Get_all as get_all_productos } from '../../Servicios/ProductoService';
import { get_all as get_all_personas, get_by_rut } from '../../Servicios/PersonasServices';
import { ModalBody, ModalHeader, ModalTitle, Modal, Button } from 'react-bootstrap';
import { CreatePrestamo, get_inventario_by_id } from '../../Servicios/Prestamos';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const RegistrarPrestamo = () => {
    const [formStatepersona, setFormStatepersona] = useState({
        selectedRut: '',
        persona: {
            nombres: '',
            apellidos: '',
            tipo: '',
            Carrera: '',
        },
    });
    const onScan = async (event) => {
        if (event.key === 'Enter') {
            const barcodeValue = event.target.value;

            console.log('Código de barras escaneado:', barcodeValue);
            console.log(productosSeleccionados);

            const existe = productosSeleccionados.some(producto => producto.id_inventario === barcodeValue);

            if (existe) {
                alert("El producto escaneado ya fue añadido");
            } else {
                const response = await get_inventario_by_id(barcodeValue);

                // Copia el array actual y agrega el nuevo producto al final
                const nuevosProductos = [
                    ...productosSeleccionados,
                    {
                        id_inventario: response.id_inventario,
                        nombre_producto: response.nombre_producto,
                        marca: response.marca,
                        tipo_producto: response.tipo_producto // Aquí se podría establecer un valor inicial
                    }
                ];

                // Actualiza el estado con el nuevo array que contiene el nuevo producto
                setProductosSeleccionados(nuevosProductos);
                handleCloseModalEscaner();
            }
        }
    };

    const [productos, setProductos] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    const [showModalEscaner, setShowModalEscaner] = useState(false);

    const handleShowModalEscaner = () => {
        setShowModalEscaner(true);
    };

    const handleCloseModalEscaner = () => {
        setShowModalEscaner(false);
    };

    const handleSelectChange = async (e) => {
        const selectedValue = e.target.value;
        if (selectedValue != '') {
            const response = await get_by_rut(selectedValue);
            setFormStatepersona({
                selectedRut: '',
                persona: {
                    nombres: response.nombres,
                    apellidos: response.apellidos,
                    tipo: '',
                    Carrera: response.carrera,
                },
            });
            console.log(response);
        }




        // formStatepersona();
    };

    // const handleInputChange = (field, value) => {
    //     setFormState((prevFormState) => ({
    //         ...prevFormState,
    //         persona: { ...prevFormState.persona, [field]: value },
    //     }));
    // };

    const handleProductoSeleccionado = (idProducto) => {
        const productoSeleccionado = productos.find((producto) => producto.id_producto === idProducto);

        if (!productosSeleccionados.some((p) => p.id_producto === idProducto)) {
            const productoConCantidad = {
                ...productoSeleccionado,
                cantidad: 1, // Cantidad por defecto
            };

            setProductosSeleccionados([...productosSeleccionados, productoConCantidad]);
        }
    };

    const obtenerProductosConCantidad = () => {
        return productosSeleccionados.map((producto) => ({
            id_producto: producto.id_producto,
            nombre_producto: producto.nombre_producto,
            marca: producto.marca,
            cantidad: producto.cantidad,
        }));
    };

    const { formState: { errors }, register, reset, clearErrors, handleSubmit } = useForm();
    const submit = async (data) => {
        // console.log(productosSeleccionados);
        const inventarios = productosSeleccionados.map(objeto => objeto.id_inventario);
        if (inventarios.length != 0) {
            const response = await CreatePrestamo(data.id_solicitante, data.fecha_plazo, inventarios);

            if (response.status == 200) {
                Swal.fire({
                    position: 'top-end',
                    toast: true,
                    icon: 'success',
                    title: "Prestamo Generado correctamente",
                    showConfirmButton: false,
                    timer: 3000,
                });
                Limpiar();
            }

        } else {
            Swal.fire({
                position: 'top-end',
                toast: true,
                icon: 'info',
                title: "Ingrese productos para generar un prestamo",
                showConfirmButton: false,
                timer: 3000,
            });
        }

    };

    useEffect(() => {
        async function fetchData() {
            const [productosResponse, personasResponse] = await Promise.all([get_all_productos(), get_all_personas()]);
            setProductos(productosResponse);
            setPersonas(personasResponse);
        }

        fetchData();
    }, []);
    const handleDateChange = (e) => {
        const value = e.target.value;
    };


    const Limpiar = () => {
        setFormStatepersona({
            selectedRut: '',
            persona: {
                nombres: '',
                apellidos: '',
                tipo: '',
                Carrera: '',
            },
        });
        setProductosSeleccionados([]);
        reset();
    }
    // useEffect(() => {
    //     async function getPersona() {
    //         const query = await get_by_rut(formState.selectedRut);
    //         setFormState((prevFormState) => ({
    //             ...prevFormState,
    //             persona: {
    //                 nombres: query.nombres,
    //                 apellidos: query.apellidos,
    //                 tipo: '',
    //                 Carrera: '',
    //             },
    //         }));
    //     }

    //     if (formState.selectedRut) {
    //         getPersona();
    //     }
    // }, [formState.selectedRut]);

    const inputRef = useRef(null);

    const handleModalShow = () => {
        if (showModalEscaner) {
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        handleModalShow();
    }, [showModalEscaner]);


    return (
        <>
            <form onSubmit={handleSubmit(submit)}>
                <div className="container">
                    <h1>Prestamo de Activos</h1>
                    <div className='row'>
                        <div className='col-xl-2'>
                            <button type='button' onClick={handleShowModal} className='btn btn-secondary w-100'>Productos</button>
                        </div>
                        <div className='col-xl-2'>
                            <button type='button' onClick={handleShowModalEscaner} className='btn btn-warning w-100'>Escanear</button>
                        </div>
                        <div className='col-xl-2'>
                            <button onClick={submit} className='btn btn-primary w-100'>Guardar</button>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <label htmlFor="">Solicitante</label>
                            <select {...register("id_solicitante", { required: true })} className='form-control' onChange={(e) => {
                                handleSelectChange(e);
                                register("id_solicitante").onChange(e); // Ejecuta el onChange de register
                            }}>
                                <option value="" selected>Selecciona Persona</option>
                                {personas.map((item) => (
                                    <option key={item.rut} value={item.rut}>{item.nombres} {item.apellidos} ({item.rut}) </option>
                                ))}
                            </select>
                            {errors.id_solicitante && (<span className='text-danger'>Campo Requerido</span>)}
                        </div>
                        <div className='col'>
                            <label htmlFor="">Fecha Plazo</label>
                            <input
                                type="date"
                                className='form-control'
                                {...register("fecha_plazo", {
                                    required: true,
                                    validate: {
                                        dateValidation: value => {
                                            // Aquí puedes realizar validaciones personalizadas si es necesario
                                            // Por ejemplo, verificar si la fecha es válida
                                            return true; // Retorna true si la fecha es válida, de lo contrario, false
                                        }
                                    }
                                })}
                                onChange={handleDateChange}
                            />
                            {errors.fecha_plazo && (<span className='text-danger'>Campo Requerido</span>)}
                        </div>


                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label htmlFor="">Nombres</label>
                            <input type="text" name="" disabled value={formStatepersona.persona.nombres} className='form-control' id="" />

                        </div>
                        <div className='col'>
                            <label htmlFor="">Apellidos</label>
                            <input type="text" name="" disabled value={formStatepersona.persona.apellidos} className='form-control' id="" />

                        </div>
                    </div>
                    <div className='row justify-content-center mt-5'>
                        <div className='col-xxl-10'>
                            {productosSeleccionados.length > 0 ? (
                                <table className='table'>
                                    <thead>
                                        <tr className='table-head'>
                                            <th>ID Inventario</th>
                                            <th>Nombre producto</th>
                                            <th>Marca</th>
                                            <th>Tipo producto</th>
                                        </tr>
                                    </thead>
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
                                <div className='alert alert-info'>
                                    <p>No hay productos añadidos para el prestamo</p>
                                </div>
                            )}


                        </div>
                    </div>
                </div>
            </form>


            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Editar Inventario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre producto</th>
                                <th>Marca</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((item) => (
                                <tr key={item.id_producto}>
                                    <td>{item.id_producto}</td>
                                    <td>{item.nombre_producto}</td>
                                    <td>{item.marca}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleProductoSeleccionado(item.id_producto)}>
                                            Seleccionar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={() => console.log(obtenerProductosConCantidad())}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>





            <Modal show={showModalEscaner} onHide={handleCloseModalEscaner} size="lg" onClick={handleModalShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Escanear activo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center'>
                    <img src="https://codigodebarra.com.ar/wp-content/uploads/2018/08/entre-rios-codigos-de-barra-ean.png" style={{ width: "500px" }} />
                    </div>
                    
                    <input
                        type="text"
                        name=""
                        onKeyDown={onScan}
                        className='form-control'
                        ref={inputRef}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalEscaner}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RegistrarPrestamo;
