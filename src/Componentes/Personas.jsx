import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { format } from 'date-fns';
function formatearFecha(fecha) {
    return format(new Date(fecha), 'dd-MM-yyyy HH:mm:ss');
}
export default function Personas() {
    const [data, setData] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [persona, setPersona] = useState({
        'rut': "",
        'nombres': "",
        'apellidos': "",
        'carrera': "",
        'genero': "",
    });
    const onChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "rut":
                setPersona({ ...persona, rut: value });
                break;
            case "nombres":
                setPersona({ ...persona, nombres: value });
                break;
            case "apellidos":
                setPersona({ ...persona, apellidos: value });
                break;
            case "carrera":
                setPersona({ ...persona, carrera: value });
                break;
            case "genero":
                setPersona({ ...persona, genero: value });
                break;
            default:
                break;
        }
    }
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    useEffect(() => {
        GetData();
    }, [])
    const Clean = () => {
        reset({
            rut: '',
            nombres: '',
            apellidos: '',
            carrera: '',
            genero: '',
        })
    }
    const ModalEdit = (event) => {
        setPersona({
            'rut': event.currentTarget.getAttribute("data-rut"),
            'nombres': event.currentTarget.getAttribute("data-nombres"),
            'apellidos': event.currentTarget.getAttribute("data-apellidos"),
            'carrera': event.currentTarget.getAttribute("data-carrera"),
            'genero': event.currentTarget.getAttribute("data-genero"),
        })
        handleShowModal();

    }
    const GetData = () => {
        axios.get("http://localhost:5136/api/Personas").then(response => {
            setData(response.data);
        }).catch(ex => console.log(ex));
    }
    const Delete = (event)=>{
        const rut = event.currentTarget.getAttribute("data-rut");
        axios.delete(`http://localhost:5136/api/Personas/${rut}`).then(response=>{
            Swal.fire({
                position: 'top-end', // Personaliza el ancho de la notificación
                toast: true, // Activa el modo Toast
                icon: 'success',
                title: 'Registro Eliminado con existo',
                showConfirmButton: false,
                timer: 3000,
            });
            GetData();
            
        }).catch(ex=>{
            console.log(ex);
        });
    }
    const Update = () => {
        axios.put("http://localhost:5136/api/Personas", persona).then(response => {
            Swal.fire({
                position: 'top-end', // Personaliza el ancho de la notificación
                toast: true, // Activa el modo Toast
                icon: 'success',
                title: 'Registro Actualizado con existo',
                showConfirmButton: false,
                timer: 3000,
            });
            handleCloseModal();
            GetData();
        }).catch(ex => {

        });
    }
    const onsubmit = (data) => {
        console.log(data);
        const persona_guardar = {
            'rut': data.rut,
            'nombres': data.nombres,
            'apellidos': data.apellidos,
            'carrera': data.carrera,
            'genero': data.genero,
        }
        axios.post("http://localhost:5136/api/Personas", persona_guardar, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            GetData();
            Swal.fire({
                position: 'top-end',
                toast: true,
                icon: 'success',
                title: 'Registro añadido con existo',
                showConfirmButton: false,
                timer: 3000,
            });
        }).catch(ex => console.error(ex));
    };
    return (<>
        <div className="container">
            <form onSubmit={handleSubmit(onsubmit)}>
                <div className="row justify-content-center">
                    <div className="col-xxl-3">
                        <h1>Personas</h1>
                    </div>
                    <div className="col-xxl-1">
                        <button type="submit" className="btn btn-primary w-100">Guardar</button>
                    </div>
                    <div className="col-xxl-1">
                        <button type="button" onClick={Clean} className="btn btn-outline-info w-100">Limpiar</button>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xxl-2">
                        <label htmlFor="">Rut</label>
                        <input type="text" className="form-control" {...register('rut', { required: true })} />
                        {errors.rut && <span className="text-danger">*Campo requerido</span>}
                    </div>
                    <div className="col-xxl-3">
                        <label htmlFor="">Nombres</label>
                        <input type="text" className="form-control" {...register('nombres', { required: true })} />
                        {errors.nombres && (<span className="text-danger">*Campo requerido</span>)}
                    </div>
                    <div className="col-xxl-3">
                        <label htmlFor="">Apellidos</label>
                        <input type="text" className="form-control" {...register('apellidos', { required: true })} />
                        {errors.apellidos && <span className="text-danger">*Campo requerido</span>}
                    </div>

                </div>
                <div className="row justify-content-center">
                    <div className="col-xxl-4">
                        <label htmlFor="">genero</label>
                        
                        <select name="" className="form-control" id="" {...register('genero', { required: true })}>
                            <option value="" selected>seleccione género</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                        {errors.genero && <span className="text-danger">*Campo requerido</span>}
                    </div>
                    <div className="col-xxl-4">
                        <label htmlFor="">Carrera</label>
                        <input type="text" className="form-control" {...register('carrera', { required: true })} />
                        {errors.carrera && <span className="text-danger">*Campo requerido</span>}
                    </div>

                </div>
            </form>

            <div className="row mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Rut</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Carrera</th>
                            <th>Género</th>
                            <th>Creación</th>
                            <th>Última Actualización</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, key) => (
                            <tr>
                                <td>{item.rut}</td>
                                <td>{item.nombres}</td>
                                <td>{item.apellidos}</td>
                                <td>{item.carrera}</td>
                                <td>{item.genero}</td>
                                <td>{formatearFecha(item.fecha_creacion)}</td>
                                <td>{formatearFecha(item.fecha_actualizacion) }</td>
                                <td><Button variant="primary" data-rut={item.rut} data-nombres={item.nombres} data-apellidos={item.apellidos} data-carrera={item.carrera} data-genero={item.genero} onClick={ModalEdit}><i className="fa fa-edit"></i></Button></td>
                                <td><button className="btn" onClick={Delete} data-rut={item.rut}><i className="fa fa-trash text-danger"></i></button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <ModalHeader>
                    <ModalTitle>Editar</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="">Rut</label>
                                <input type="text" className="form-control" name="rut" onChange={onChange} value={persona.rut} />
                            </div>
                            <div className="col">
                                <label htmlFor="">Nombres</label>
                                <input type="text" className="form-control" name="nombres" onChange={onChange} value={persona.nombres} />
                            </div>
                            <div className="col">
                                <label htmlFor="">Apellidos</label>
                                <input type="text" className="form-control" name="apellidos" onChange={onChange} value={persona.apellidos} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label htmlFor="">Carrera</label>
                                <input type="text" className="form-control" name="carrera" onChange={onChange} value={persona.carrera} />
                            </div>
                            <div className="col">
                                <label htmlFor="">Género</label>
                                <input type="text" className="form-control" name="genero" onChange={onChange} value={persona.genero} />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={Update}>Guardar</Button>
                </ModalFooter>
            </Modal>
        </div>
    </>);
}