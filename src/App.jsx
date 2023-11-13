

import logo from './logo.svg';
import './App.css';
import Sidebar from './Componentes/Sidebar'
import Navbar from './Componentes/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import InventarioEstados from './Componentes/Administrador/InventarioEstados';

import { useEffect } from 'react';
import Proveedores from './Componentes/Administrador/Proveedores';
import Bodegas from './Componentes/Administrador/Bodegas';
import TipoProducto from './Componentes/Administrador/TipoProducto';
import Categorias from './Componentes/Administrador/Categorias';
import Personas from './Componentes/Administrador/Personas';
import Productos from './Componentes/Administrador/Productos';
import Inventario from './Componentes/Administrador/Inventario';
import Login from './Componentes/Login';

import Prestamos from './Componentes/Administrador/Prestamos';
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './UserContext';  // Importa useUser desde UserContext
import Usuarios from './Componentes/Administrador/Usuario';
import RegistrarActivo from './Componentes/Bodeguero/RegistrarActivo';
import InventarioActivos from './Componentes/Bodeguero/InventarioActivos';
import RecoverPassword from './Componentes/RecoverPassword';
import NewPassword from './Componentes/NewPassword';
import BarChart from './Componentes/Bodeguero/RegistrarPrestamo';
import BarChartComponent from './Componentes/Bodeguero/RegistrarPrestamo';
import Dashboard from './Componentes/Administrador/Dashboard';
import HistoricoMovimientos from './Componentes/Administrador/HistoricoMovimientos';
import RegistrarPrestamo from './Componentes/Bodeguero/RegistrarPrestamo';
import DevolucionPrestamo from './Componentes/Bodeguero/DevolucionPrestamo';

function App() {
  const { user,setUser } = useUser();  // Usa useUser para obtener el usuario desde el contexto

  useEffect(() => {
    // Intenta obtener el usuario desde el localStorage al cargar la página
    const storedUser = localStorage.getItem('userdata');
    // console.log("usuario");
    // console.log(storedUser);
    if (storedUser) {
      // Si se encuentra un usuario en el localStorage, establece el estado del usuario

      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (

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
                  <Route path='DevolucionPrestamo' element={<DevolucionPrestamo />} />
                  <Route path='estadoinventario' element={<InventarioEstados />} />
                  <Route path='bodegas' element={<Bodegas />} />
                  <Route path='tipoproducto' element={<TipoProducto />} />
                  <Route path='categorias' element={<Categorias />} />
                  <Route path='personas' element={<Personas />} />
                  <Route path='productos' element={<Productos />} />
                  <Route path='inventarios' element={<Inventario />} />
                  <Route path='prestamos' element={<Prestamos />} />
                  <Route path='Usuarios' element={<Usuarios />} />
                  <Route path='Usuarios' element={<Usuarios />} />
                  <Route path='RegistrarActivo' element={<RegistrarActivo />} />
                  <Route path='InventarioActivos' element={<InventarioActivos />} />
                  <Route path='Dashboard' element={<Dashboard />} />
                  <Route path='NewPassword' element={<NewPassword />} />
                  <Route path='RegistrarPrestamo' element={<RegistrarPrestamo />} />
                  {/* <Route path='*' element={<Bodegas />} /> */}
                  <Route path='historicoMovimientos' element={<HistoricoMovimientos />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Routes>
            
            <Route path='login' element={<Login />} />
            <Route path='RecoverPassword' element={<RecoverPassword />} />
            <Route path='NewPassword' element={<NewPassword />} />
            <Route path='*' element={<Navigate to='/login' />} />
          </Routes>
        )}
      </BrowserRouter>

  );
}

export default App;
