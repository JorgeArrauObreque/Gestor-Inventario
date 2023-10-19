export default function RegistrarActivo(){
    return (<>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xxl-6">
                    <h1>Registrar Activo Pañol</h1>
                </div>
                <div className="col-xxl-2">
                    <button className="btn btn-warning w-100">Escanear</button>
                </div>
                <div className="col-xxl-2">
                    <button className="btn btn-primary w-100">Guardar</button>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="card col-xxl-10">
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="">Identificador Activo</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col">
                                <label htmlFor="">Producto</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}