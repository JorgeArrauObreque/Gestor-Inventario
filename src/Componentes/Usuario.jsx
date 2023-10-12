import axios from "axios";
import { useState } from "react";
import {useForm} from "react-hook-form";


const [data,setData]= useState([]);
const GetData = ()=>{
    axios.get("").then(response=>{
        setData(response.data);
    }).catch(ex=>console.log(ex));
}

function Usuarios(){
    return (<>
        <div className="container">
            <div className="row">

            </div>
            <div className="row">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID User</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>);
}