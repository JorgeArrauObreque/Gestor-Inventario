import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { error } from 'jquery';
const NewPasswordComponent = () => {
  const [verificationResult, setVerificationResult] = useState(''); // Estado para el resultado de la verificación

  const [token, setToken] = useState(''); // Estado para el token obtenido de la URL
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  useEffect(() => {
    // Obtener el token de la URL
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("token");
    if (tokenFromURL) {
      setToken(tokenFromURL);
      verifyToken(tokenFromURL);
    }
  }, []);

  function OnSubmit (data){

    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("token");

    const password = {
      'password':data.password,
      'password_confirm':data.password_confirm,
      'token':tokenFromURL,
    }
    axios.post(`http://localhost:5136/api/Accounts/changePassword`,password)
    .then(response => {
   
    })
    .catch(error => {
      // Error en la solicitud
      setVerificationResult('Error al verificar el token: ' + error.message);
    });
  }

  const verifyToken = (token) => {
    // Realiza una solicitud GET a la API con el token
    axios.get(`http://localhost:5136/api/Accounts/validateToken?token=${token}`)
      .then(response => {
        if (response.data === true) {
          // Token válido, no se muestra un mensaje
          setVerificationResult('');
        } else {
          // Token inválido, muestra un mensaje de error
          setVerificationResult('Token inválido o incorrecto. No se puede cambiar la contraseña.');
        }
      })
      .catch(error => {
        // Error en la solicitud
        setVerificationResult('Error al verificar el token: ' + error.message);
      });
  };

  return (
    <div>
      <h1>Cambio de contraseña</h1>

      {verificationResult ? (
        // Si hay un mensaje de verificación, muéstralo
        <div>
          <p>{verificationResult}</p>
        </div>
      ) : (
        // Si no hay mensaje de verificación, muestra el formulario de cambio de contraseña
        <form onSubmit={handleSubmit(OnSubmit)}>
          <div>

            <input
              type="password"
              placeholder="Nueva Contraseña" className='form-control'
              {...register("password",{required:true})}
              
            />
            {errors.password && (<span className='text-danger'>*Campo Requerido</span>)}
            <input
              type="password"
              placeholder="Confirmar Contraseña" className='form-control'
              {...register("password_confirm",{required:true})}
              
            />
            {errors.password_confirm && (<span className='text-danger'>*Campo Requerido</span>)}
            <button className='btn btn-primary' type='submit'>Cambiar Contraseña</button>
          </div>
        </form>

      )}
    </div>
  );
};

export default NewPasswordComponent;
