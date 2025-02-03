import { Link } from "react-router-dom"
import { AuthForm } from "../components/AuthForm"
import { AuthFormData } from "../interface/AuthFormData.interface"
import { toast } from "sonner";
import { api } from '../utils/axios';
import { useNavigate } from "react-router-dom";




export const LoginPage = () => {

  const navigate = useNavigate();


  const handleLogin = async (response: AuthFormData) => {

    try {
      const { data } = await api.post(`/auth/login`, response);

      localStorage.setItem('token', data.user.token);
      toast.success('Iniciando Sesion en DevTree');
      navigate('/admin');

    } catch (error) {
      toast.error(`${error.response.data.message}`);

    }
  }
  
  return (
    <>

      <h1 className="text-4xl font-bold text-white text-center /"> Inicia Sesion </h1>
        <AuthForm 
          formType="login"
          onSubmit={ handleLogin} 
        />
      <nav>
        <Link
          className="text-center text-white text-lg block mt-10"
        to="/auth/register"  > ¿No tienes cuenta? Crea una aqui</Link>        
      </nav>
      
    </>
  )
}
