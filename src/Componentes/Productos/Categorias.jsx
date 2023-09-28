import { useState } from "react";
import categorias from './categorias.json'
import axios from "axios";
import { POST } from "../Services";

function Categorias() {
  const [data, setData] = useState(categorias);

  const [id, setId] = useState(0);
  const [nombreCategoria, setNombreCategoria] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    alert(value);
    if (name === "id") {
      setId(value);
    } else if (name === "nombreCategoria") {
      setNombreCategoria(value);
    }
  };
  function save(){
    let categoriamodel = {
        nombre_categoria: nombreCategoria,
        id_categoria: id,
      };
      const url = "https://localhost:7020/Categorias/";

     POST(url, categoriamodel);
  }

  

  return (
    <div className="container">
      <div className="row justify-content-end">
        <div className="col-xl-2">
          <button onClick={save} className="btn btn-primary w-100">Guardar</button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-xl-3">
          <label htmlFor="">ID</label>
          <input
            type="text"
            name="id"
            className="form-control"
            onChange={handleChange}
            value={id}
          />
        </div>
        <div className="col-xl-3">
          <label htmlFor="">nombre</label>
          <input
            type="text"
            name="nombreCategoria"
            className="form-control"
            onChange={handleChange}
            value={nombreCategoria}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <div className="col-xl-5">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>fecha Creación</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((item) => (
                <tr>
                  <td>{item.id_categoria}</td>
                  <td>{item.nombre_categoria}</td>
                  <td>{item.fecha_creacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Categorias;
