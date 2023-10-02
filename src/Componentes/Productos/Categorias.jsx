import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
function Categorias() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [nombreCategoria, setNombreCategoria] = useState("");


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "id") {
      setId(value);
    } else if (name === "nombreCategoria") {
      setNombreCategoria(value);
    }
  };

  const select = (event) => {
    const ide = event.currentTarget.getAttribute("data-id");
    const nombre_categoria = event.currentTarget.getAttribute("data-nombre-categoria");
    setId(ide); 
    setNombreCategoria(nombre_categoria);
  };

  useEffect(() => {
    axios.get("http://localhost:5136/Categorias/api/categoria/all").then((response) => {
      setData(response.data);
    });
  }, []);

  function save() {
    let categoriamodel = {
      nombre_categoria: nombreCategoria,
      id_categoria: id,
    };
    const url = "http://localhost:5136/Categorias";

    axios
      .post(url, categoriamodel, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        axios.get("http://localhost:5136/Categorias/api/categoria/all").then((response) => {
          setData(response.data);
        });
   
      }).catch(ex =>{
        Swal.fire({
          position: 'top-end', // Personaliza el ancho de la notificación
          toast: true, // Activa el modo Toast
          icon: 'error',
          title: 'Ha ocurrido un error, intentalo nuevamente',
          showConfirmButton: false,
          timer: 3000,
        });
      });
  }

  return (
    <div className="container">
      <div className="row justify-content-end">
        <div className="col-xl-2">
          <button onClick={save} className="btn btn-primary w-100">
            Guardar
          </button>
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
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>fecha Creación</th>
                <th>Última Actualización</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  onClick={select}
                  data-id={item.id_categoria}
                  data-nombre-categoria={item.nombre_categoria}
                  key={item.id_categoria} // Agregamos una clave única
                >
                  <td>{item.id_categoria}</td>
                  <td>{item.nombre_categoria}</td>
                  <td>{new Date(item.fecha_creacion).toLocaleDateString("es-ES")}</td>
                  <td>{item.fecha_actualizacion}</td>
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
