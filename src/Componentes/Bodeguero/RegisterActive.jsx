
import { ModalBody, ModalHeader, ModalTitle, Modal, Button } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';

import { Get_all as get_all_productos } from '../../Servicios/ProductoService';
import { Create, Create_activo } from '../../Servicios/InventarioService';
import FormProducto from './forms/formProducto';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
export default function RegisterActive() {

    const selectedProductIdRef = useRef(); // Referencia para el elemento select


    //controlar modal para el escaneo

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {

        setShowModal(true);

    };

    const handleCloseModal = () => {
        setShowModal(false);
        clearErrors();
    };


    //control de modal productos
    const [showModalProductos, setShowModalProductos] = useState(false);
    const handleshowModalProductos = () => {

        setShowModalProductos(true);

    };

    const handleCloseModalProductos = () => {
        setShowModalProductos(false);
        clearErrors();
    };


    function onScan(event) {
        // Puedes verificar si la tecla presionada es Enter (código 13)
        if (event.key === 'Enter') {
            // Obtén el valor del campo de entrada
            const barcodeValue = event.target.value;

            // Realiza acciones adicionales con el código de barras si es necesario
            console.log('Código de barras escaneado:', barcodeValue);

            // Cierra el modal u realiza otras acciones necesarias
            handleCloseModal();
            clearErrors();
        }
    };

    const [activo, setActivo] = useState({
        'id_inventario': '',
        'marca': '',
        'nombre_producto': '',
        'proveedor': '',
        'tipo': ''
    });

    function CambioCodigoActivo(event) {
        let { name, value } = event.target;
        setActivo({ ...activo, id_inventario: value });

    }

    const [productos, setProductos] = useState([]);
    async function GetProductos() {
        let productos = await get_all_productos();
        setProductos(productos);
    }
    async function GetProductosReturn() {
        let productos_query = await get_all_productos();
        return productos_query;
    }
    function GetProductoData(event) {
        let id_producto = event.target.value;

        let filtro = productos.filter((r) => r.id_producto == id_producto);
        if (filtro.length > 0) {
            let producto = filtro[0];
            console.log(producto);
            setActivo({
                ...activo,
                'marca': producto.marca,
                'nombre_producto': producto.nombre_producto,
                'proveedor': producto.proveedor,
                'tipo_producto': producto.tipo_producto,
                'categoria': producto.categoria,
                'descripcion': producto.descripcion,
            })
        }
        clearErrors();
    }
    const cambiarEstado = (nuevoEstado) => {
        setShowModalProductos(nuevoEstado);
    };
    const GetProductosChild = () => {
        GetProductos();
    }
    const GetCambiarProducto = async (id_producto) => {

        let productos_query = await GetProductosReturn();
        let filtro = productos_query.filter((r) => r.id_producto == id_producto);

        if (filtro.length > 0) {
            let producto = filtro[0];
            console.log(producto);
            selectedProductIdRef.current.value = id_producto;
            setActivo({
                ...activo,
                'marca': producto.marca,
                'nombre_producto': producto.nombre_producto,
                'proveedor': producto.proveedor,
                'tipo_producto': producto.tipo_producto,
                'categoria': producto.categoria,
                'descripcion': producto.descripcion,
            })

        }
    }

    const { formState: { errors }, clearErrors, reset, register, handleSubmit } = useForm();
    async function onSubmit(data) {
        if (selectedProductIdRef.current.value.trim() == "") {
            Swal.fire({
                position: 'top-end',
                toast: true,
                icon: 'info',
                title: "ingrese los datos del producto",
                showConfirmButton: false,
                timer: 3000,
            });
        } else {
            let response = await Create(
                {
                    "id_inventario": activo.id_inventario,
                    "id_producto": selectedProductIdRef.current.value,
                    "id_bodega": "1",
                    "id_inventario_estado": "1"
                }
            );
            Swal.fire({
                position: 'top-end',
                toast: true,
                icon: 'success',
                title: "registro realizado con exito",
                showConfirmButton: false,
                timer: 3000,
            });
            reset();
            setActivo({
                'id_inventario': '',
                'marca': '',
                'nombre_producto': '',
                'proveedor': '',
                'tipo': ''
            });
        }

    }
    useEffect(() => {
        GetProductos();
    }, [])


    return (<>
        <form onSubmit={handleSubmit(onSubmit)} >


            <div className='container'>
                <div className='row'>
                    <div className='col-xxl-2'>
                        <button type='button' className='btn btn-warning w-100' onClick={handleShowModal}>Escanear</button>

                    </div>
                    <div className='col-xxl-2'>
                        <button type='submit' className='btn btn-primary w-100'  >Registrar activo</button>
                    </div>
                </div>
                <label htmlFor="">Código Activo</label>
                <input type="text" className='form-control' style={{ backgroundColor: '#CCCCCC' }}  {...register("id_inventario", { required: true })} value={activo.id_inventario} readOnly />
                {errors.id_inventario && (<span className='text-danger'>*Código de activo requerido</span>)}
                <div className='row mt-3'>
                    <div className='col'>
                        <button onClick={handleshowModalProductos} type='button' className='btn btn-warning w-25'>No Coinciden los datos?</button>

                    </div>
                </div>
                <div className=' row mt-3'>

                    <div className='col'>
                        <label htmlFor="">Producto </label>
                        <select
                            ref={selectedProductIdRef}
                            name="id_producto"
                            onChange={GetProductoData}
                            className='form-control'
                        >
                            <option value="">Selecciona producto</option>
                            {productos.map((item) => (
                                <option value={item.id_producto}>{item.nombre_producto}</option>
                            ))}

                        </select>
                        {errors.id_producto && (<span className='text-danger'>*seleccione el producto</span>)}
                    </div>
                    <div className='col'>
                        <label htmlFor="">Marca</label>
                        <input type="text" className='form-control' value={activo.marca} disabled name="" id="" />
                    </div>
                    <div className='col'>
                        <label htmlFor="">Proveedor</label>
                        <input type="text" className='form-control' value={activo.proveedor} disabled name="" id="" />
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col'>
                        <label htmlFor="">Tipo</label>
                        <input type="text" value={activo.tipo_producto} disabled className='form-control' />
                    </div>
                    <div className='col'>
                        <label htmlFor="">Categoría</label>
                        <input type="text" value={activo.categoria} disabled className='form-control' />
                    </div>
                    <div className='col'>
                        <label htmlFor="">Descripción</label>
                        <input type="text" disabled value={activo.descripcion} className='form-control' />
                    </div>
                </div>

            </div>
        </form>



        <Modal show={showModal} onHide={handleCloseModal} size="lg" >

            <Modal.Body>
                <h1 className="text-center">Escanee el codigo de barras </h1>
                <div className="justify-content-center d-flex" >
                    <img src="https://codigodebarra.com.ar/wp-content/uploads/2018/08/entre-rios-codigos-de-barra-ean.png" style={{ width: "500px" }} />

                </div>
                <small> tambien puede escribir manualmente el código de ser necesario</small>
                <input type="text" name="id_inventario" id="" maxLength={80} autoFocus onChange={CambioCodigoActivo} value={activo.id_inventario} className="form-control" onKeyDown={onScan} />
                <button className='btn btn-primary' onClick={handleCloseModal}>Aceptar</button>
            </ Modal.Body>
        </ Modal>

        <Modal show={showModalProductos} onHide={handleCloseModalProductos} size="lg" >
            <Modal.Header>
                <ModalTitle>
                    Datos Producto
                </ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <FormProducto cambiarProducto={GetCambiarProducto} getProductos={GetProductosChild} cambiarEstado={cambiarEstado} />
            </ Modal.Body>
        </ Modal>
    </>);
}