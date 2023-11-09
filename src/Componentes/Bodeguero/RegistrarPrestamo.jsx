import { useEffect, useState } from 'react';
import { Get_all as get_all_productos } from '../../Servicios/ProductoService';
import { get_all as get_all_personas, get_by_rut } from '../../Servicios/PersonasServices';
import { ModalBody, ModalHeader, ModalTitle, Modal, Button } from 'react-bootstrap';

const RegistrarPrestamo = () => {
    const [formState, setFormState] = useState({
        selectedRut: '',
        persona: {
            nombres: '',
            apellidos: '',
            tipo: '',
            Carrera: '',
        },
    });

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

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setFormState((prevFormState) => ({ ...prevFormState, selectedRut: selectedValue }));
    };

    const handleInputChange = (field, value) => {
        setFormState((prevFormState) => ({
            ...prevFormState,
            persona: { ...prevFormState.persona, [field]: value },
        }));
    };

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

    const submit = () => {
        console.log(productosSeleccionados);
    };

    useEffect(() => {
        async function fetchData() {
            const [productosResponse, personasResponse] = await Promise.all([get_all_productos(), get_all_personas()]);
            setProductos(productosResponse);
            setPersonas(personasResponse);
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function getPersona() {
            const query = await get_by_rut(formState.selectedRut);
            setFormState((prevFormState) => ({
                ...prevFormState,
                persona: {
                    nombres: query.nombres,
                    apellidos: query.apellidos,
                    tipo: '',
                    Carrera: '',
                },
            }));
        }

        if (formState.selectedRut) {
            getPersona();
        }
    }, [formState.selectedRut]);

    return (
        <>
            <div className="container">
                <h1>Prestamo de Activos</h1>
                <div className='row'>
                    <div className='col-xl-2'>
                        <button onClick={handleShowModal} className='btn btn-secondary w-100'>Productos</button>
                    </div>
                    <div className='col-xl-2'>
                        <button onClick={submit} className='btn btn-primary w-100'>Guardar</button>
                    </div>
                </div>
                
                <div className='row'>
                    <div className='col'>
                        <label htmlFor="">Solicitante</label>
                        <select name="" onChange={handleSelectChange} id="" className='form-control'>
                            {personas.map((item) => (
                                <option key={item.rut} value={item.rut}>{item.nombres} {item.apellidos} ({item.rut}) </option>
                            ))}
                        </select>
                    </div>
                    <div className='col'>
                        <label htmlFor="">Nombres</label>
                        <input type="text" name="" disabled value={formState.persona.nombres} className='form-control' id="" />
                    </div>
                    <div className='col'>
                        <label htmlFor="">Apellidos</label>
                        <input type="text" name="" disabled value={formState.persona.apellidos} className='form-control' id="" />
                    </div>
                </div>
                <div className='row justify-content-center mt-5'>
                    <div className='col-xxl-10'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre producto</th>
                                <th>Marca</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosSeleccionados.map((producto) => (
                                <tr key={producto.id_producto}>
                                    <td>{producto.id_producto}</td>
                                    <td>{producto.nombre_producto}</td>
                                    <td>{producto.marca}</td>
                                    <td className='justify-content-center d-flex'>
                                        <input
                                            type="number" className='form-control' style={{width:"200px"}} maxLength={3}
                                            value={producto.cantidad} min={1} max={10}
                                            onChange={(e) => {
                                                const nuevaCantidad = parseInt(e.target.value, 10);
                                                const nuevosProductos = productosSeleccionados.map((p) =>
                                                    p.id_producto === producto.id_producto ? { ...p, cantidad: nuevaCantidad } : p
                                                );
                                                setProductosSeleccionados(nuevosProductos);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>

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
        </>
    );
};

export default RegistrarPrestamo;
