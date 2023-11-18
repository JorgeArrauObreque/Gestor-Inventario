import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Get_all,Delete,Create,Update } from "../../Servicios/ProductoService";
import { format } from 'date-fns';
function formatearFecha(fecha) {
    return format(new Date(fecha), 'dd-MM-yyyy HH:mm:ss');
}
export default function Productos() {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const [producto, setProducto] = useState({
        'id_producto': "",
        'nombre_producto': "",
        'id_proveedor': "",
        'marca': "",
        'descripcion': "",
        'id_categoria': "",
        'id_tipo_producto': "",

    });
    const [data, setData] = useState([]);
    const {register,reset,formState:{errors},handleSubmit} = useForm();
    const [proveedores, setProveedores] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [tipoProducto, setTipoProducto] = useState([]);
    const GetProveedores = () => {
        axios.get("http://localhost:5136/api/Proveedores").then((response) => {
            setProveedores(response.data);
        }).catch(ex => console.log());
    }
    const GetCategoria = () => {
        let token = localStorage.getItem("token");
        const requestOptions = {
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token al encabezado de autorización
            },
          };
        axios.get("http://localhost:5136/api/Categorias",requestOptions).then(response => {
            setCategorias(response.data);
        }).catch(ex => {
            console.log(ex);
        });
    }
    const GettipoProducto = () => {
        axios.get("http://localhost:5136/api/TipoProducto").then(response => {
            setTipoProducto(response.data);
        }).catch(ex => {
            console.log(ex);
        });
    }

    async function GetData()  {
        const data_get = await Get_all();
        setData(data_get);
    }

    useEffect(() => {
        GetData();
        GetProveedores();
        GetCategoria();
        GettipoProducto();
    }, [])
    const Editar = (event) => {
        let id = event.currentTarget.getAttribute("data-id");

        let nombre_producto = event.currentTarget.getAttribute("data-nombre-producto");
        let marca = event.currentTarget.getAttribute("data-marca");
        let descripcion = event.currentTarget.getAttribute("data-descripcion");
        let proveedor = event.currentTarget.getAttribute("data-proveedor");
        let tipo_producto = event.currentTarget.getAttribute("data-tipo-producto");
        let categoria = event.currentTarget.getAttribute("data-categoria");
        console.log({
            'id_producto': id,
            'nombre_producto': nombre_producto,
            'id_proveedor': proveedor,
            'marca': marca,
            'descripcion': descripcion,
            'id_categoria': categoria,
            'id_tipo_producto': tipo_producto,
        });
        setProducto({
            'id_producto': id,
            'nombre_producto': nombre_producto,
            'id_proveedor': proveedor,
            'marca': marca,
            'descripcion': descripcion,
            'id_categoria': categoria,
            'id_tipo_producto': tipo_producto,
        })

        handleShowModal();
    }
    const Clean = ()=>{
        reset({
            'id_producto': "",
            'nombre_producto': "",
            'id_proveedor': "",
            'marca': "",
            'descripcion': "",
            'id_categoria': "",
            'id_tipo_producto': "",
    
        })
    }
    const onChangeProducto = (event) => {
        const { name, value } = event.target;
        setProducto({
          ...producto,
          [name]: value, // Usar el nombre del campo como clave dinámica
        });
      };




      async function DeleteRegister(event) {
        const id_producto = event.currentTarget.getAttribute("data-id");
      
        async function performDelete() {
          const resultado = await Delete(id_producto);
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




      async function UpdateRegister(){

        const response = await Update(producto);
        GetData();
        handleCloseModal();
    
      }
      async function onSubmit(data){
        const response = await Create(data);
        Swal.fire({
            position: 'top-end', // Personaliza el ancho de la notificación
            toast: true, // Activa el modo Toast
            icon: 'success',
            title: 'Registro creado con existo',
            showConfirmButton: false,
            timer: 3000,
        });
        Clean();
        GetData();
      }
    return (<>
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row justify-content-center">
                <div className="col-xxl-3">
                    <h1>Productos</h1>
                </div>
                <div className="col-xxl-1">
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    
                </div>
                <div className="col-xxl-1">
                <button type="button" onClick={Clean} className="btn btn-outline-info">Limpiar</button>
                </div>
            </div>
            <div className="row justify-content-center mt-4">
                <div className="col-xxl-3">
                    <label htmlFor="">ID Producto</label>
                    <input type="text" name="" id="" className="form-control" {...register('id_producto',{required:true})} />
                    {errors.id_producto && (<span className="text-danger">*Campo Requerido</span>)}
                </div>
                <div className="col-xxl-3">
                    <label htmlFor="">Nombre Producto</label>
                    <input type="text" name="" id="" className="form-control" {...register('nombre_producto',{required:true})} />
                    {errors.nombre_producto && (<span className="text-danger">*Campo Requerido</span>)}
                </div>
                <div className="col-xxl-3">
                    <label htmlFor="">Marca</label>
                    <input type="text" name="" id="" className="form-control" {...register('marca',{required:true})} />
                    {errors.marca && (<span className="text-danger">*Campo Requerido</span>)}
                </div>

            </div>
            <div className="row justify-content-center mt-3">
                <div className="col-xxl-3">
                    <label htmlFor="">Tipo Producto</label>
                    <select name="" className="form-control" id="" {...register('id_tipo_producto',{required:true})}>
                        <option value="">Seleccione tipo de producto</option>
                        {tipoProducto.map((item) => (
                            <option value={item.id_tipo_producto}>{item.nombre_tipo_producto}</option>
                        ))}
                    </select>
                    {errors.id_tipo_producto && (<span className="text-danger">*Campo Requerido</span>)}
                </div>
                <div className="col-xxl-3">
                    <label htmlFor="">Categoria</label>
                    <select name="" className="form-control" id="" {...register('id_categoria',{required:true})}>
                        <option value="">Seleccione Categoria</option>
                        {categorias.map((item) => (
                            <option value={item.id_categoria}>{item.nombre_categoria}</option>
                        ))}
                    </select>
                    {errors.id_categoria && (<span className="text-danger">*Campo Requerido</span>)}
                </div>
                <div className="col-xxl-3">
                    <label htmlFor="">Proveedor</label>
                    <select name="" className="form-control" id="" {...register('id_proveedor',{required:true})}>
                        <option value="">Seleccione Proveedor</option>
                        {proveedores.map((item) => (
                            <option value={item.id_proveedor}>{item.nombre_proveedor}</option>
                        ))}

                    </select>
                    {errors.id_proveedor && (<span className="text-danger">*Campo Requerido</span>)}
                </div>

            </div>
            <div className="row justify-content-center mt-3">
                <div className="col-xxl-9">
                    <label htmlFor="">Descripción</label>
                    <textarea name="" className="form-control" id="" cols="30" rows="3" {...register('descripcion',{required:true})}></textarea>
                    {errors.descripcion && (<span className="text-danger">*Campo Requerido</span>)}
                </div>
            </div>
            </form>
       
            
            <div className="row mt-3">
                <table className="table">
                 
                        <tr className='table-head'>
                            <th>ID</th>
                            <th>Nombre Producto</th>
                            <th>Marca</th>
                            <th>Descripción</th>
                            <th>Proveedor</th>
                            <th>Tipo Producto</th>
                            <th>Categoría</th>
                            <th></th>
                            <th></th>
                        </tr>
             
                    <tbody>
                        {data.map((item) => (
                            <tr>
                                <td>{item.id_producto}</td>
                                <td>{item.nombre_producto}</td>
                                <td>{item.marca}</td>
                                <td>{item.descripcion}</td>
                                <td>{item.proveedor}</td>
                                <td>{item.tipo_producto}</td>
                                <td>{item.categoria}</td>
                                <td><Button variant="primary" data-id={item.id_producto} data-nombre-producto={item.nombre_producto} data-marca={item.marca}
                                    data-descripcion={item.descripcion} data-proveedor={item.id_proveedor} data-tipo-producto={item.id_tipo_producto} data-categoria={item.id_categoria} onClick={Editar}><i className="fa fa-edit"></i></Button></td>
                                <td><button onClick={DeleteRegister} data-id={item.id_producto} className="btn"><i className="fa fa-trash text-danger"></i></button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row justify-content-center mt-4">
                        <div className="col-xxl-4">
                            <label htmlFor="">ID Producto</label>
                            <input type="text" name="id_producto" onChange={onChangeProducto} value={producto.id_producto} className="form-control" />
                        </div>
                        <div className="col-xxl-4">
                            <label htmlFor="">Nombre Producto</label>
                            <input type="text" name="nombre_producto" id="" onChange={onChangeProducto} value={producto.nombre_producto} className="form-control" />
                        </div>
                        <div className="col-xxl-4">
                            <label htmlFor="">Marca</label>
                            <input type="text" name="marca" id="" onChange={onChangeProducto} value={producto.marca} className="form-control" />
                        </div>

                    </div>
                    <div className="row justify-content-center mt-3">
                        <div className="col-xxl-4">
                            <label htmlFor="">Tipo Producto</label>
                            <select name="id_tipo_producto" value={producto.id_tipo_producto} onChange={onChangeProducto} className="form-control" id="">
                                <option value="">Seleccione tipo de producto</option>
                                {tipoProducto.map((item) => (
                                    <option value={item.id_tipo_producto}>{item.nombre_tipo_producto}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-xxl-4">
                            <label htmlFor="">Categoria</label>
                            <select name="id_categoria" value={producto.id_categoria} onChange={onChangeProducto} className="form-control" id="">
                                <option value="">Seleccione Categoria</option>
                                {categorias.map((item) => (
                                    <option value={item.id_categoria}>{item.nombre_categoria}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-xxl-4">
                            <label htmlFor="">Proveedor</label>
                            <select name="id_proveedor" value={producto.id_proveedor} onChange={onChangeProducto} className="form-control" id="">
                                <option value="">Seleccione Proveedor</option>
                                {proveedores.map((item) => (
                                    <option value={item.id_proveedor}>{item.nombre_proveedor}</option>
                                ))}

                            </select>
                        </div>

                    </div>
                    <div className="row justify-content-center mt-3">
                        <div className="col-xxl-12">
                            <label htmlFor="">Descripción</label>
                            <textarea name="descripcion" className="form-control" onChange={onChangeProducto} value={producto.descripcion} id="" cols="30" rows="3"></textarea>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={UpdateRegister} >
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    </>);
}