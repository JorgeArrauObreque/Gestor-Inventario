import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from 'react-hook-form'
import Swal from "sweetalert2";
import { format } from 'date-fns';
function formatearFecha(fecha) {
    return format(new Date(fecha), 'dd-MM-yyyy HH:mm:ss');
}
export default function Inventario() {
    const [data, setData] = useState([]);
    const [estados, setEstados] = useState([]);
    const [bodegas, setBodegas] = useState([]);
    const [productos, setProductos] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [inventario, setInventario] = useState({
        "id_inventario": "",
        "id_producto": "",
        "id_bodega": "",
        "id_inventario_estado": "",
    });
    const [showModal, setShowModal] = useState(false);


    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const getData = () => {
        axios.get("http://localhost:5136/api/Inventario").then(response => {
            setData(response.data);
        }).catch(ex => console.log(ex))
    }
    const getEstados = () => {
        axios.get("http://localhost:5136/api/InventarioEstado").then(response => {
            setEstados(response.data);
        }).catch(ex => {
            console.log(ex);
        });
    }
    const getBodegas = () => {
        let token = localStorage.getItem("token");
        const requestOptions = {
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token al encabezado de autorización
            },
        };
        axios.get("http://localhost:5136/api/Bodega",requestOptions).then(response => {
            setBodegas(response.data);
        }).catch(ex => {
            console.log(ex);
        });
    }
    const getProductos = () => {
        axios.get("http://localhost:5136/api/Productos").then((response) => {
            setProductos(response.data);
        }).catch(ex => {
            console.log(ex);
        });
    }
    const onChange = (event) => {
        const { name, value } = event.target;
        console.log(name);
        console.log(value);
        setInventario({
            ...inventario,
            [name]: value, // Usar el nombre del campo como clave dinámica
        });
    }
    useEffect(() => {
        getData();
        getEstados();
        getBodegas();
        getProductos();
    }, []);

    const Delete = (event)=>{
        let id_inventario = event.currentTarget.getAttribute("data-id");
        axios.delete(`http://localhost:5136/api/Inventario/${id_inventario}`).then(response=>{
            Swal.fire({ 
                position: 'top-end', // Personaliza el ancho de la notificación
                toast: true, // Activa el modo Toast
                icon: 'success',
                title: 'Registro eliminado con existo',
                showConfirmButton: false,
                timer: 3000,
            });
            getData();
        }).catch(ex=>console.log(ex))
    }
    const Editar = (event) => {
        handleShowModal();
        setInventario({
            "id_inventario": event.currentTarget.getAttribute("data-id"),
            "id_producto": event.currentTarget.getAttribute("data-producto"),
            "id_bodega": event.currentTarget.getAttribute("data-bodega"),
            "id_inventario_estado": event.currentTarget.getAttribute("data-estado"),
        })
    }

    const Update = ()=>{
        axios.put("http://localhost:5136/api/Inventario",inventario,{
            headers: {
                "Content-Type": "application/json",
            },
        }).then(respose =>{

            Swal.fire({ 
                position: 'top-end', // Personaliza el ancho de la notificación
                toast: true, // Activa el modo Toast
                icon: 'success',
                title: 'Registro actualizado con existo',
                showConfirmButton: false,
                timer: 3000,
            });
            getData();
            handleCloseModal();
        }).catch(ex=>console.log(ex));
    }
    const onSubmit = (data) => {
        console.log(data);
        axios.post("http://localhost:5136/api/Inventario", data, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(
            respose => {
                Swal.fire({
                    position: 'top-end', // Personaliza el ancho de la notificación
                    toast: true, // Activa el modo Toast
                    icon: 'success',
                    title: 'Registro guardado con existo',
                    showConfirmButton: false,
                    timer: 3000,
                });
                getData();
                reset({
                    "id_inventario": "",
                    "id_producto": "",
                    "id_bodega": "",
                    "id_inventario_estado": "",
                });
            }
        ).catch(ex => console.log(ex));
    }
    return (<>
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row justify-content-center">
                    <div className="col-xxl-3">
                        <h1>Inventario</h1>
                    </div>
                    <div className="col-xxl-2">
                        <button type="submit" className="btn btn-primary w-100">Guardar</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="">ID Inventario</label>
                        <input type="text" name="id_inventario" className="form-control"  {...register('id_inventario', { required: true })} id="" />
                        {errors.id_inventario && (<span className="text-danger">*Campo requerido</span>)}
                    </div>
                    <div className="col">
                        <label htmlFor="">Producto</label>
                        <select name="id_producto" className="form-control" id="" {...register('id_producto', { required: true })}>
                            <option value="">Selecciona producto</option>
                            {productos.map((item) => (
                                <option value={item.id_producto}>{item.nombre_producto}({item.id_producto})</option>
                            ))}
                        </select>
                        {errors.id_producto && (<span className="text-danger">*Campo requerido</span>)}
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="">Estado</label>
                        <select name="id_inventario_estado" className="form-control" id="" {...register('id_inventario_estado', { required: true })}>
                            <option value="">Selecciona estado</option>
                            {estados.map((item) => (
                                <option value={item.id_inventario_estado}>{item.nombre_estado_inventario}</option>
                            ))}
                        </select>
                        {errors.id_inventario_estado && (<span className="text-danger">*Campo requerido</span>)}
                    </div>
                    <div className="col">
                        <label htmlFor="">Bodega</label>
                        <select name="id_bodega" className="form-control"  {...register('id_bodega', { required: true })} id="">
                            <option value="">Selecciona Bodega</option>
                            {bodegas.map((item) => (
                                <option value={item.id_bodega}>{item.direccion}</option>
                            ))}
                        </select>
                        {errors.id_bodega && (<span className="text-danger">*Campo requerido</span>)}
                    </div>
                </div>

            </form>

            <div className="row">

            </div>

            <div className="row mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Bodega</th>
                            <th>Estado</th>
                            <th>Creación</th>
                            <th>Última Actualización</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr>
                                <td>{item.id_inventario}</td>
                                <td>{item.nombre_producto}</td>
                                <td>{item.nombre_bodega}</td>
                                <td>{item.nombre_inventario_estado}</td>
                                <td>{formatearFecha(item.fecha_creacion)}</td>
                                <td>{formatearFecha(item.fecha_actualizacion)}</td>
                                <td><Button data-id={item.id_inventario} data-bodega={item.id_bodega} data-producto={item.id_producto} data-estado={item.id_inventario_estado} variant="primary" onClick={Editar}><i className="fa fa-edit"></i></Button></td>
                                <td><button className="btn" onClick={Delete} data-id={item.id_inventario}><i className="fa fa-trash text-danger"></i></button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Editar Inventario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="">ID Inventario</label>
                            <input type="text" name="id_inventario" className="form-control" onChange={onChange} value={inventario.id_inventario} id="" />
                            {errors.id_inventario && (<span className="text-danger">*Campo requerido</span>)}
                        </div>
                        <div className="col">
                            <label htmlFor="">Producto</label>
                            <select name="id_producto" className="form-control" id="" onChange={onChange} value={inventario.id_producto}>
                                <option value="">Selecciona producto</option>
                                {productos.map((item) => (
                                    <option value={item.id_producto}>{item.nombre_producto}({item.id_producto})</option>
                                ))}
                            </select>
                            {errors.id_producto && (<span className="text-danger">*Campo requerido</span>)}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <label htmlFor="">Estado</label>
                            <select name="id_inventario_estado" className="form-control" id="" onChange={onChange} value={inventario.id_inventario_estado}>
                                <option value="">Selecciona estado</option>
                                {estados.map((item) => (
                                    <option value={item.id_inventario_estado}>{item.nombre_estado_inventario}</option>
                                ))}
                            </select>
                            {errors.id_inventario_estado && (<span className="text-danger">*Campo requerido</span>)}
                        </div>
                        <div className="col">
                            <label htmlFor="">Bodega</label>
                            <select name="id_bodega" className="form-control" onChange={onChange} id="" value={inventario.id_bodega}>
                                <option value="">Selecciona Bodega</option>
                                {bodegas.map((item) => (
                                    <option value={item.id_bodega}>{item.direccion}</option>
                                ))}
                            </select>
                            {errors.id_bodega && (<span className="text-danger">*Campo requerido</span>)}
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