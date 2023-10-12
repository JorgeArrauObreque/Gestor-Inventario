import React from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';

function Login() {
  const { register, handleSubmit } = useForm();
  const { setUser } = useUser();

  const onSubmit = (data) => {
    const baseurl = "http://localhost:5136/api/Accounts/login";
    const credentials = {
      "Username": data.username,
      "PasswordHash": data.password,
    };

    axios.post(baseurl, credentials, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(response => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
      setUser({ username: response.data.user.email, rol: response.data.user.rolNavigation.nombre_rol });
      Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 3000,
      });
    });
  }

  return (
    <div className="container" style={{width:"400px","marginTop":"20vh"}}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Logo_DuocUC.svg/2560px-Logo_DuocUC.svg.png" style={{width:"200px", "marginLeft":"auto"}} alt="" />
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-outline mb-4">
          <input type="text" id="form2Example1" className="form-control" {...register('username')} />

        </div>
        <div className="form-outline mb-4">
          <input type="password" id="form2Example2" className="form-control" {...register('password')} />
   
        </div>
        <div className="row mb-4">
    
          <div className="col">
            <a href="#!">Olvidaste tu contraseña?</a>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">Iniciar sesión</button>
        <div className="text-center">
          <p>Not a member? <a href="#!">Register</a></p>
          <p>or sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
