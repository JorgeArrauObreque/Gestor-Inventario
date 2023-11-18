import axios from "axios";
import { useEffect, useState,useRef } from "react";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import { Button, Modal } from 'react-bootstrap';
import { format } from 'date-fns';
function formatearFecha(fecha) {
    return format(new Date(fecha), 'dd-MM-yyyy HH:mm:ss');
}
export default function InventarioEstados() {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    const [data, setData] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [inventarioEstado, setInventarioEstado] = useState({
        "id_inventario_estado": "",
        "nombre_estado_inventario": ""
    });
    const GetData = () => {
        axios.get("http://localhost:5136/api/InventarioEstado").then(response => {
            setData(response.data);
        }).catch(ex => {
            console.log(ex);
        });
    }

    const Clean = ()=>{
   
        // También puedes usar la función reset de react-hook-form para reiniciar el formulario
        reset({
            id_inventario_estado: '',
            nombre_inventario_estado: ''
        });
    }
    const Delete = (event) => {
        const id_inventario_estado = event.currentTarget.getAttribute("data-id");
        axios.delete(`http://localhost:5136/api/InventarioEstado/${id_inventario_estado}`).then(()=>{
            GetData();
            Swal.fire({
                position: 'top-end', // Personaliza el ancho de la notificación
                toast: true, // Activa el modo Toast
                icon: 'success',
                title: 'Registro Eliminado con existo',
                showConfirmButton: false,
                timer: 3000,
            });
        }).catch(() => {
         
        });
    }
    const Update = (event) => {
        console.log(inventarioEstado);
        const inventario_estado_guardar = {
            'id_inventario_estado': inventarioEstado.id_inventario_estado,
            'nombre_estado_inventario': inventarioEstado.nombre_inventario_estado
        };
        axios.put("http://localhost:5136/api/InventarioEstado/", inventario_estado_guardar).then(
            (result) => {
                handleCloseModal();
                GetData();
                Swal.fire({
                    position: 'top-end', // Personaliza el ancho de la notificación
                    toast: true, // Activa el modo Toast
                    icon: 'success',
                    title: 'Registro Actualizado con existo',
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
        ).catch(ex => console.log(ex));
    }
    const onChangeNombre = (event) => {
        let nombre = event.target.value;
        setInventarioEstado({ ...inventarioEstado, "nombre_inventario_estado": nombre })
    }
    useEffect(() => {
        GetData();
    }, [])
    const Editar = (event)=>{
        let id = event.currentTarget.getAttribute("data-id");
        let nombre = event.currentTarget.getAttribute("data-nombre");
        console.log(id);
        setInventarioEstado({
            "id_inventario_estado": id,
            "nombre_inventario_estado": nombre
        });
        handleShowModal();
    }
    const onSubmit = (data)=>{
        const inventario_estado_guardar = {
            'id_inventario_estado': data.id_inventario_estado,
            'nombre_estado_inventario': data.nombre_inventario_estado
        };
        axios.post('http://localhost:5136/api/InventarioEstado/', inventario_estado_guardar, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((result) => {
            Swal.fire({
                position: 'top-end', // Personaliza el ancho de la notificación
                toast: true, // Activa el modo Toast
                icon: 'success',
                title: 'Registro guardado con existo',
                showConfirmButton: false,
                timer: 3000,
            });
            GetData();
        }).catch(ex => console.log(ex));
    }
    return (<>
        <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row justify-content-center">
                <div className="col-xxl-5">
                    <h1>Inventario Estados</h1>
                </div>
                <div className="col-xxl-1">
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    
                </div>
                <div className="col-xxl-1">
                    <button type="button" onClick={Clean} className="btn btn-outline-info">Limpiar</button>
                    
                </div>
            </div>
            
                <div className="row justify-content-center">
                    <div className="col-xxl-3">
                        <label htmlFor="">ID</label>
                        <input type="text" name="" className="form-control"  id="" {...register('id_inventario_estado',{required:true})} />
                        {errors.id_inventario_estado && (<span className="text-danger">*Campo requerido</span>)}
                    </div>
                    <div className="col-xxl-3">
                        <label htmlFor="">Nombre</label>
                        <input type="text" name="" className="form-control" id="" {...register('nombre_inventario_estado',{required:true})} />
                        {errors.nombre_inventario_estado && (<span className="text-danger">*Campo requerido</span>)}
                    </div>
                </div>
            </form>

            <div className="mt-5">
                <table className="table">
              
                        <tr className='table-head'>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>fecha creación</th>
                            <th>fecha Actualización</th>
                            <th></th>
                            <th></th>
                        </tr>
              
                    <tbody>
                        {data.map((item, key) => (
                            <tr>
                                <td>{item.id_inventario_estado}</td>
                                <td>{item.nombre_estado_inventario}</td>
                                <td>{formatearFecha(item.fecha_creacion) }</td>
                                <td>{formatearFecha(item.fecha_actualizacion)}</td>
                                <td>
                                    <Button variant="primary" onClick={Editar} data-id={item.id_inventario_estado} data-nombre={item.nombre_estado_inventario}>
                                        <i className="fa fa-edit"></i>
                                    </Button></td>
                                <td><button className="btn " data-id={item.id_inventario_estado} onClick={Delete}><i className="fa fa-trash text-danger"></i></button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Inventario Estado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label htmlFor=""></label>
                                <input type="text" name="" readOnly value={inventarioEstado.id_inventario_estado} className="form-control" id="" />
                            </div>
                            <div className="col">
                                <label htmlFor=""></label>
                                <input type="text" name="" className="form-control" id="" onChange={onChangeNombre} value={inventarioEstado.nombre_inventario_estado} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={Update}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    </>);
}