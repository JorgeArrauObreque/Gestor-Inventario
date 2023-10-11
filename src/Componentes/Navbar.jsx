import './Navbar.css'
import Logo from './Logo.PNG'

import { useContext } from 'react';
import { UserProvider, useUser } from '../UserContext';  
export default function Navbar() {
  const { user } = useUser(); 
  const { setUser } = useUser();

  const logout = ()=>{
    setUser(null);
    localStorage.clear(); 
}
  return (<>
    <nav class="navbar navbar-expand-lg navbar-institucional">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><img className='logo-insitucional' src={Logo}  /></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">

          <form class="d-flex">
          {user ? (
        <div>
          <p className='text-light'>Nombre de usuario: {user.username}</p>
        
          {/* Muestra cualquier otra información del usuario si la tienes */}
        </div>
      ) : (
        <p>Usuario no autenticado</p>
      )}
            <button class="btn btn-light" onClick={logout} type="submit">Cerrar Sesión</button>
          </form>
        </div>
      </div>
    </nav>
  </>);
}