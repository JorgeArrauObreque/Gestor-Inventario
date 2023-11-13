import React, { useEffect, useState,useRef } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Get_all as get_all_productos } from "../../Servicios/ProductoService";
import { Get_all as get_all_tipo_productos } from "../../Servicios/TipoProducto";
import { Create_activo } from "../../Servicios/InventarioService";
import { ModalBody, ModalHeader, ModalTitle, Modal, Button } from 'react-bootstrap';






export default function RegistrarActivo() {
 const [idInventario,setIdInventario] = useState();
  const [showModal, setShowModal] = useState(false);
  const inputIdInventario = useRef(0);
  const handleBarcodeInput = (event) => {
    if (event.keyCode === 13) {
      var barcode = event.target.value;
      console.log('Código de barras escaneado:', barcode);
      handleCloseModal();
    }
  };


  const handleShowModal = () => {
   console.log(inputIdInventario);
      setShowModal(true);
  };

  const handleCloseModal = () => {
      setShowModal(false);
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    setValue, // Agregado para react-hook-form
  } = useForm();

  const [tipoProducto, setTipoProducto] = useState([]);
  const [options, setOption] = useState([]);
  const [CamposProducto, setCamposProducto] = useState(true);
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({
    nombre_producto: "",
    marca: "",
    tipo_producto: "",
    descripcion: "",
  });
  const [TipoInventario, setTipoInventario] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Nuevo estado
  const customNoOptionsMessage = () => "No se encontraron coincidencias";

  const HabilitarEdicionProducto = () => {
    setCamposProducto(false);
    reset();
  };

  const SelectProducto = (selectedValue) => {
    setCamposProducto(true);
    const resultado = productos.filter((item) => item.id_producto === selectedValue.value);

    if (resultado.length > 0) {
      const selectedProduct = resultado[0];
      console.log(selectedProduct);
      setProducto({
        nombre_producto: selectedProduct.nombre_producto,
        marca: selectedProduct.marca,
        tipo_producto: selectedProduct.id_tipo_producto,
        descripcion: selectedProduct.descripcion,
      });
      setProductoSeleccionado(selectedValue.value); // Actualizar el estado
    }
    reset();
  };

  const onChangeProducto = (event) => {
    const { value, name } = event.target;
    setProducto({
      ...producto,
      [name]: value,
    });
    reset();
  };

  useEffect(() => {
    
    async function fetchData() {
      try {
        const productos_get = await get_all_productos();
        setProductos(productos_get);
        console.log(productos_get);

        const elementos = productos_get.map((element) => ({
          value: element.id_producto,
          label: element.nombre_producto + " (" + element.marca + ")",
        }));

        setOption(elementos);
        const tipos = await get_all_tipo_productos();
        console.log(tipos);
        setTipoProducto(tipos);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    }

    fetchData();
  }, []);

  const OnSubmit = async (data) => {
    const selectedProductId = productoSeleccionado || data.id_producto; // Usar el estado si está disponible
    console.log("ID del producto seleccionado:", selectedProductId);

    if (CamposProducto === false) {
      const activo = {
        id_inventario: data.id_inventario,
        id_producto: "0",
        nombre_producto: data.nombre_producto,
        marca: data.marca,
        tipo_producto: data.tipo_producto,
        descripcion: data.descripcion,
      };
      var response = await Create_activo(activo);
    } else {
      const activo = {
        id_inventario: data.id_inventario,
        id_producto: selectedProductId,
        nombre_producto: data.nombre_producto,
        marca: data.marca,
        tipo_producto: data.tipo_producto,
        descripcion: data.descripcion,
      };
      var response = await Create_activo(activo);
    }

    reset({
      id_inventario: "",
      nombre_producto: "",
      marca: "",
      tipo_producto: "",
      descripcion: "",
    });

    setProductoSeleccionado(null); // Restablecer el estado
  };
  const onScan = (event) => {
    // Puedes verificar si la tecla presionada es Enter (código 13)
    if (event.key === 'Enter') {
      // Obtén el valor del campo de entrada
      const barcodeValue = event.target.value;
  
      // Realiza acciones adicionales con el código de barras si es necesario
      console.log('Código de barras escaneado:', barcodeValue);
      setIdInventario(barcodeValue);
      // Cierra el modal u realiza otras acciones necesarias
      handleCloseModal();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-6">
              <h1>Registrar Activo Pañol</h1>
            </div>
            <div className="col-xxl-2">
              <button type="button" className="btn btn-warning w-100" onClick={handleShowModal}>
                Escanear
              </button>
            </div>
            <div className="col-xxl-2">
              <button type="submit" className="btn btn-primary w-100">
                Guardar
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="card col-xxl-10">
              <div className="card-body">
                <div className="row mt-2">
                  <div className="col">
                    <label htmlFor="">Identificador Activo</label>
                    <input id="id_inventario"
                      type="text"  
                      {...register("id_inventario", { required: true })}
                      className="form-control" value={idInventario}
                    />
                    {errors.id_inventario && (
                      <span className="text-danger">Campo requerido</span>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="">Producto</label>
                    <Select
                      options={options}
                      onChange={SelectProducto}
                      noOptionsMessage={customNoOptionsMessage}
                      placeholder="Seleccionar Producto"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-primary mt-3 mb-1"
                  onClick={HabilitarEdicionProducto}
                >
                  Editar Datos Producto
                </button>
                <div className="row mt-2">
                  <div className="col">
                    <label htmlFor="">Nombre Producto</label>
                    <input
                      type="text"
                      name="nombre_producto"
                      {...register("nombre_producto", { required: true })}
                      value={producto.nombre_producto}
                      onChange={onChangeProducto}
                      readOnly={CamposProducto}
                      className="form-control"
                    />
                    {errors.nombre_producto && (
                      <span className="text-danger">Campo requerido</span>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="">Marca</label>
                    <input
                      type="text"
                      {...register("marca", { required: true })}
                      name="marca"
                      value={producto.marca}
                      onChange={onChangeProducto}
                      readOnly={CamposProducto}
                      className="form-control"
                    />
                    {errors.marca && (
                      <span className="text-danger">Campo requerido</span>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="">Tipo Producto</label>
                    <select id="" className="form-control" name="tipo_producto" {...register("tipo_producto", { required: true })} value={producto.tipo_producto} onChange={onChangeProducto}
                      readOnly={CamposProducto}>
                      <option value="">Seleccionar</option>
                      {tipoProducto.map((item) => (
                        <option value={item.id_tipo_producto}> {item.nombre_tipo_producto}</option>
                      ))}
                    </select>
                    {/* <input
                    type="text"
                    name="tipo_producto"
                    {...register("tipo_producto", { required: true })}
                    value={producto.tipo_producto}
                    onChange={onChangeProducto}
                    disabled={CamposProducto}
                    className="form-control"
                  /> */}
                    {errors.tipo_producto && (
                      <span className="text-danger">Campo requerido</span>
                    )}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col">
                    <label htmlFor="">Descripción</label>
                    <textarea
                      name="descripcion"
                      {...register("descripcion", { required: true })}
                      className="form-control"
                      onChange={onChangeProducto}
                      readOnly={CamposProducto}
                      cols="30"
                      rows="3"
                      value={producto.descripcion}
                    />
                    {errors.descripcion && (
                      <span className="text-danger">Campo requerido</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Modal show={showModal} onHide={handleCloseModal} size="lg" >
             
                <Modal.Body>
                  <h1 className="text-center">Escanee el codigo de barras </h1>
                  <div className="justify-content-center d-flex">
                     <img src="https://codigodebarra.com.ar/wp-content/uploads/2018/08/entre-rios-codigos-de-barra-ean.png" style={{width: "500px"}} />
                  
                     
                  </div>
                  <input type="text" name="" id="" autoFocus className="form-control" onKeyDown={onScan} />
                </ Modal.Body>
      </ Modal>
    </>

  );

}
