
import { useEffect } from 'react';
import {Get_all as get_all_productos} from '../../Servicios/ProductoService'
import { get_all as get_all_personas } from '../../Servicios/PersonasServices';
import { useState } from 'react';
import Select from "react-select";
export default function RegistrarPrestamo(){
    const [productos,setProductos] = useState([]);
    const [personas,setPersonas] = useState([]);
    useEffect(()=>{
        async function get_productos (){
            const response = await get_all_productos();
            setProductos(response);
        } 

        async function get_personas (){
            const response = await get_all_personas();
            setPersonas(response);
        } 

        get_personas();
        get_productos();
    },[]);
    return (<>
        <div className="container">
            <h1>Prestamo de Activos</h1>
            <div className='row'>
                <div className='col'>
                <label htmlFor=""></label>
                <select name="" id="" className='form-control'>
                    {productos.map((item)=>(
                        <option value={item.id_producto}>{item.nombre_producto} ({item.marca})</option>    
                    ))}
                </select>
                </div>
                <div className='col'>
                    <label htmlFor="">Solicitante</label>
                <select name="" id="" className='form-control'>
                    {personas.map((item)=>(
                        <option value={item.rut}>{item.nombres} {item.apellidos} </option>
                    ))}
                    
                </select>
                </div>
            </div>
        </div>
    </>);
}