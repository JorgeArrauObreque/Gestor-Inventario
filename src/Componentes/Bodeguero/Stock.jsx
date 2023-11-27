import { useEffect, useState } from "react";
import { get_stock } from "../../Servicios/ProductoService";

export default function Stock() {
    const [stock, setStock] = useState([]);
    const handleDownloadExcel = async () => {
        try {
          // Código para descargar el archivo Excel
          const response = await fetch('http://localhost:5136/api/Informe/export'); // Asegúrate de que la ruta sea correcta
          const blob = await response.blob();
    
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          const currentDate = new Date();
          const formattedDate = currentDate.getFullYear() +
            ('0' + (currentDate.getMonth() + 1)).slice(-2) +
            ('0' + currentDate.getDate()).slice(-2) +
            ('0' + currentDate.getHours()).slice(-2) +
            ('0' + currentDate.getMinutes()).slice(-2) +
            ('0' + currentDate.getSeconds()).slice(-2);
    
          a.download = 'Inventario_' + formattedDate + '.xlsx'; // Nombre del archivo con fecha
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error(error);
        }
      }
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
            <div className="">
             
                <h1>Stock Pañol</h1>
            
           
                <button onClick={handleDownloadExcel} className="btn btn-success mt-2 mb-3">Exportar excel</button>
               
            </div>
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
