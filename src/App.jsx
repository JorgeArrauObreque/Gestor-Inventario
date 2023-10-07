import logo from './logo.svg';
import './App.css';
import Sidebar from './Componentes/Sidebar'
import Navbar from './Componentes/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import InventarioEstados from './Componentes/Productos/InventarioEstados';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Proveedores from './Componentes/Productos/Proveedores';
import Bodegas from './Componentes/Productos/Bodegas';
import TipoProducto from './Componentes/Productos/TipoProducto';
import Categorias from './Componentes/Productos/Categorias';
function App() {
  return (
    <>
      <Navbar />
      <div className='d-flex'>
          <div className='col-xxl-2 col-xl-3'>
            <Sidebar />
          </div>
          <div className='col'>
            <BrowserRouter>
              <Routes>
        
                <Route path='proveedores' Component={Proveedores} />
                <Route path='estadoinventario' Component={InventarioEstados} />
                <Route path='bodegas' Component={Bodegas} />
                <Route path='tipoproducto' Component={TipoProducto} />
                <Route path='categorias' Component={Categorias} />
              </Routes>
            </BrowserRouter>
          
          </div>
      </div>
      
      
    </>
  );
}

export default App;
