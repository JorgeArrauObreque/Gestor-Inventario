import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react"; // Importa el hook useState
import Swal from "sweetalert2";

export default function RecoverPassword() {
  const [correoElectronico, setCorreoElectronico] = useState(""); // Estado para el correo electrónico

  async function envio() {
    const url = `http://localhost:5136/api/Accounts/RecoverPassword?correo_electronico=${correoElectronico}`;

    const response = await axios.get(url);

    const statusCode = response.status;

    if (statusCode === 200) {
        
        Swal.fire({
          position: 'top-end',
          toast: true,
          icon: 'success',
          title: 'Correo Enviado Correctamente al correo: '+" "+correoElectronico,
          showConfirmButton: false,
          timer: 3000,
        });
    }
    setCorreoElectronico("");

    return response.data;
  }

  const handleCorreoElectronicoChange = (e) => {
    // Actualiza el estado del correoElectronico cuando cambie el campo de entrada
    setCorreoElectronico(e.target.value);
  };

  return (
    <>
      <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center min-vh-50">
          <div className="col-12 col-md-8 col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="mb-4">
                  <h5>Olvidaste tu contraseña?</h5>
                  <p className="mb-2">Ingresa tu correo para recuperar su contraseña</p>
                </div>
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="Ingrese Correo Electronico"
                      required=""
                      value={correoElectronico} // Asigna el valor del estado al campo de entrada
                      onChange={handleCorreoElectronicoChange} // Maneja el cambio en el campo de entrada
                    />
                  </div>
                  <div className="mb-3 d-grid">
                    <button type="button" onClick={envio} className="btn btn-primary">
                      Enviar
                    </button>
                  </div>
                  <span>Desea volver A ingresar? <Link to="/login">Ingresar</Link></span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
