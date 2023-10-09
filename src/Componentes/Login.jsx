import axios from "axios";
import { useEffect } from "react"
import { useForm } from 'react-hook-form'
export default function Login() {

    const { register, reset, handleSubmit,formState:{errors} } = useForm();
    const onSubmit = ()=>{
        axios.post("");
        localStorage.setItem("nombre", "Juan");
    }
    return <>
        <div className="container" style={{marginTop:"10vh"}}>
            <div className="row justify-content-center">
                <div className="col-xxl-3">
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div class="form-outline mb-4">
                                    <input type="email" id="loginName" class="form-control" {...register("user",{required:true})}  />
                                    
                                    
                                    {errors.user && (<span className="text-danger">*Campo Requerido</span>)}
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