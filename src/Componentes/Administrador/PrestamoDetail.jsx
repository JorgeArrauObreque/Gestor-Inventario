


export default function PrestamoDetail(props){
    console.log(props.detalles);
    return <>
        <table className="table">
            <tr className="table-head">
                <th>ID</th>
                <th>ID Inventario</th>
                <th>nombre_producto</th>
                <th>Marca</th>
                <th>Entregado</th>
            </tr>
            <tbody>
                {props.detalles.map((item)=>(
                        
                    <tr>
                        <td>{item.id_prestamo_detalle}</td>
                        <td>{item.inventarioNavigation.id_inventario}</td>
                        <td>{item.inventarioNavigation.productoNavigation.nombre_producto}</td>
                        <td>{item.inventarioNavigation.productoNavigation.marca}</td>
                        <td>{item.entregado ? "Sí" : "No"}</td>
                    </tr>

                ))}
            </tbody>
        </table>
    </>
}