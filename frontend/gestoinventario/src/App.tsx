import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Navbar from './Componentes/Navbar';
import Sidebar from './Componentes/Sidebar';
function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
    </>
  );
}

export default App;
