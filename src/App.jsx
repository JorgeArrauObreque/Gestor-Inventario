import logo from './logo.svg';
import './App.css';
import Sidebar from './Componentes/Sidebar'
import Navbar from './Componentes/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Productos from './Componentes/Productos/Productos';
function App() {
  return (
    <>
      <Navbar />
      <div className='row'>
          <div className='col-xxl-2'>
            <Sidebar />
          </div>
          <div className='col'>
          <Productos />
          </div>
      </div>
      
      
    </>
  );
}

export default App;
