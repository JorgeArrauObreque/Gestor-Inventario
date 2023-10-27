import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Get_all,Delete,Update,Create } from "../Servicios/UsuariosServices";
import Swal from "sweetalert2";
import { format } from 'date-fns';

function formatearFecha(fecha) {
    return format(new Date(fecha), 'dd-MM-yyyy HH:mm:ss');
}


export default function Usuarios() {
    const busqueda = useRef();
    const [data, setData] = useState([]);
    const [usuario, setUsuario] = useState({
        "id": "",
        "username": "",
        "correo": "",
        "rol": "",
    });
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const filterData = (event) => {
        // Primero, intenta encontrar coincidencias en el campo "id_user"
        let searchTerm = busqueda.current.value;
        if (searchTerm === undefined || searchTerm === '') {
            GetData();
        } else {
            const resultsById = data.filter((item) =>
                item.id_user.toString().includes(searchTerm)
            );

            // Si se encuentran coincidencias en "id_user", devuélvelas
            if (resultsById.length > 0) {
                setData(resultsById);
                return resultsById;
            }

            // Si no se encuentran coincidencias en "id_user", busca en el campo "username"
            const resultsByUserName = data.filter((item) =>
                item.username.includes(searchTerm)
            );

            console.log(resultsByUserName);
            if (resultsByUserName.length > 0) {
                setData(resultsByUserName);
                return resultsByUserName;
            }


            const resultemail = data.filter((item) =>
                item.email.includes(searchTerm)
            );

            console.log(resultemail);
            // Devuelve las coincidencias encontradas en "username" o un arreglo vacío si no se encuentran
            setData(resultemail);
        }


    };



    async function GetData () {
        const data_get = await Get_all();
        setData(data_get);
    }
    useEffect(() => {
        GetData();
    }, []);
    const selectUser = (event) => {
        handleShowModal();
        let id_dato = event.currentTarget.getAttribute("data-id");

        let username = event.currentTarget.getAttribute("data-username");
        let correo = event.currentTarget.getAttribute("data-email");
        let rol = event.currentTarget.getAttribute("data-rol");

        setUsuario({
            "id": id_dato,
            "username": username,
            "correo": correo,
            "rol": rol,
        })
    }

    const onChange = (event) => {
        const { name, value } = event.target;
        setUsuario({ ...usuario, [name]: value })
    }


    const Update = () => {
        const usuario_guardar = {
            id_user: usuario.id,
            username: usuario.username,
            email: usuario.correo,
            id_rol: usuario.rol,
        };
        console.log(usuario_guardar);
        let token = localStorage.getItem("token");
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .put("http://localhost:5136/api/Usuarios", usuario_guardar, requestOptions)
            .then((response) => {
                handleCloseModal();
                GetData();
                Swal.fire({
                    position: "top-end",
                    toast: true,
                    icon: "success",
                    title: "Usuario actualizado con éxito",
                    showConfirmButton: false,
                    timer: 3000,
                });
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    position: "top-end",
                    toast: true,
                    icon: "error",
                    title: "Hubo un problema al actualizar el usuario",
                    showConfirmButton: false,
                    timer: 3000,
                });
            });
    };

    const Onsubmit = (data) => {
        const usuario_guardar = {
            id_user: 1,
            username: data.username,
            email: data.correo,
            id_rol: data.rol,
        };

        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios
            .post('http://localhost:5136/api/Usuarios', usuario_guardar, requestOptions)
            .then((response) => {
                // Procesar la respuesta exitosa aquí, si es necesario
                GetData(); // Suponiendo que GetData es una función para actualizar los datos
                Swal.fire({
                    position: "top-end",
                    toast: true,
                    icon: "success",
                    title: "Usuario creado con éxito",
                    showConfirmButton: false,
                    timer: 3000,
                });
                reset({
                    "username": "",
                    "correo": "",
                    "rol": "",
                })
            })
            .catch((error) => {
                // Manejar errores aquí
                console.error(error);
            });
    };
    const Delete = (event) => {
        let id_usuario = event.currentTarget.getAttribute("data-id");
        axios.delete(`http://localhost:5136/api/Usuarios/${id_usuario}`).then(respose => {
            Swal.fire({
                position: "top-end",
                toast: true,
                icon: "success",
                title: "Usuario Eliminado con éxito",
                showConfirmButton: false,
                timer: 3000,
            });
            GetData();
        }).catch(ex => {
            Swal.fire({
                position: "top-end",
                toast: true,
                icon: "error",
                title: "Hubo un problema al eliminar",
                showConfirmButton: false,
                timer: 3000,
            });
        })
    }
    return (<>

        <div className="container">
            <form onSubmit={handleSubmit(Onsubmit)}>
                <div className="row justify-content-center">
                    <div className="col-xxl-5">
                        <h1>Usuarios</h1>
                    </div>
                    <div className="col-xxl-2">
                        <button type="submit" className="btn btn-primary w-100">Guardar</button>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xxl-3">
                        <label htmlFor="">User</label>
                        <input type="text" name="username" className="form-control" {...register("username", { required: true })} placeholder="" />
                        {errors.username && (<span className="text-danger">*Campo Requerido</span>)}
                    </div>
                    <div className="col-xxl-3">
                        <label htmlFor="">Correo</label>
                        <input type="text" name="Correo" className="form-control" placeholder="" {...register("correo", { required: true })} />
                        {errors.correo && (<span className="text-danger">*Campo Requerido</span>)}
                    </div>
                    <div className="col-xxl-3">
                        <label htmlFor="">Rol</label>
                        <select name="rol" className="form-control" {...register("rol", { required: true })} id="">
                            <option value="">Seleccionar Rol</option>
                            <option value="1">Administrador</option>
                            <option value="3">Bodeguero</option>
                        </select>
                        {errors.rol && (<span className="text-danger">*Campo Requerido</span>)}
                    </div>
                </div>
            </form>
            <div className="row mt-5">
                <div className="col-xxl-3 d-flex">
                    <input type="text" className="form-control" placeholder="Buscar Usuario" ref={busqueda} /><button onClick={filterData} className="btn"><i className="fa fa-search"></i></button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID User</th>
                            <th>User</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr>
                                <td>{item.id_user}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.rolNavigation.nombre_rol}</td>
                                <td>{formatearFecha(item.fecha_creacion)}</td>
                                <td>{formatearFecha(item.fecha_actualizacion)}</td>
                                <td><Button data-id={item.id_user} onClick={selectUser} data-username={item.username} data-email={item.email} data-rol={item.rolNavigation.id_rol} variant="primary"><i className="fa fa-edit"></i></Button></td>
                                <td><button onClick={Delete} data-id={item.id_user} className="btn"><i className="fa fa-trash text-danger"></i></button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>

        <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Editar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="">ID</label>
                            <input type="text" name="id" value={usuario.id} onChange={onChange} className="form-control" id="" />
                        </div>
                        <div className="col">
                            <label htmlFor="">Username</label>
                            <input type="text" name="username" value={usuario.username} onChange={onChange} className="form-control" id="" />
                        </div>

                    </div>
                    <div className="row mt-3">

                        <div className="col">
                            <label htmlFor="">Rol</label>
                            <select name="rol" id="" className="form-control" value={usuario.rol} onChange={onChange}>
                                <option value="">Seleccionar Rol</option>
                                <option value="1">Administrador</option>
                                <option value="3">Bodeguero</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="">Correo</label>
                            <input type="text" name="correo" value={usuario.correo} onChange={onChange} className="form-control" id="" />
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
    </>);
}