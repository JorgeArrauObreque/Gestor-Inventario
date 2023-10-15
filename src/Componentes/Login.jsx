import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import Logo from './LogoDuoc.png'
function Login() {
  const { register, handleSubmit,formState:{errors}, reset } = useForm();
  const { setUser } = useUser();
  const [authenticated, setAuthenticated] = useState(true); // Initialize to true

  const onSubmit = async (data) => {
    const baseurl = "http://localhost:5136/api/Accounts/login";
    const credentials = {
      "Username": data.username,
      "PasswordHash": data.password,
    };
  
    try {
      const response = await axios.post(baseurl, credentials, {
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userdata", JSON.stringify(response.data.user));
      
      
      setUser({ username: response.data.user.email, rol: response.data.user.rolNavigation.nombre_rol });
      Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 3000,
      });
      setAuthenticated(true);
    } catch (error) {
      console.error("An error occurred:", error);
      setAuthenticated(false);
    }
  };
  

  return (
    <div className="container" style={{ width: "400px", "marginTop": "15vh" }}>
      {!authenticated && (
        <div className='alert alert-danger'>
          <p>Credenciales incorrectas</p>
        </div>
      )}

      <img src={Logo} style={{ width: "200px", "marginLeft": "auto" }} alt="" />
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-outline mb-4">
          <input type="text" id="form2Example1" className="form-control" {...register('username',{required:true})} />
          {errors.username && (<span className='text-danger'>*Campo requerido</span>)}
        </div>
        <div className="form-outline mb-4">
          <input type="password" id="form2Example2" className="form-control" {...register('password',{required:true})} />
          {errors.password && (<span className='text-danger'>*Campo Requerido</span>)}
        </div>
        <div className="row mb-4">
          <div className="col">
            <a href="#!">Olvidaste tu contraseña?</a>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">Iniciar sesión</button>

      </form>
    </div>
  );
}

export default Login;
