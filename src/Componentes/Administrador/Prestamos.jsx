import axios from "axios";
import { useEffect, useState, useRef } from "react"
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';
import PrestamoDetail from "./PrestamoDetail";
import { Get_Prestamo_Details } from "../../Servicios/Prestamos";
function formatearFecha(fecha) {
    return format(new Date(fecha), 'dd-MM-yyyy');
}
export default function Prestamos() {

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = async (event) => {
        const dataValue = event.target.getAttribute('data-id');

        setShowModal(true);
        const resultado = await Get_Prestamo_Details(dataValue );
        console.log(resultado);
        setPrestamoDetalles(resultado); 
        
    };


    const handleCloseModal = () => {
        setShowModal(false);
    };
    const [data, setData] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [InventariosSeleccionados, setInventariosSeleccionado] = useState([]);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [inventarios, setInventarios] = useState([]);
    const [prestamo, setPrestamo] = useState();
    const [prestamoDetalles,setPrestamoDetalles] = useState([]); 



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
        setPrestamo({
            rut: data.id_persona,
            fecha_plazo: data.fecha_plazo
        })
    }
    const guardar = () => {
        console.log(prestamo);
        const prestamo_guardar = {
            "id_prestamo": 0,
            "user": "admin",
            "rut": prestamo.rut,
            "entregado": false,
            "fecha_plazo": prestamo.fecha_plazo
        }
        axios.post("http://localhost:5136/api/Prestamo/", prestamo_guardar, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
                GetData();
                handleCloseModal();
        }).catch(ex => console.log(ex));
        //for (let index = 0; index < InventariosSeleccionados.length; index++) {
        //     const element = InventariosSeleccionados[index];
        //     const detalle = {
        //         "id_prestamo_detalle":,
        //         "id_inventario":,
        //         "id_prestamo":,
        //     }
        //     axios.post("http://localhost:5136/api/PrestamoDetalle/", prestamo_guardar, {
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     }).then(response => {

        //     }).catch(ex => console.log(ex));
        // }
    }

    return <>

        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="row justify-content-center" >
                    <div className="col-xxl-3">
                        <h1>Prestamos</h1>
                    </div>
                    <div className="col-xxl-3">
                        <Button type="submit" onClick={handleShowModal} variant="primary">Guardar</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="">Receptor</label>
                        <select name="" className="form-control" {...register("id_persona")} id="">
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
                        <input type="date" name="" {...register("fecha_plazo")} className="form-control" id="" />
                    </div>
                </div>
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha creacion</th>
                                <th>Plazo</th>
                                <th>Rut</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr>
                                    <td>{item.id_prestamo}</td>
                                    <td>{formatearFecha(item.fecha_creacion)} </td>
                                    <td>{ formatearFecha(item.fecha_plazo)}</td>
                                    <td>{item.rut}</td>
                                    <td><Button type="button" onClick={handleShowModal} data-id={item.id_prestamo} variant="primary">Ver</Button></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                <Modal show={showModal} onHide={handleCloseModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Prestamos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            
                        <PrestamoDetail detalles={prestamoDetalles}  />
                            

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cerrar
                        </Button>
                        <button type="submit" onClick={guardar} className="btn btn-primary">Guardar</button>
                    </Modal.Footer>
                </Modal>

            </form>

        
        </div>

    </>
}