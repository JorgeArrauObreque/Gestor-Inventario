import logo from './logo.svg';
import './App.css';
import Sidebar from './Componentes/Sidebar'
import Navbar from './Componentes/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import InventarioEstados from './Componentes/Productos/InventarioEstados';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Proveedores from './Componentes/Productos/Proveedores';
import Bodegas from './Componentes/Productos/Bodegas';
import TipoProducto from './Componentes/Productos/TipoProducto';
import Categorias from './Componentes/Productos/Categorias';
import Personas from './Componentes/Personas';
import Productos from './Componentes/Productos/Productos';
import Inventario from './Componentes/Productos/Inventario';
import Login from './Componentes/Login';
import React, { useState } from 'react';
import Prestamos from './Componentes/Productos/Prestamos';


export const userContext = React.createContext();
export const SetUserContext = React.createContext();

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Inicializado a null

  // Recuperar el usuario de localStorage al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Guardar el usuario en localStorage cuando cambie
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  return (
    <>

      <userContext.Provider value={user}>
        <SetUserContext.Provider value={setUser}>
          <BrowserRouter>
            {user ? (
              <>
                <Navbar />
                <div className='d-flex'>

                  <div className='col-xxl-2 col-xl-3'>
                    <Sidebar />
                  </div>
                  <div className='col p-4 mt-4'>

                    <Routes>
                      <Route path='proveedores' element={<Proveedores />} />
                      <Route path='estadoinventario' element={<InventarioEstados />} />
                      <Route path='bodegas' element={<Bodegas />} />
                      <Route path='tipoproducto' element={<TipoProducto />} />
                      <Route path='categorias' element={<Categorias />} />
                      <Route path='personas' element={<Personas />} />
                      <Route path='productos' element={<Productos />} />
                      <Route path='inventarios' element={<Inventario />} />
                      <Route path='prestamos' element={<Prestamos />} />
                    </Routes>
                  </div>
                </div>
              </>

            ) : (
              <Routes>
                <Route path='login' element={<Login setAuthenticated={setAuthenticated} />} />
                <Route path='*' element={<Navigate to='/login' />} />
              </Routes>
            )}
          </BrowserRouter>
        </SetUserContext.Provider>

      </userContext.Provider>

    </>


  );
}

export default App;
