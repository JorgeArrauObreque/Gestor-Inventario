import axios from "axios";
import { useEffect, useState, useRef } from "react"
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';
import PrestamoDetail from "./PrestamoDetail";
import { CreatePrestamo, Get_Prestamo_Details } from "../../Servicios/Prestamos";

import { Get_all } from '../../Servicios/InventarioService'
import Swal from "sweetalert2";
function formatearFecha(fecha) {
    return format(new Date(fecha), 'dd-MM-yyyy');
}
export default function Prestamos() {

    const [selectedItems, setSelectedItems] = useState([]);
    const [showModalInventarios, setShowModalInventarios] = useState(false);

    const handleShowModalInventarios = () => {


        setShowModalInventarios(true);

    };


    const handleCloseModalInventarios = () => {
        setShowModalInventarios(false);
    };



    const [showModal, setShowModal] = useState(false);

    const handleShowModal = async (event) => {
        const dataValue = event.target.getAttribute('data-id');

        setShowModal(true);
        const resultado = await Get_Prestamo_Details(dataValue);
     
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
    const [prestamoDetalles, setPrestamoDetalles] = useState([]);

    const [formDataInventario,setformDataInventario] = useState({
        'rut':'',
        'fecha_plazo':'',
    });


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
        Get_inventario();
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

        console.log(selectedItems);
        console.log(data.fecha_plazo);
        console.log(data.id_persona);
        setformDataInventario({ 
            'fecha_plazo' : data.fecha_plazo,
            'rut':data.id_persona,
        });
        handleShowModalInventarios();

     }


    async function guardarPrestamo(){
        const id_solicitante  = formDataInventario.rut;
        const fecha_plazo = formDataInventario.fecha_plazo;
        
        const response = await CreatePrestamo(id_solicitante,fecha_plazo,selectedItems);
        if (response.status ==200){
            Swal.fire({
                position: 'top-end',
                toast: true,
                icon: 'success',
                title: "Registro eliminado correctamente",
                showConfirmButton: false,
                timer: 3000,
              });
              handleCloseModalInventarios();
              GetData();
        }else{
            Swal.fire({
                position: 'top-end',
                toast: true,
                icon: 'error',
                title: "ha ocurrido un error intentelo nuevamente",
                showConfirmButton: false,
                timer: 3000,
              });
        }
    }
    async function Get_inventario() {
        const response = await Get_all();
        console.log(response);
        setInventarios(response);
    }

    const toggleSelection = (index) => {
        if (selectedItems.includes(index)) {
            setSelectedItems(selectedItems.filter((item) => item !== index));
        } else {
            setSelectedItems([...selectedItems, index]);
        }
    };
    return <>

        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="row justify-content-center" >
                    <div className="col-xxl-3">
                        <h1>Prestamos</h1>
                    </div>
                    <div className="col-xxl-3">
                        <Button type="submit"  variant="primary">Guardar</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="">Receptor</label>
                        <select name="" className="form-control" {...register("id_persona",{required:true})} id="">
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
                    <table className="table mt-4">
                        <tr className="table-head">
                            <th>ID</th>
                            <th>Fecha creacion</th>
                            <th>Plazo</th>
                            <th>Rut</th>
                            <th></th>
                        </tr>
                        <tbody>
                            {data.map((item) => (
                                <tr>
                                    <td>{item.id_prestamo}</td>
                                    <td>{formatearFecha(item.fecha_creacion)} </td>
                                    <td>{formatearFecha(item.fecha_plazo)}</td>
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

                        <PrestamoDetail detalles={prestamoDetalles} />


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cerrar
                        </Button>
                        {/* <button type="submit" onClick={guardar} className="btn btn-primary">Guardar</button> */}
                    </Modal.Footer>
                </Modal>
                <Modal show={showModalInventarios} onHide={handleCloseModalInventarios} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Inventario</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <table className="table">
                    <tr className='table-head'>
                        <th></th>
                        <th>Id Inventario</th>
                        <th>Nombre Producto</th>
                        <th>Marca</th>
                        <th>Estado</th>

                    </tr>
                    <tbody>
                        {inventarios.map((item) => (
                            <tr>
                                <td>
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={() => toggleSelection(item.id_inventario)}
                                    >
                                        {selectedItems.includes(item.id_inventario) ? (
                                            <i className="fas fa-check"></i>
                                        ) : (
                                            "Seleccionar"
                                        )}
                                    </button>
                                </td>
                                <td>{item.id_inventario}</td>
                                <td>{item.nombre_producto}</td>
                                <td>{item.marca}</td>
                                <td>{item.nombre_inventario_estado}</td>

                            </tr>
                        ))}

                    </tbody>
                </table>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalInventarios}>
                    Cerrar
                </Button>
                <button type="submit" onClick={guardarPrestamo} className="btn btn-primary">Guardar</button>
            </Modal.Footer>
        </Modal>
            </form>


        </div>

    </>
}