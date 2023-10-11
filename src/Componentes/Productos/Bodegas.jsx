import axios from "axios";
import { useEffect, useState, useRef,useContext } from "react";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import { Button, Modal } from 'react-bootstrap';
import { UserProvider, useUser } from '../../UserContext';  
import { format } from 'date-fns';
function formatearFecha(fecha) {
    return format(new Date(fecha), 'dd-MM-yyyy HH:mm:ss');
}
export default function Bodegas() {

    useEffect(() => {
        GetData();
    }, [])
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const [data, setData] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [bodega, setBodega] = useState({
        "id_bodega": "",
        "direccion": ""
    });
    const GetData = () => {
        let token = localStorage.getItem("token");
        const requestOptions = {
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token al encabezado de autorización
            },
          };
        axios.get("http://localhost:5136/api/Bodega",requestOptions).then(response => {
            setData(response.data);
            console.log(response.data);
        }).catch(ex => {
            console.log(ex);
        });
    }

    const Clean = () => {

        // También puedes usar la función reset de react-hook-form para reiniciar el formulario
        reset({
            id_bodega: '',
            direccion: ''
        });
    }
    const Delete = (event) => {
        const id_bodega = event.currentTarget.getAttribute("data-id");
        let token = localStorage.getItem("token");
        const requestOptions = {
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token al encabezado de autorización
            },
          };
        axios.delete(`http://localhost:5136/api/Bodega/${id_bodega}`,requestOptions).then(() => {
            GetData();
            Swal.fire({
                position: 'top-end',
                toast: true,
                icon: 'success',
                title: 'Registro Eliminado con existo',
                showConfirmButton: false,
                timer: 3000,
            });
        }).catch(() => {

        });
    }
    const Update = (event) => {
        console.log(bodega);
        const bodega_guardar = {
            'id_bodega': bodega.id_bodega,
            'direccion': bodega.direccion
        };
        let token = localStorage.getItem("token");
        const requestOptions = {
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token al encabezado de autorización
            },
          };
        axios.put("http://localhost:5136/api/Bodega/", bodega_guardar,requestOptions).then(
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
        setBodega({ ...bodega, "direccion": nombre })
    }
    useEffect(() => {
        GetData();
    }, [])
    const Editar = (event) => {
        let id = event.currentTarget.getAttribute("data-id");
        let nombre = event.currentTarget.getAttribute("data-nombre");
        console.log(id);
        setBodega({
            "id_bodega": id,
            "direccion": nombre
        });
        handleShowModal();
    }
    const onSubmit = (data) => {
        const inventario_estado_guardar = {
            'id_bodega': data.id_bodega,
            'direccion': data.direccion
        };
        let token = localStorage.getItem("token");
        axios.post('http://localhost:5136/api/Bodega/', inventario_estado_guardar, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
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
                        <h1>Bodegas</h1>
                 

                    </div>
                    <div className="col-xxl-1">
                        <button type="submit" className="btn btn-primary">Guardar</button>

                    </div>
                    <div className="col-xxl-1">
                        <button type="button" onClick={Clean} className="btn btn-info">Limpiar</button>

                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-xxl-3">
                        <label htmlFor="">ID</label>
                        <input type="text" name="" className="form-control" id="" {...register('id_bodega', { required: true })} />
                        {errors.id_bodega && (<span className="text-danger">*Campo requerido</span>)}
                    </div>
                    <div className="col-xxl-3">
                        <label htmlFor="">Nombre</label>
                        <input type="text" name="" className="form-control" id="" {...register('direccion', { required: true })} />
                        {errors.direccion && (<span className="text-danger">*Campo requerido</span>)}
                    </div>
                </div>
            </form>

            <div className="mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>fecha creación</th>
                            <th>fecha Actualización</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, key) => (
                            <tr key={item.id_bodega}>
                                <td>{item.id_bodega}</td>
                                <td>{item.direccion}</td>
                                <td>{formatearFecha(item.fecha_creacion)}</td>
                                <td>{formatearFecha(item.fecha_actualizacion)}</td>
                                <td>
                                    <Button variant="primary" onClick={Editar} data-id={item.id_bodega} data-nombre={item.direccion}>
                                        <i className="fa fa-edit"></i>
                                    </Button>
                                </td>
                                <td>
                                    <button className="btn " data-id={item.id_bodega} onClick={Delete}>
                                        <i className="fa fa-trash text-danger"></i>
                                    </button>
                                </td>
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
                                <label htmlFor="">ID</label>
                                <input type="text" name="" readOnly value={bodega.id_bodega} className="form-control" id="" />
                            </div>
                            <div className="col">
                                <label htmlFor="">Dirección</label>
                                <input type="text" name="" className="form-control" id="" onChange={onChangeNombre} value={bodega.direccion} />
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