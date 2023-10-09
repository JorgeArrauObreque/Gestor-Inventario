import axios from "axios";
import { useEffect, useState } from "react"
import { format } from 'date-fns';
import {useForm} from 'react-hook-form'
import { Button } from "react-bootstrap";
function formatearFecha(fecha) {
    return format(new Date(fecha), 'dd-MM-yyyy HH:mm');
}
export default function Prestamos() {


    const [data, setData] = useState([]);
    const [personas,setPersonas] = useState([]);
    const {register,formState:{errors}, handleSubmit, reset} = useForm();
    const GetData = () => {
        axios.get("http://localhost:5136/api/Prestamo").then((response) => {
            setData(response.data);
        }).catch(ex => console.log(ex))
    }
    useEffect(() => {
        GetData();
        GetPersonas();
    }, []);
    const GetPersonas = ()=>{
        axios.get("http://localhost:5136/api/Personas").then(response => {
            setPersonas(response.data);
        }).catch(ex => console.log(ex));
    }

    const onSubmit = (data)=>{

    }
    return <>
        <div className="container">
            <form onSubmit={handleSubmit()}></form>
            <div className="row justify-content-center" >
                <div className="col-xxl-3">
                    <h1>Prestamos</h1>
                </div>
                <div className="col-xxl-3">
                    <Button type="button"  variant="primary">Guardar</Button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="">Receptor</label>
                    <select name="" className="form-control" id="">
                        <option value="">seleccionar Receptor prestamo</option>
                        {personas.map((item)=>(
                            <option value={item.rut}>{item.nombres} {item.apellidos}</option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="">Desde</label>
                    <input type="text" name="" value={formatearFecha(new Date())} className="form-control" id="" />
                </div>
                <div className="col">
                    <label htmlFor="">Fecha Plazo</label>
                    <input type="date" name="" className="form-control" id="" />
                </div>
            </div>
            <div className="row justify-content-center">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr>
                                <td>{item.id_prestamo}</td>
                                <td>{item.rut}</td>
                                <td>{item.entregado}</td>
                                <td>{item.fecha_plazo}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    </>
}