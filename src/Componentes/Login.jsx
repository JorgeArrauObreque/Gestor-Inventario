import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../UserContext';
import axios from '../AxiosConfig'
import Swal from 'sweetalert2';
import Logo from './LogoDuoc.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const { register, handleSubmit,formState:{errors}, reset } = useForm();
  const { setUser } = useUser();
  const [authenticated, setAuthenticated] = useState(true); // Initialize to true
  const [authenticationMessage,setauthenticationMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit =  (data) => {
    setAuthenticated(true);
    const baseurl = "http://localhost:5136/api/Accounts/login";
    const credentials = {
      "Username": data.username,
      "PasswordHash": data.password,
    };
  
    try {
      axios.post(baseurl, credentials, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(response=>{
        setAuthenticated(false);
        // Aquí manejas la respuesta exitosa
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userdata", JSON.stringify(response.data.user));
        
        setUser({ username: response.data.user.username, rol: response.data.user.rolNavigation.nombre_rol });
        Swal.fire({
          position: 'top-end',
          toast: true,
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 3000,
        });
        setAuthenticated(true);
      
        // Redirige a la URL deseada
        navigate("/");
      }) .catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
            // Credenciales incorrectas (Unauthorized)
            setauthenticationMessage("Credenciales incorrectas. Por favor, verifica tus credenciales.");
          } else {
            // Otro error de respuesta HTTP
            setauthenticationMessage("Error del servidor. Por favor, inténtalo de nuevo más tarde.");
          }
        } else if (error.request) {
          // La solicitud fue realizada, pero no se recibió respuesta del servidor (API no corriendo)
          setauthenticationMessage("No se pudo conectar con el servidor. Verifique el servidor está en funcionamiento.");
        } else {
          // Error antes de la solicitud
          setauthenticationMessage("Ocurrió un error antes de la solicitud. Por favor, inténtalo de nuevo más tarde.");
        }
    
        // Puedes establecer el estado de autenticación u otra acción apropiada
        setAuthenticated(false);
      });


      
    } catch (error) {
      if (error.response) {
        // Error de respuesta HTTP
        const status = error.response.status;
        const message = error.response.data.message;
    
        // Mapeo de códigos de estado a mensajes
        const statusMessages = {
          401: "Usuario y/o contraseña incorrecto. Por favor, intentelo nuevamente.",
          404: "Recurso no encontrado.",
          // Agrega más códigos de estado y mensajes según tus necesidades
        };
        
        // Obtén el mensaje del mapeo si existe
        const statusMessage = statusMessages[status] || "Error inesperado";
        setauthenticationMessage(statusMessage);
        console.log(`Error de estado ${status}: ${statusMessage}`);
      } else {
        // Error sin respuesta HTTP
        setauthenticationMessage("Problemas al conectar con el servidor");
        console.error("Error sin respuesta HTTP:", error);
      }
      setAuthenticated(false);
    }
  }
  

  return (
    <div className="container" style={{ width: "400px", "marginTop": "15vh" }}>
      {!authenticated && (
        <div className='alert alert-danger'>
          <p>{authenticationMessage}</p>
        </div>
      )}

      <img src={Logo} style={{ width: "200px", "marginLeft": "auto" }} alt="" />
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-outline mb-4">
          <input type="text" id="form2Example1" placeholder='nombre de usuario' className="form-control" {...register('username',{required:true})} />
          {errors.username && (<span className='text-danger'>*Campo requerido</span>)}
        </div>
        <div className="form-outline mb-4">
          <input type="password" placeholder='contraseña' id="form2Example2" className="form-control" {...register('password',{required:true})} />
          {errors.password && (<span className='text-danger'>*Campo Requerido</span>)}
        </div>
        <div className="row mb-4">
          <div className="col">
            <Link to="/RecoverPassword">Olvidaste tu contraseña?</Link>
         
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">Iniciar sesión</button>

      </form>
    </div>
  );
}

export default Login;
