import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import React, { useEffect } from "react";
import { useUser } from '../UserContext';
export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("bodega");
  const location = useLocation();
  const { user, setUser } = useUser();  // Usa useUser para obtener el usuario desde el contexto
  useEffect(() => {
    // Actualiza el estado activeTab cuando cambia la ubicación (navegación)
    const path = location.pathname;
    const user_aux = JSON.parse(localStorage.getItem('userdata'));
    setUser({ username: user_aux.email, rol: user_aux.rolNavigation.nombre_rol });
    setActiveTab(path.substring(1)); // Elimina el "/" inicial del pathname
  }, [location.pathname]);

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 sidebar" style={{ width: "100%", height: "90vh" }}>
      {user.rol === "Administrador" ? (
        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <Link to="/DevolucionPrestamo" className={activeTab === "DevolucionPrestamo" ? "nav-link active" : "nav-link text-dark"}>
              <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
              <i class="fa-solid fa-barcode mx-2"></i>
              Devolver Prestamo
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/RegistrarActivo" className={activeTab === "RegistrarActivo" ? "nav-link active" : "nav-link text-dark"}>
              <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
              <i className="fa fa-book mx-2"></i> Registrar Activo Pañol
            </Link>
            <Link to="/InventarioActivos" className={activeTab === "InventarioActivos" ? "nav-link active" : "nav-link text-dark"}>
              <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
              <i className="fa fa-book mx-2"></i> Inventario Pañol
            </Link>
          </li>
          <li>
            <Link to="/registrarPrestamo" className={activeTab === "registrarPrestamo" ? "nav-link active" : "nav-link text-dark"}>
              <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
              <i class="fa-solid fa-barcode mx-2"></i>
              Registrar Prestamo
            </Link>
          </li>
          <li>
            <Link to="/stock" className={activeTab === "stock" ? "nav-link active" : "nav-link text-dark"}>
              <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
              <i class="fa-solid fa-barcode mx-2"></i>
              Stock Pañol
            </Link>
          </li>
          <li>
            <p>

              <button class="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                <i className="fa fa-cog"></i> Configuración Avanzada
              </button>
            </p>
            <div class="collapse" id="collapseExample">
              <div class="card card-body  border border-1">
                <ul className="nav nav-pills flex-column mb-auto">
                  <li className="nav-item">
                    <Link to="/bodegas" className={activeTab === "bodegas" ? "nav-link active" : "nav-link text-dark"}>
                      <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                      <i className="fa fa-book mx-2"></i> Bodegas
                    </Link>
                  </li>
                  <li>
                    <Link to="/categorias" className={activeTab === "categorias" ? "nav-link active" : "nav-link text-dark"}>
                      <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                      <i className="fa fa-list mx-2"></i> Categorias
                    </Link>
                  </li>
                  <li>
                    <Link to="/proveedores" className={activeTab === "proveedores" ? "nav-link active" : "nav-link text-dark"}>
                      <svg className="bi me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
                      <i class="fa-solid fa-users mx-2"></i>
                      Proveedores
                    </Link>
                  </li>
                  <li>
                    <Link to="/estadoinventario" className={activeTab === "estadoinventario" ? "nav-link active" : "nav-link text-dark"}>
                      <svg className="bi me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
                      <i class="fa-solid fa-wrench mx-2"></i>
                      Estados Inventario
                    </Link>
                  </li>
                  <li>
                    <Link to="/personas" className={activeTab === "personas" ? "nav-link active" : "nav-link text-dark"}>
                      <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
                      <i class="fa-solid fa-user mx-2"></i>
                      Personas
                    </Link>
                  </li>
                  <li>
                    <Link to="/tipoproducto" className={activeTab === "tipoproducto" ? "nav-link active" : "nav-link text-dark"}>
                      <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
                      <i class="fa-solid fa-wrench mx-2"></i>
                      Tipo Producto
                    </Link>
                  </li>
                  <li>
                    <Link to="/productos" className={activeTab === "productos" ? "nav-link active" : "nav-link text-dark"}>
                      <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
                      <i class="fa-solid fa-laptop mx-2"></i>

                      Productos
                    </Link>
                  </li>
                  <li>
                    <Link to="/inventarios" className={activeTab === "inventarios" ? "nav-link active" : "nav-link text-dark"}>
                      <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
                      <i class="fa-solid fa-barcode mx-2"></i>
                      inventarios
                    </Link>
                  </li>
                  <li>
                    <Link to="/usuarios" className={activeTab === "usuarios" ? "nav-link active" : "nav-link text-dark"}>
                      <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
                      <i class="fa-solid fa-users mx-2"></i>
                      Usuarios
                    </Link>
                  </li>
                  <li>
                    <Link to="/prestamos" className={activeTab === "prestamos" ? "nav-link active" : "nav-link text-dark"}>
                      <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
                      <i class="fa-solid fa-barcode mx-2"></i>
                      Prestamos
                    </Link>
                  </li>
                  <li>
                    <Link to="/historicoMovimientos" className={activeTab === "historicoMovimientos" ? "nav-link active" : "nav-link text-dark"}>
                      <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
                      <i class="fa-solid fa-barcode mx-2"></i>
                      Historico de movimientos
                    </Link>
                  </li>
                  <li>
                    <Link to="/Dashboard" className={activeTab === "Dashboard" ? "nav-link active" : "nav-link text-dark"}>
                      <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
                      <i class="fa-solid fa-barcode mx-2"></i>
                      Estadisticas
                    </Link>
                  </li>

                </ul>
              </div>
            </div>
          </li>
        </ul>
      ) : (
        <ul className="nav nav-pills flex-column mb-auto">
                 <li>
            <Link to="/stock" className={activeTab === "stock" ? "nav-link active" : "nav-link text-dark"}>
              <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
              <i class="fa-solid fa-barcode mx-2"></i>
              Stock Pañol
            </Link>
          </li>
          <li>
            <Link to="/DevolucionPrestamo" className={activeTab === "DevolucionPrestamo" ? "nav-link active" : "nav-link text-dark"}>
              <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
              <i class="fa-solid fa-barcode mx-2"></i>
              Devolver Prestamo
            </Link>
          </li>
          <li>
            <Link to="/registrarPrestamo" className={activeTab === "registrarPrestamo" ? "nav-link active" : "nav-link text-dark"}>
              <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
              <i class="fa-solid fa-barcode mx-2"></i>
              Registrar Prestamo
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/RegistrarActivo" className={activeTab === "RegistrarActivo" ? "nav-link active" : "nav-link text-dark"}>
              <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
              <i className="fa fa-book mx-2"></i> Registrar Activo Pañol
            </Link>
            <Link to="/InventarioActivos" className={activeTab === "InventarioActivos" ? "nav-link active" : "nav-link text-dark"}>
              <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
              <i className="fa fa-book mx-2"></i> Inventario Pañol
            </Link>
          </li>
        </ul>
      )}

    </div>
  );
}
