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
    <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre Producto</th>
                    <th>Descripcion</th>
                    <th>Ultima Actualización</th>
                </tr>
            </thead>
            <tbody>
                {products.map(item => (
                    <tr>
                        <td>{item.id_producto}</td>
                        <td>{item.nombre_producto}</td>
                        <td>{item.descripcion}</td>
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