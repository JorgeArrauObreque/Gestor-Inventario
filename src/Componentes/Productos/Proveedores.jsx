import { useEffect, useState, useRef } from "react";
import { useForm } from 'react-hook-form'
import axios from "axios";

import Swal from "sweetalert2";
import { format } from 'date-fns';
function formatearFecha(fecha) {
    return format(new Date(fecha), 'dd-MM-yyyy HH:mm:ss');
}
export default function Proveedores() {
    const inputRef = useRef();
    const busqueda = useRef();
    const [estado, setEstado] = useState(false);
    const [data, setData] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const limpiar = () => {
        inputRef.current.value = "";
    };
    const Getdata = () => {
        axios.get("http://localhost:5136/api/Proveedores").then((response) => {
            setData(response.data);
            setEstado(true);
        }).catch(ex => console.log());
    }
    useEffect(() => {
        Getdata();
    }, [])
    const [proveedor, setProveedor] = useState({
        'id_proveedor': "",
        'nombre_proveedor': "",
        'correo': "",
        'telefono': "",
    });
    const filterData = (event) => {
        // Primero, intenta encontrar coincidencias en el campo "id_user"
        let searchTerm = busqueda.current.value;
        if (searchTerm === undefined || searchTerm === '') {
            Getdata();
        } else {
        const resultsById = data.filter((item) =>
            item.id_proveedor.toString().includes(searchTerm)
        );

            // Si se encuentran coincidencias en "id_user", devuélvelas
            if (resultsById.length > 0) {
                setData(resultsById);
                return resultsById;
            }

            // Si no se encuentran coincidencias en "id_user", busca en el campo "username"
            const resultsByName = data.filter((item) =>
                item.nombre_proveedor.includes(searchTerm)
            );

            console.log(resultsByName);
            if (resultsByName.length > 0) {
                setData(resultsByName);
                return resultsByName;
            }


            const resultemail = data.filter((item) =>
                item.correo.includes(searchTerm)
            );

            console.log(resultemail);
            // Devuelve las coincidencias encontradas en "username" o un arreglo vacío si no se encuentran
            setData(resultemail);
        }


    };

    const onChangeProveedor = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "id":
                setProveedor({
                    ...proveedor,
                    id_proveedor: value,
                });
                break;
            case "nombre":
                setProveedor({
                    ...proveedor,
                    nombre_proveedor: value,
                });
                break;
            case "correo":
                setProveedor({
                    ...proveedor,
                    correo: value,
                });
                break;
            case "telefono":
                setProveedor({
                    ...proveedor,
                    telefono: value,
                });
                break;
            default:
                break;
        }
    }

    const eliminar = (event) => {
        const ide = event.currentTarget.getAttribute("data-id");
        alert(ide);
        axios.delete(`http://localhost:5136/api/Proveedores/${ide}`)
            .then(response => {
                Getdata();
                Swal.fire({
                    position: 'top-end', // Personaliza el ancho de la notificación
                    toast: true, // Activa el modo Toast
                    icon: 'success',
                    title: 'Registro Eliminado correctamente',
                    showConfirmButton: false,
                    timer: 3000,
                });
            }).catch(ex => console.log());
    }
    const actualizar = (event) => {
        axios.put("http://localhost:5136/api/Proveedores/", proveedor).then(
            (result) => {
                const button = document.querySelector("#btn-cerrar");
                button.click();
                Getdata();
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
    const modaleditar = (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        const nombre = event.currentTarget.getAttribute("data-nombre");
        const correo = event.currentTarget.getAttribute("data-correo");
        const telefono = event.currentTarget.getAttribute("data-telefono");
        setProveedor({
            'id_proveedor': id,
            'nombre_proveedor': nombre,
            'correo': correo,
            'telefono': telefono,
        });
    }
    function OnSubmitGuardar(data) {

        const proveedor_guardar = {
            'id_proveedor': data.id_proveedor,
            'nombre_proveedor': data.nombre_proveedor,
            'correo': data.correo,
            'telefono': data.telefono,
        };
        console.log(proveedor_guardar);
        axios.post('http://localhost:5136/api/Proveedores/', proveedor_guardar, {
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
            Getdata();
        }).catch(ex => console.log(ex));
    }
    return (<>

        <div className="container">
            <div className="row">

                <div className="container">
                    <form onSubmit={handleSubmit(OnSubmitGuardar)}>
                        <div className="row justify-content-center">
                            <div className="col-xl-7">
                                <h1>Proveedores</h1>
                            </div>
                            <div className="col-xxl-2">
                                <button type="submit" className="btn btn-primary">Guardar</button>
                                <button onClick={limpiar} className="btn btn-outline-info">Limpiar</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="id_proveedor">ID</label>
                                <input
                                    type="text"
                                    name="id_proveedor"
                                    className="form-control"
                                    {...register('id_proveedor', { required: true })}
                                />
                                {errors.id_proveedor && (
                                    <span className="text-danger">*Campo requerido</span>
                                )}
                            </div>
                            <div className="col">
                                <label htmlFor="nombre_proveedor">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre_proveedor"
                                    className="form-control"
                                    {...register('nombre_proveedor', { required: true })}
                                />
                                {errors.nombre_proveedor && (
                                    <span className="text-danger">*Campo requerido</span>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="correo">Correo</label>
                                <input
                                    type="text"
                                    name="correo"
                                    className="form-control"
                                    {...register('correo', { required: true })}
                                />
                                {errors.correo && (
                                    <span className="text-danger">*Campo requerido</span>
                                )}
                            </div>
                            <div className="col">
                                <label htmlFor="telefono">Teléfono</label>
                                <input
                                    type="text"
                                    name="telefono"
                                    className="form-control"
                                    {...register('telefono', { required: true })}
                                />
                                {errors.telefono && (
                                    <span className="text-danger">*Campo requerido</span>
                                )}
                            </div>
                        </div>
                    </form>

                </div>

                <div className="container mt-5">
                <div className="col-xxl-3 d-flex">
                    <input type="text" className="form-control" placeholder="Buscar Proveedor" ref={busqueda} /><button onClick={filterData} className="btn"><i className="fa fa-search"></i></button>
                </div>
                    {estado && (
                        
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Telefono</th>
                                    <th>Creación</th>
                                    <th>Última Actualización</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, key) => (
                                    <tr>
                                        <td>
                                            {item.id_proveedor}
                                        </td>
                                        <td>
                                            {item.nombre_proveedor}
                                        </td>
                                        <td>
                                            {item.correo}
                                        </td>
                                        <td>
                                            {item.telefono}
                                        </td>
                                        <td>{formatearFecha(item.fecha_creacion)}</td>
                                        <td>{formatearFecha(item.fecha_actualizacion)}</td>

                                        <td><button onClick={modaleditar} data-id={item.id_proveedor} data-nombre={item.nombre_proveedor} data-correo={item.correo} data-telefono={item.telefono} data-bs-toggle="modal" data-bs-target="#modalactualizar" className="btn btn-primary"><i className="fa fa-edit "></i></button></td>
                                        <td><button onClick={eliminar} data-id={item.id_proveedor} className="btn"><i className="fa fa-trash text-danger"></i></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {!estado && (
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    )}
                    <div id="modalactualizar" class="modal fade" tabindex="-1">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Editar Proveedor</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="">ID</label>
                                            <input type="text" readOnly name="id" value={proveedor.id_proveedor} onChange={onChangeProveedor} className="form-control" id="" ref={inputRef} />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Nombre</label>
                                            <input type="text" name="nombre" value={proveedor.nombre_proveedor} onChange={onChangeProveedor} className="form-control" id="" ref={inputRef} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="">Correo</label>
                                            <input type="text" name="correo" value={proveedor.correo} onChange={onChangeProveedor} className="form-control" id="" ref={inputRef} />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Teléfono</label>
                                            <input type="text" name="telefono" value={proveedor.telefono} onChange={onChangeProveedor} className="form-control" id="" ref={inputRef} />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button id="btn-cerrar" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="button" onClick={actualizar} class="btn btn-primary">Guardar Cambios</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>);
}