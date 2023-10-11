import React from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';
function Login() {
  const { register, handleSubmit } = useForm();
  const { setUser } = useUser();

  const onSubmit = (data) => {
    // Simular inicio de sesión exitoso y guardar el usuario en el contexto.
    // En un proyecto real, aquí harías una solicitud a tu servidor para autenticar al usuario.
    const baseurl = "http://localhost:5136/api/Accounts/login"
    let credenciales=  {
        "Username":data.username,
        "PasswordHash":data.password
    }
    axios.post(baseurl,credenciales,{
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response=>{
        // console.log(response.data.user);
        // console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user",response.data.user);
        setUser({ username: response.data.user.email });
        Swal.fire({
            position: 'top-end', // Personaliza el ancho de la notificación
            toast: true, // Activa el modo Toast
            icon: 'success',
            title: 'Bienvenido',
            showConfirmButton: false,
            timer: 3000,
        });
    
  });
}

  const { user } = useUser();
  return (
    <div>
        
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Nombre de usuario</label>
        <input type="text" id="username" {...register('username')} />
        <br />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" {...register('password')} />
        <br />

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;
