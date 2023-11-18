import { useEffect, useState } from "react";
import { get_stock } from "../../Servicios/ProductoService";

export default function Stock() {
    const [stock, setStock] = useState([]);

    useEffect(() => {
        async function fetchStock() {
            try {
                const response = await get_stock();
                setStock(response); // Update the stock state with fetched data
            } catch (error) {
                console.error("Error fetching stock:", error);
            }
        }

        fetchStock(); // Call the function to fetch stock data
    }, []); // Empty dependency array to run the effect only once

    return (
        <>
        <div className="container">
            <h1>Stock Pañol</h1>
            <table className="table">
                
                <tr className="table-head">
                    <th>Producto</th>
                    <th>Marca</th>
                    <th>Categoria</th>
                    <th>Proveedor</th>
                    <th>Stock</th>
                    {/* Add other table headers as needed */}
                </tr>
        
            <tbody>
                {stock.map((item, index) => (
                    <tr key={index}>
                        <td>{item.nombre_producto}</td>
                        <td>{item.marca}</td>
                        <td>{item.categoria}</td>
                        <td>{item.proveedor}</td>
                        <td>{item.stock}</td>
                        {/* Render other table data for each item */}
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
     
        </>
    );
}
