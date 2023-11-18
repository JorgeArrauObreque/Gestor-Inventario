import axios from "axios";
import { useEffect, useState, useRef } from "react"
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';
function formatearFecha(fecha) {
    return format(new Date(fecha), 'dd-MM-yyyy HH:mm');
}
export default function Prestamos() {

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };


    const handleCloseModal = () => {
        setShowModal(false);
    };
    const [data, setData] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [InventariosSeleccionados, setInventariosSeleccionado] = useState([]);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [inventarios, setInventarios] = useState([]);

    const GetData = () => {
        axios.get("http://localhost:5136/api/Prestamo").then((response) => {
            setData(response.data);
        }).catch(ex => console.log(ex))
    }
    const GetInventario = () => {
        axios.get("http://localhost:5136/api/Inventario").then(response => {
            setInventarios(response.data);
        }).catch(ex => console.log(ex))
    }
    useEffect(() => {
        GetData();
        GetPersonas();
        GetInventario();
    }, []);
    const GetPersonas = () => {
        axios.get("http://localhost:5136/api/Personas").then(response => {
            setPersonas(response.data);
        }).catch(ex => console.log(ex));
    }
    const SeleccionarElemento = (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        const nombre = event.currentTarget.getAttribute("data-nombre");
        // Verifica si el elemento con el id especificado existe en InventariosSeleccionados
        let elementoExiste = false;
        for (let i = 0; i < InventariosSeleccionados.length; i++) {
            if (InventariosSeleccionados[i].id_inventario === id) {
                elementoExiste = true;
                break; // No es necesario seguir buscando una vez que se encuentra el elemento
            }
        }

        if (!elementoExiste) {

            setInventariosSeleccionado([...InventariosSeleccionados, { "id_inventario": id, "nombre_producto": nombre }])

        }
       
    }
    const EliminarElementoSeleccionado = (event) => {
        const id = event.currentTarget.getAttribute("data-id");

        // Filtra los elementos que no coincidan con el id que deseas eliminar
        const nuevosInventariosSeleccionados = InventariosSeleccionados.filter((item) => item.id_inventario !== id);

        // Actualiza el estado con el nuevo array que no contiene el elemento eliminado
        setInventariosSeleccionado(nuevosInventariosSeleccionados);
    }
    const onSubmit = (data) => {
        alert("hola");
    }

    return <>
    
        <div className="container">
        <form  onSubmit={handleSubmit(onSubmit)}>

                <div className="row justify-content-center" >
                    <div className="col-xxl-3">
                        <h1>Prestamos</h1>
                    </div>
                    <div className="col-xxl-3">
                        <Button type="button" onClick={handleShowModal} variant="primary">Guardar</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="">Receptor</label>
                        <select name="" className="form-control" id="">
                            <option value="">seleccionar Receptor prestamo</option>
                            {personas.map((item) => (
                                <option value={item.rut}>{item.nombres} {item.apellidos}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="">Desde</label>
                        <input type="text" name="" value={formatearFecha(new Date())} className="form-control" id="" />
                    </div>
                    <div className="col">
                        <label htmlFor="">Fecha Plazo</label>
                        <input type="date" name="" className="form-control" id="" />
                    </div>
                </div>
                <Modal show={showModal} onHide={handleCloseModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Prestamos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>ID Inventario</th>
                                    <th>Producto</th>
                                </tr>
                            </thead>
                            <tbody>

                                {inventarios.map((item) => (
                                    <tr>
                                        <td><button data-id={item.id_inventario} data-nombre={item.nombre_producto} onClick={SeleccionarElemento} className="btn"><i className="fa fa-plus"></i></button></td>
                                        <td>{item.id_inventario}</td>
                                        <td>{item.nombre_producto}</td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        {InventariosSeleccionados.length > 0 ? (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>ID Inventario</th>
                                        <th>Producto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {InventariosSeleccionados.map((item) => (
                                        <tr key={item.id_inventario}>
                                            <td>
                                                <button data-id={item.id_inventario} onClick={EliminarElementoSeleccionado} className="btn"><i className="fa fa-trash text-danger"></i></button>
                                            </td>
                                            <td>{item.id_inventario}</td>
                                            <td>{item.nombre_producto}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <>
                            </>
                        )}


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cerrar
                        </Button>
                            <button type="submit"  className="btn btn-primary">Guardar</button>
                    </Modal.Footer>
                </Modal>

                </form>

            <div className="row justify-content-center">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr>
                                <td>{item.id_prestamo}</td>
                                <td>{item.rut}</td>
                                <td>{item.entregado}</td>
                                <td>{item.fecha_plazo}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>

    </>
}