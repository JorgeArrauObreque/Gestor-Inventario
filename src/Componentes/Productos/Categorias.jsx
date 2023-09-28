import { useState } from "react";
import categorias from './categorias.json'
function Categorias(){
    const [data,setData] = useState(categorias);
    return (<>
    <div className="container">
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>fecha Creación</th>
                </tr>
            </thead>
            <tbody>
                {categorias.map(item=>(

                    <tr>
                        <td>
                            {item.id_categoria}
                        </td>
                        <td>
                            {item.nombre_categoria}
                        </td>
                        <td>
                            {item.fecha_creacion}
                        </td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    </div>
        
    </>);
}

export default Categorias;