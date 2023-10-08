import './Navbar.css'
import Logo from './Logo.PNG'
export default function Navbar() {
  return (<>
    <nav class="navbar navbar-expand-lg navbar-institucional">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><img className='logo-insitucional' src={Logo}  /></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">

          <form class="d-flex">
            
            <button class="btn btn-light" type="submit">Cerrar Sesión</button>
          </form>
        </div>
      </div>
    </nav>
  </>);
}