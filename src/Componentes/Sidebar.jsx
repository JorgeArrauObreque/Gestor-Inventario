import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import React, { useEffect } from "react";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("bodega");
  const location = useLocation();

  useEffect(() => {
    // Actualiza el estado activeTab cuando cambia la ubicación (navegación)
    const path = location.pathname;
    setActiveTab(path.substring(1)); // Elimina el "/" inicial del pathname
  }, [location.pathname]);

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 sidebar" style={{ width: "100%", height: "90vh" }}>
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
          <Link to="/prestamos" className={activeTab === "prestamos" ? "nav-link active" : "nav-link text-dark"}>
            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
            <i class="fa-solid fa-barcode mx-2"></i>
            Prestamos
          </Link>
        </li>
      </ul>
    </div>
  );
}
