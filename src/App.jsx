import logo from './logo.svg';
import './App.css';
import Sidebar from './Componentes/Sidebar'
import Navbar from './Componentes/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Productos from './Componentes/Productos/Productos';
import Categorias from './Componentes/Productos/Categorias.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
                <Route path='categorias' Component={Categorias} />
                <Route path='productos' Component={Productos} />
              </Routes>
            </BrowserRouter>
          
          </div>
      </div>
      
      
    </>
  );
}

export default App;
