import axios from "axios";
import { useEffect, useState } from "react";
import products from './products.json';
function Productos() {
    const [data, setData] = useState(products);

    // useEffect(() => {

    //  axios.get('https://localhost:7020/Productos/api/productos/all')
    //     .then(response => {
    //         console.log(response.data); 
    //     })
    //     .catch(error => {
    //         console.error('Error en la solicitud GET:', error);
    //     });
    //     return () => {

    //     };
    //   }, []);

    return (<>
    <div className="container">
        <div className="row justify-content-end mt-5 mx-5">
        <div className="col-xl-3">
                <button className="btn btn-warning w-100">Escaner Código</button>
            </div>
            <div className="col-xl-2">
                <button className="btn btn-primary w-100">Guardar</button>
            </div>
            
        </div>
        <div className="row">
            <div className="col">
                <label htmlFor="">Nombre Producto</label>
                <input type="text" name="" id="" className="form-control" />
            </div>
            <div className="col">
                <label htmlFor="">Marca</label>
                <input type="text" name="" id="" className="form-control" />
            </div>
            <div className="col">
                <label htmlFor="">Proveedor</label>
                <input type="text" name="" id="" className="form-control" />
            </div>
        </div>
    <table className="table mt-5 table-hover table-responsive">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre Producto</th>
                    <th>Descripcion</th>
                    <th>marca</th>
                    <th>Proveedor</th>
                    <th>Ultima Actualización</th>
                </tr>
            </thead>
            <tbody>
                {products.map(item => (
                    <tr>
                        <td>{item.id_producto}</td>
                        <td>{item.nombre_producto}</td>
                        <td>{item.descripcion}</td>
                        <td>{item.marca}</td>
                        <td>{item.id_proveedor}</td>
                        <td>{item.fecha_actualizacion}</td>
                        
                    </tr>
                )
                    
                )}

            </tbody>
        </table>
    </div>

      

    </>);
}
export default Productos;