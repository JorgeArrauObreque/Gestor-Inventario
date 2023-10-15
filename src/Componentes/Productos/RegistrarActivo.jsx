export default function RegistrarActivo(){
    return (<>
        <div className="container">
            <div className="row">
                <div className="col-xxl-4">
                    <h1>Registrar Activo Pañol</h1>
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