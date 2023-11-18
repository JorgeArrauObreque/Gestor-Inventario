import axios from '../../AxiosConfig'
import { useEffect, useState,useRef,useContext } from "react";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import { Button, Modal } from 'react-bootstrap';
import { userContext } from "../../App";
import { format } from 'date-fns';
import { Get_all,Delete,Update, Create } from '../../Servicios/CategoriaService';
function formatearFecha(fecha) {
    return format(new Date(fecha), 'dd-MM-yyyy HH:mm:ss');
}
export default function Categorias() {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };
  

    const handleCloseModal = () => {
        setShowModal(false);
    };


    const [data, setData] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [categoria, setCategoria] = useState({
        "id_categoria": "",
        "nombre_categoria": ""
    });
    async function GetData () {
  
        const data_get = await Get_all();
        setData(data_get);
    }

    const Clean = ()=>{
   
        reset({
            id_categoria: '',
            nombre_categoria: ''
        });
    }
    
    async function DeleteRegister (event){
        const id_categoria = event.currentTarget.dataset.id;
        async function performDelete() {
            const resultado = await Delete(id_categoria);
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
                 performDelete();
                
            }
          });
        
  
    }
    async function UpdateRegister  (event)  {
        
        const tipo_categoria_guardar = {
            'id_categoria': categoria.id_categoria,
            'nombre_categoria': categoria.nombre_categoria
        };
        const resultado = await Update(tipo_categoria_guardar);
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
                title: 'ha ocurrido un error',
                showConfirmButton: false,
                timer: 3000,
            });
        }
        GetData();
        handleCloseModal();
    }
    const onChangeNombre = (event) => {
        let nombre = event.target.value;
        setCategoria({ ...categoria, "nombre_categoria": nombre })
    }
    useEffect(() => {
        GetData();
        
   
    }, [])
    const Editar = (event)=>{
        let id = event.currentTarget.getAttribute("data-id");
        let nombre = event.currentTarget.getAttribute("data-nombre");
        console.log(id);
        setCategoria({
            "id_categoria": id,
            "nombre_categoria": nombre
        });
        handleShowModal();
    }
    async function onSubmit (data){
   
        const categoria_guardar = {
            'id_categoria': data.id_categoria,
            'nombre_categoria': data.nombre_categoria
        };

        const resultado = await Create(categoria_guardar)
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
                title: 'ha ocurrido un error',
                showConfirmButton: false,
                timer: 3000,
            });
        }
        GetData();
        Clean();
        
    }
    return (<>
        <div className="container">
           
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row justify-content-center">
                <div className="col-xxl-5">
                    <h1>Categorías</h1> 
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
                        <input type="text" name="" className="form-control"  id="" {...register('id_categoria',{required:true})} />
                        {errors.id_categoria && (<span className="text-danger">*Campo requerido</span>)}
                    </div>
                    <div className="col-xxl-3">
                        <label htmlFor="">Nombre</label>
                        <input type="text" name="" className="form-control" id="" {...register('nombre_categoria',{required:true})} />
                        {errors.nombre_categoria && (<span className="text-danger">*Campo requerido</span>)}
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
                                <td>{item.id_categoria}</td>
                                <td>{item.nombre_categoria}</td>
                                <td>{formatearFecha(item.fecha_creacion)} </td>
                                <td>{formatearFecha(item.fecha_actualizacion)}</td>
                                <td>
                                    <Button variant="primary" onClick={Editar} data-id={item.id_categoria} data-nombre={item.nombre_categoria}>
                                        <i className="fa fa-edit"></i>
                                    </Button></td>
                                <td><button className="btn " data-id={item.id_categoria} onClick={DeleteRegister}><i className="fa fa-trash text-danger"></i></button></td>
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
                                <input type="text" name="" readOnly value={categoria.id_categoria} className="form-control" id="" />
                            </div>
                            <div className="col">
                                <label htmlFor=""></label>
                                <input type="text" name="" className="form-control" id="" onChange={onChangeNombre} value={categoria.nombre_categoria} />
                            </div>
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