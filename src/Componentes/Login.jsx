import axios from "axios";
import { useContext, useEffect } from "react"
import { useForm } from 'react-hook-form'
import Swal from "sweetalert2";
import { SetUserContext,userContext } from "../App";
export default function Login() {

    const { register, reset, handleSubmit,formState:{errors} } = useForm();
    const cambiarusuario =  useContext(SetUserContext);
    const getuser = useContext(userContext);
    const onSubmit = (data)=>{
        const credenciales = {
            "Username":data.username,
            "PasswordHash":data.password,
        }
        console.log(credenciales);
        axios.post("http://localhost:5136/api/Accounts/login",credenciales,{
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response=>{
            console.log(response.data.user);
            console.log(response.data.token);
            localStorage.setItem("token", response.data.token);
            Swal.fire({
                position: 'top-end', // Personaliza el ancho de la notificación
                toast: true, // Activa el modo Toast
                icon: 'success',
                title: 'Bienvenido',
                showConfirmButton: false,
                timer: 3000,
            });
        }).catch(ex=>{
            Swal.fire({
                position: 'top-end', // Personaliza el ancho de la notificación
                toast: true, // Activa el modo Toast
                icon: 'error',
                title: 'Credenciales incorrectas',
                showConfirmButton: false,
                timer: 3000,
            });
        });
        
    }
    return <>
        <div className="container" style={{marginTop:"10vh"}}>
            <div className="row justify-content-center">
                <div className="col-xxl-3">
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div class="form-outline mb-4">
                                    <input type="text" id="loginName" class="form-control" {...register("username",{required:true})}  />
                                    
                                    
                                    {errors.username && (<span className="text-danger">*Campo Requerido</span>)}
                                </div>


                                <div class="form-outline mb-4">
                                    <input type="password" id="loginPassword" class="form-control" {...register("password",{required:true})}  />
                                    
                                    
                                    {errors.password && (<span className="text-danger">*Campo Requerido</span>)}
                                </div>


                                <div class="row mb-4">
                                    <div class="col-md-6 d-flex justify-content-center">

                                        <div class="form-check mb-3 mb-md-0">
                                            <input class="form-check-input" type="checkbox" value="" {...register("user",{required:true})} id="loginCheck" checked />
                                            <label class="form-check-label" for="loginCheck"> Remember me </label>
                                         
                                        </div>
                                    </div>

                                    <div class="col-md-6 d-flex justify-content-center">

                                        <a href="#!">Forgot password?</a> 
                                    </div>
                                </div>


                                <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>


                                <div class="text-center">
                                    <p>Not a member? <a href="#!">Register</a></p>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>



    </>
}