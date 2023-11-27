
import { Get_all as get_all_categorias } from "../../../Servicios/CategoriaService";
import { Get_all as get_all_tipo_productos } from "../../../Servicios/TipoProducto";
import { Get_all as get_all_proveedores } from "../../../Servicios/ProveedorService";

import { Create2 } from "../../../Servicios/ProductoService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
export default function FormProducto({ cambiarEstado,getProductos,cambiarProducto }) {


    const { formState:{errors}, clearErrors,reset,register,handleSubmit } = useForm();

    const [categorias, setCategorias] = useState([]);
    async function GetCategorias() {
        let categorias = await get_all_categorias();
        console.log(categorias);
        setCategorias(categorias);
    }

    const [proveedores, setProveedores] = useState([]);
    async function GetProveedores() {
        let proveedores = await get_all_proveedores();

        setProveedores(proveedores);
    }

    const [tipoProducto, setTipoProducto] = useState([]);
    async function GetTipoProducto() {
        let tipo_producto = await get_all_tipo_productos();

        setTipoProducto(tipo_producto);
    }
    async function onSubmit(data){
        let data_formulario = 
        {
        "id_producto": '0',
        "nombre_producto": data.nombre_producto,
        "id_proveedor": data.id_proveedor,
        "marca": data.marca,
        "descripcion": data.descripcion,
        "id_categoria": data.categoria,
        "id_tipo_producto": data.tipo
        }
        const response = await Create2(data_formulario);
        console.log(response.data.mensaje);
        switch (response.status) {
            case 200:
                Swal.fire({
                    position: 'top-end', // Personaliza el ancho de la notificación
                    toast: true, // Activa el modo Toast
                    icon: 'success',
                    title: response.data.mensaje,
                    showConfirmButton: false,
                    timer: 3000,
                });
                
                cambiarEstado(false);
                reset();
                getProductos();
                cambiarProducto(response.data.id_producto);
                break;
            case 202:
                Swal.fire({
                    position: 'top-end', // Personaliza el ancho de la notificación
                    toast: true, // Activa el modo Toast
                    icon: 'info',
                    title: response.data.mensaje,
                    showConfirmButton: false,
                    timer: 3000,
                });
           
                break;
        
            default:
                break;
        }
   
       
    }
    useEffect(() => {
        GetCategorias();
        GetProveedores();
        GetTipoProducto();
    }, [])
    return (<>
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className='container'>
               
                <div className='row'>
                    <div className='col'>
                        <label htmlFor="">Nombre Producto</label>
                        <input type="text" name="" className='form-control' id="" {...register("nombre_producto",{required:true})} />
                        {errors.nombre_producto && (<span className="text-danger">*campo requerido</span>)}
                    </div>
                    <div className='col'>
                        <label htmlFor="">Proveedor</label>
                        <select name="" id="" className="form-control" {...register('id_proveedor', { required: true })}>
                            <option value="">Seleccionar proveedor</option>
                            {proveedores.map((item) => (
                                <option value={item.id_proveedor}>{item.nombre_proveedor}</option>
                            ))}
                        </select>
                         {errors.id_proveedor && (<span className="text-danger">*campo requerido</span>)}
                    </div>
                    <div className='col'>
                        <label htmlFor="">Marca</label>
                        <input type="text" name="" className='form-control' {...register("marca",{required:true})} id="" />
                        {errors.marca && (<span className="text-danger">*campo requerido</span>)}
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <label htmlFor="">Tipo</label>
                        <select name="" id="" className="form-control" {...register("tipo",{required:true})}>
                            <option value="">Seleccione tipo</option>
                            {tipoProducto.map((item) => (
                                <option value={item.id_tipo_producto}>{item.nombre_tipo_producto}</option>
                            ))}
                        </select>
                        {errors.tipo && (<span className="text-danger">*campo requerido</span>)}
                    </div>
                    <div className='col'>
                        <label htmlFor="">Categoría</label>
                        <select name="" id="" className="form-control" {...register("categoria",{required:true})}>
                        <option value="">Seleccionar categoría</option>
                            {categorias.map((item) => (
                                <option value={item.id_categoria}>{item.nombre_categoria}</option>
                            ))}
                        </select>
                        {errors.categoria && (<span className="text-danger">*campo requerido</span>)}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="">Descripción</label>
                        <textarea name="" className="form-control" id="" cols="30" {...register("descripcion",{required:true})} rows="10"></textarea>
                        {errors.descripcion && (<span className="text-danger">*campo requerido</span>)}
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Guardar</button>
        </form>

    </>);
}