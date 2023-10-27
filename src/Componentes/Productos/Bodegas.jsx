
import { useEffect, useState, useRef, useContext } from "react";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import { Button, Modal } from 'react-bootstrap';
import { UserProvider, useUser } from '../../UserContext';
import { format, getDate } from 'date-fns';
import axios from '../../AxiosConfig'
import { Get_all, Update,Delete,Create } from "../../Servicios/BodegaService";
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
        "nombre_bodega": "",
        "direccion": ""
    });
    const GetData = async () => {

        const data = await Get_all();

        setData(data);
    }

    const Clean = () => {

        // También puedes usar la función reset de react-hook-form para reiniciar el formulario
        reset({
            id_bodega: '',
            nombre_bodega: "",
            direccion: ''
        });
    }
    async function DeleteRegister(event) {
        const id_bodega = event.currentTarget.getAttribute('data-id');
      
        async function performDelete() {
          const resultado = await Delete(id_bodega);
          if (resultado) {
            Swal.fire({
              position: 'top-end',
              toast: true,
              icon: 'success',
              title: "Registro eliminado correctamente",
              showConfirmButton: false,
              timer: 3000,
            });
            GetData();
          } else {
            Swal.fire({
              position: 'top-end',
              toast: true,
              icon: 'error',
              title: "Error al eliminar, inténtelo nuevamente",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        }
      
        Swal.fire({
          title: '¿Estás seguro?',
          text: 'Esta acción eliminará el registro de forma permanente.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            performDelete(); // Llama a la función externa con await
            
          }
        });
      };


    async function UpdateRegister(event) {
        const bodega_guardar = {
            'id_bodega': bodega.id_bodega,
            "nombre_bodega": bodega.nombre_bodega,
            'direccion': bodega.direccion
        };


        try {
            const resultado = await Update(bodega_guardar);

            if (resultado===1) {
                Swal.fire({
                    position: 'top-end',
                    toast: true,
                    icon: 'success',
                    title: 'Registro Actualizado con éxito',
                    showConfirmButton: false,
                    timer: 3000,
                });
                handleCloseModal();
                GetData();
            }else{
                Swal.fire({
                    position: 'top-end',
                    toast: true,
                    icon: 'error',
                    title: 'Ha ocurrido un error',
                    showConfirmButton: false,
                    timer: 3000,
                });
            }

        } catch (error) {
            console.log(error);
                        
              Swal.fire({
                position: 'top-end',
                toast: true,
                icon: 'error',
                title: 'ha ocurrido un error',
                showConfirmButton: false,
                timer: 3000,
              });
        }
    }
    const onChangeNombre = (event) => {
        // let nombre = event.target.value;
        const { name, value } = event.target
        setBodega({ ...bodega, [name]: value })
    }
    useEffect(() => {
        GetData();
    }, [])
    const Editar = (event) => {
        let id = event.currentTarget.getAttribute("data-id");
        let nombre = event.currentTarget.getAttribute("data-nombre");
        let direccion = event.currentTarget.getAttribute("data-direccion");

        setBodega({
            "id_bodega": id,
            "nombre_bodega": nombre,
            "direccion": direccion
        });
        handleShowModal();
    }
    async function onSubmit (data) {
        const inventario_estado_guardar = {
            'id_bodega': data.id_bodega,
            'nombre_bodega': data.nombre_bodega,
            'direccion': data.direccion
        };
      
        const resultado = await Create(inventario_estado_guardar);
        if (resultado === 1) {
            Swal.fire({
                position: 'top-end', // Personaliza el ancho de la notificación
                toast: true, // Activa el modo Toast
                icon: 'success',
                title: 'Registro guardado con existo',
                showConfirmButton: false,
                timer: 3000,
            });
        }else{
            Swal.fire({
                position: 'top-end', // Personaliza el ancho de la notificación
                toast: true, // Activa el modo Toast
                icon: 'error',
                title: 'Ha ocurrido un video',
                showConfirmButton: false,
                timer: 3000,
            });
        }
        Clean();
        GetData();
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
                        <button type="button" onClick={Clean} className="btn btn-outline-info">Limpiar</button>

                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-xxl-3">
                        <label htmlFor="">ID</label>
                        <input type="text" name="id_bodega" className="form-control" id="" {...register('id_bodega', { required: true })} />
                        {errors.id_bodega && (<span className="text-danger">*Campo requerido</span>)}
                    </div>
                    <div className="col-xxl-3">
                        <label htmlFor="">Nombre Bodega</label>
                        <input type="text" name="nombre_bodega" className="form-control" id="" {...register('nombre_bodega', { required: true })} />
                        {errors.id_bodega && (<span className="text-danger">*Campo requerido</span>)}
                    </div>
                    <div className="col-xxl-3">
                        <label htmlFor="">Dirección</label>
                        <input type="text" name="direccion" className="form-control" id="" {...register('direccion', { required: true })} />
                        {errors.direccion && (<span className="text-danger">*Campo requerido</span>)}
                    </div>
                </div>
            </form>

            <div className="mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>nombre</th>
                            <th>dirección</th>
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
                                <td>{item.nombre_bodega}</td>
                                <td>{item.direccion}</td>
                                <td>{formatearFecha(item.fecha_creacion)}</td>
                                <td>{formatearFecha(item.fecha_actualizacion)}</td>
                                <td>
                                    <Button variant="primary" onClick={Editar} data-id={item.id_bodega} data-direccion={item.direccion} data-nombre={item.nombre_bodega}>
                                        <i className="fa fa-edit"></i>
                                    </Button>
                                </td>
                                <td>
                                    <button className="btn " data-id={item.id_bodega} onClick={DeleteRegister}>
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
                                <label htmlFor="">ID <small className="text-muted">(Campo solo Lectura)</small></label>
                                <input type="text" name="" disabled value={bodega.id_bodega} className="form-control" id="" />

                            </div>
                            <div className="col">
                                <label htmlFor="">Nombre</label>
                                <input type="text" name="nombre_bodega" className="form-control" id="" onChange={onChangeNombre} value={bodega.nombre_bodega} />
                            </div>

                        </div>
                        <div className="col">
                            <label htmlFor="">Dirección</label>
                            <textarea name="direccion" className="form-control" id="" cols="30" rows="3">{bodega.direccion}</textarea>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={UpdateRegister}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    </>);
}