import { useEffect, useState } from "react";
import Select from 'react-select';
import axios from '../../AxiosConfig'
import {Get_all as get_all_productos,Get_by_id,Delete, Update, Create} from '../../Servicios/ProductoService'
import {useForm} from 'react-hook-form'
export default function RegistrarActivo(){
    const [options, setOption] = useState([]);
      const customNoOptionsMessage = () => "No se encontraron coincidencias"; // Tu mensaje personalizado
        const [productos,setProductos] = useState([]);
        
        const [producto, setProducto] = useState({
            nombre_producto:"",
            marca:"",
            tipo_producto:"",
            descripcion: ""
        });
        async function SelectProducto(selectedValue) {
           
            console.log(selectedValue.value);
            const resultado = productos.filter((item)=>{
                return item.id_producto == selectedValue.value;
            });
            console.log(resultado[0].descripcion);
            setProducto({
                nombre_producto:resultado[0].nombre_producto,
                marca:resultado[0].marca,
                tipo_producto:resultado[0].tipo_producto,
                descripcion:resultado[0].descripcion
            })
          }


        const onChangeProducto = (event)=>{
            const {value,name} = event.target;
            setProducto({
                ...producto,[name]:value
            });
        }
        useEffect(() => {
            async function fetchData() {
              try {
                const productos_get = await get_all_productos();
                setProductos(productos_get);
                
                const elementos = productos_get.map((element) => ({
                  value: element.id_producto,
                  label: element.nombre_producto,
                }));
                setOption(elementos);
              } catch (error) {
                console.error("Error al obtener productos:", error);
              }
            }
          
            fetchData();
          }, []);
          
    return (<>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xxl-6">
                    <h1>Registrar Activo Pañol</h1>
                </div>
                <div className="col-xxl-2">
                    <button className="btn btn-warning w-100">Escanear</button>
                </div>
                <div className="col-xxl-2">
                    <button className="btn btn-primary w-100">Guardar</button>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="card col-xxl-10">
                    <div className="card-body">
                        <div className="row mt-2">
                            <div className="col">
                                <label htmlFor="">Identificador Activo</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col">
                                <label htmlFor="">Producto</label>

                                <Select options={options} onChange={SelectProducto} noOptionsMessage={customNoOptionsMessage} placeholder="Seleccionar Producto"  />
                            
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col">
                                <label htmlFor="">Nombre Producto</label>
                                <input type="text" name="nombre_producto" value={producto.nombre_producto} onChange={onChangeProducto} disabled className="form-control" id="" />
                            </div>
                            <div className="col">
                                <label htmlFor="">Marca</label>
                                <input type="text" name="marca" value={producto.marca}  onChange={onChangeProducto} disabled className="form-control" id="" />
                            </div>
                            <div className="col">
                                <label htmlFor="">Tipo Producto</label>
                                <input type="text" name="marca" value={producto.tipo_producto} onChange={onChangeProducto}  disabled className="form-control" id="" />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col">
                                <label htmlFor="">Descripción</label>
                              
                                <textarea name="descripcion" className="form-control" onChange={onChangeProducto}  disabled id="" cols="30" rows="3" value={producto.descripcion}></textarea>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}