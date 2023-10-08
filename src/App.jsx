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
import Personas from './Componentes/Personas';
import Productos from './Componentes/Productos/Productos';
function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
      <div className='d-flex'>
          <div className='col-xxl-2 col-xl-3'>
            <Sidebar />
          </div>
          <div className='col p-4 mt-4'>
           
              <Routes>
        
                <Route path='proveedores' Component={Proveedores} />
                <Route path='estadoinventario' Component={InventarioEstados} />
                <Route path='bodegas' Component={Bodegas} />
                <Route path='tipoproducto' Component={TipoProducto} />
                <Route path='categorias' Component={Categorias} />
                <Route path='personas' Component={Personas} />
                <Route path='productos' Component={Productos} />
              </Routes>
   
          
          </div>
      </div>
      </BrowserRouter>
      
    </>
  );
}

export default App;
