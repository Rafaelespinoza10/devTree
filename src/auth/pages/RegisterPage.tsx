import { Link, useLocation } from "react-router-dom"
import { AuthForm } from "../components/AuthForm";
import { AuthFormData } from "../interface/AuthFormData.interface";
import { toast } from 'sonner'
import { api } from '../utils/axios'

export const RegisterPage = () => {

  const location = useLocation();
  
  const handleInitial = location?.state?.handle;

  const handleRegister = async (data: AuthFormData) => {
    try {
       await api.post(`/auth/register`, data);
      toast.success('Usuario registrado en DevTree')      
      
    } catch (error) {
      toast.error(`${error.response.data.message}`)
    }
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-white text-center"> Crear Cuenta</h1>
      <AuthForm 
        formType="register" 
        handle={handleInitial}
        onSubmit={ handleRegister}
      /> 
      <nav>
        <Link 
          className="text-center text-white text-lg block mt-10"
        to="/auth/login"  > ¿Ya tienes cuenta? Inicia sesion</Link>
      </nav>


    </>
  )
}
