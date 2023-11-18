import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { error } from 'jquery';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const NewPasswordComponent = () => {
  const [verificationResult, setVerificationResult] = useState(''); // Estado para el resultado de la verificación

  const [token, setToken] = useState(''); // Estado para el token obtenido de la URL
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [valido,setValido] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Obtener el token de la URL
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("token");
    if (tokenFromURL) {
      setToken(tokenFromURL);
      verifyToken(tokenFromURL);
    }
  }, []);

  function OnSubmit(data) {

    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("token");

    const password = {
      'password': data.password,
      'password_confirm': data.password_confirm,
      'token': tokenFromURL,
    }
    axios.post(`http://localhost:5136/api/Accounts/changePassword`, password)
      .then(response => {
        const statusCode = response.status;
        if (statusCode === 200) {
            alert("contraseña cambiada correctamente");
            navigate("/login");
            valido(true);
        }
      })
      .catch(error => {
        // Error en la solicitud
        setVerificationResult('');
      });
  }

  const verifyToken = (token) => {
    // Realiza una solicitud GET a la API con el token
    axios.get(`http://localhost:5136/api/Accounts/validateToken?token=${token}`)
      .then(response => {
        if (response.data === true) {
          // Token válido, no se muestra un mensaje
          setVerificationResult('');
          setValido(true);
        } else {
          // Token inválido, muestra un mensaje de error
          
          setVerificationResult('Token inválido o incorrecto. No se puede cambiar la contraseña.');
        }
      })
      .catch(error => {
        setVerificationResult('');
        // // Error en la solicitud
        // setVerificationResult('Error al verificar el token: ' + error.message);
      });
  };

  return (
    <div>
  

      {valido===false ? (
        // Si hay un mensaje de verificación, muéstralo
        <div className='justify-content-center d-flex' style={{marginTop:'20vh'}}>
          {/* <p>{verificationResult}</p> */}
          <div className='alert alert-danger w-50'>
            <p>Error</p>
            <strong>
              Token caducado
            </strong>
          </div>


        </div>
      ) : (
        // Si no hay mensaje de verificación, muestra el formulario de cambio de contraseña
        <form onSubmit={handleSubmit(OnSubmit)}>
          <div className='container' style={{marginTop:'20vh'}}>
              <div className='row'>
                  <div className='col-xxl-4 mx-auto'>
                  <h1>Cambio de contraseña</h1>
                  <input
              type="password"
              placeholder="Nueva Contraseña" className='form-control'
              {...register("password", { required: true })}

            />
            {errors.password && (<span className='text-danger'>*Campo Requerido</span>)}
            <input
              type="password"
              placeholder="Confirmar Contraseña" className='form-control mt-3'
              {...register("password_confirm", { required: true })}

            />
            {errors.password_confirm && (<span className='text-danger'>*Campo Requerido</span>)}
            <button className='btn btn-primary mt-3' type='submit'>Cambiar Contraseña</button>
                  </div>
              </div>

          </div>
        </form>

      )}
    </div>
  );
};

export default NewPasswordComponent;
